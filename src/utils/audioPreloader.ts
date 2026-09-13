/**
 * Audio Preloader Utility
 * Preloads listening audio files in the background using requestIdleCallback
 * to provide 0ms latency playback when practicing Part 1 - 4.
 */

const preloadedUrls = new Set<string>();

/**
 * Preloads a single audio file via Audio element buffering.
 */
export function preloadAudio(url?: string | null): void {
  if (!url || typeof window === 'undefined') return;
  if (preloadedUrls.has(url)) return;

  preloadedUrls.add(url);

  const executePreload = () => {
    try {
      const audio = new Audio();
      audio.preload = 'auto';
      audio.src = url;
    } catch {
      // Ignore background preload errors gracefully
    }
  };

  if ('requestIdleCallback' in window) {
    (window as any).requestIdleCallback(() => executePreload(), { timeout: 2000 });
  } else {
    setTimeout(executePreload, 100);
  }
}

/**
 * Preloads an array of audio URLs sequentially with rate-limiting.
 */
export function preloadAudioBatch(urls: (string | undefined | null)[], maxCount: number = 5): void {
  if (typeof window === 'undefined') return;
  const validUrls = urls.filter((u): u is string => Boolean(u) && !preloadedUrls.has(u!)).slice(0, maxCount);

  validUrls.forEach((url, idx) => {
    setTimeout(() => {
      preloadAudio(url);
    }, idx * 400);
  });
}

/**
 * Preloads Part 1 listening audio for a given test when the user is on the Dashboard.
 */
export async function preloadUpcomingListening(testId: string = 'ets2022_test1'): Promise<void> {
  if (typeof window === 'undefined') return;
  try {
    const match = testId.match(/ets(\d+)_test(\d+)/);
    if (!match) return;

    const res = await fetch(`/data/ets${match[1]}/test${match[2]}/part1.json`);
    if (!res.ok) return;

    const questions = await res.json();
    if (Array.isArray(questions)) {
      const urls = questions.map((q: any) => q.audioUrl).filter(Boolean);
      preloadAudioBatch(urls, 4);
    }
  } catch {
    // Non-critical background optimization
  }
}
