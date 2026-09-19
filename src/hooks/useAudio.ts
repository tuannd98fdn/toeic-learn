import { useState, useEffect, useCallback, useRef } from 'react';

// Global reference to prevent Garbage Collection of SpeechSynthesisUtterance in Chromium
declare global {
  interface Window {
    __toeicActiveUtterance?: SpeechSynthesisUtterance | null;
  }
}

/**
 * Clean text for accurate pronunciation:
 * Removes parenthesis annotations (e.g. "(v)", "(n)", "[formal]"), slashes, and special symbols
 */
function cleanTextForAudio(raw: string): string {
  if (!raw) return '';
  return raw
    .replace(/\(.*?\)/g, '')
    .replace(/\[.*?\]/g, '')
    .split('/')[0]
    .replace(/[^a-zA-Z0-9\s\-']/g, '')
    .trim();
}

/**
 * High-Reliability Vocabulary Audio Hook
 * Dual-Engine Architecture:
 * 1. Primary Engine: High-fidelity Native Studio US English MP3 Audio Stream (Type 2 = US English)
 * 2. Fallback Engine: Web Speech API (speechSynthesis) with all Chromium/WebKit bug fixes
 */
export function useAudio() {
  const [supported, setSupported] = useState(true);
  const [speaking, setSpeaking] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const availableVoicesRef = useRef<SpeechSynthesisVoice[]>([]);

  // Initialize voices and audio element on client
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Pre-create reusable HTML5 Audio instance for zero-latency playback
    const audio = new Audio();
    audio.preload = 'auto';
    audio.volume = 1.0;
    audioRef.current = audio;

    // Cache speech synthesis voices once available
    if ('speechSynthesis' in window) {
      const updateVoices = () => {
        try {
          const voices = window.speechSynthesis.getVoices();
          if (voices && voices.length > 0) {
            availableVoicesRef.current = voices;
          }
        } catch {
          // Ignore voices retrieval error
        }
      };

      updateVoices();
      window.speechSynthesis.addEventListener('voiceschanged', updateVoices);

      return () => {
        window.speechSynthesis.removeEventListener('voiceschanged', updateVoices);
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current.src = '';
        }
      };
    }
  }, []);

  /**
   * Fallback Web Speech API speaker with all Chromium/Safari bug workarounds
   */
  const speakWithSynthesis = useCallback((cleanWord: string, lang: string = 'en-US') => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      setSpeaking(false);
      return;
    }

    try {
      // Resume if browser paused speech synthesis
      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
      }

      // Safe cancel
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(cleanWord);
      utterance.lang = lang;
      utterance.rate = 0.92; // Clear, deliberate cadence for learners
      utterance.pitch = 1.0;

      // Select optimal English voice
      const voices = availableVoicesRef.current.length > 0
        ? availableVoicesRef.current
        : window.speechSynthesis.getVoices();

      const preferredVoice = voices.find(v => 
        (v.lang.startsWith('en-US') || v.lang.startsWith('en-GB') || v.lang.startsWith('en')) &&
        (v.name.includes('Google') || v.name.includes('Samantha') || v.name.includes('Natural') || v.name.includes('Daniel') || v.name.includes('Alex'))
      ) || voices.find(v => v.lang.startsWith('en'));

      if (preferredVoice) {
        utterance.voice = preferredVoice;
      }

      // Prevent garbage collection bug in Chromium
      window.__toeicActiveUtterance = utterance;

      utterance.onstart = () => setSpeaking(true);
      utterance.onend = () => {
        setSpeaking(false);
        window.__toeicActiveUtterance = null;
      };
      utterance.onerror = () => {
        setSpeaking(false);
        window.__toeicActiveUtterance = null;
      };

      window.speechSynthesis.speak(utterance);
    } catch {
      setSpeaking(false);
    }
  }, []);

  /**
   * Stop any ongoing audio playback or speech synthesis
   */
  const stop = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
      } catch {
        // ignore
      }
    }
    setSpeaking(false);
  }, []);

  /**
   * Main Speak Method
   * Tries crystal-clear native human audio CDN first; falls back smoothly to SpeechSynthesis
   */
  const speak = useCallback((text: string, lang: string = 'en-US') => {
    if (typeof window === 'undefined') return;

    const cleanWord = cleanTextForAudio(text);
    if (!cleanWord) return;

    // Stop previous audio
    stop();

    const audio = audioRef.current;
    if (!audio) {
      speakWithSynthesis(cleanWord, lang);
      return;
    }

    setSpeaking(true);

    // Primary High-Fidelity Studio Audio: US English Native Voice (Type 2 = US)
    const primaryUrl = `https://dict.youdao.com/dictvoice?audio=${encodeURIComponent(cleanWord)}&type=2`;
    
    let isFinishedOrFailed = false;

    // Cleanup listeners helper
    const cleanup = () => {
      audio.onended = null;
      audio.onerror = null;
    };

    audio.onended = () => {
      isFinishedOrFailed = true;
      cleanup();
      setSpeaking(false);
    };

    audio.onerror = () => {
      if (isFinishedOrFailed) return;
      isFinishedOrFailed = true;
      cleanup();
      // Fallback seamlessly to Web Speech API
      speakWithSynthesis(cleanWord, lang);
    };

    audio.src = primaryUrl;

    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        if (isFinishedOrFailed) return;
        isFinishedOrFailed = true;
        cleanup();
        // If autoplay policy blocked audio, fallback to speech synthesis or reset
        speakWithSynthesis(cleanWord, lang);
      });
    }
  }, [stop, speakWithSynthesis]);

  return {
    supported,
    speaking,
    speak,
    stop
  };
}
