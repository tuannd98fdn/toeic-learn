import { useState, useEffect } from 'react';
import { storage } from '@/utils/storage';

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

export interface AISession {
  id: string;
  title: string;
  timestamp: string;
  chatLog: Message[];
  note: string;
  summary?: string;
}

const AI_HISTORY_KEY = 'ai_study_sessions_history';

export function useAIHistory() {
  const [sessions, setSessions] = useState<Record<string, AISession>>({});
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const data = storage.get<Record<string, AISession>>(AI_HISTORY_KEY, {});
    setSessions(data);
    setMounted(true);
  }, []);

  const saveSession = (
    id: string,
    title: string,
    chatLog: Message[],
    note: string
  ) => {
    setSessions((prev) => {
      const current = prev[id];
      const newData = {
        ...prev,
        [id]: {
          id,
          title,
          timestamp: current?.timestamp || new Date().toISOString(),
          chatLog,
          note,
          summary: current?.summary,
        },
      };
      storage.set(AI_HISTORY_KEY, newData);
      return newData;
    });
  };

  const updateSummary = (id: string, summary: string) => {
    setSessions((prev) => {
      if (!prev[id]) return prev;
      const newData = {
        ...prev,
        [id]: {
          ...prev[id],
          summary,
        },
      };
      storage.set(AI_HISTORY_KEY, newData);
      return newData;
    });
  };

  const deleteSession = (id: string) => {
    setSessions((prev) => {
      const newData = { ...prev };
      delete newData[id];
      storage.set(AI_HISTORY_KEY, newData);
      return newData;
    });
  };

  const getAllSessions = (): AISession[] => {
    if (!mounted) return [];
    return Object.values(sessions).sort(
      (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
  };

  return {
    mounted,
    sessions,
    saveSession,
    updateSummary,
    deleteSession,
    getAllSessions,
  };
}
