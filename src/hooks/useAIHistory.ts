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
    const currentSessions = storage.get<Record<string, AISession>>(AI_HISTORY_KEY, {});
    const current = currentSessions[id];
    const newData = {
      ...currentSessions,
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
    setSessions(newData);
  };

  const updateSummary = (id: string, summary: string) => {
    const currentSessions = storage.get<Record<string, AISession>>(AI_HISTORY_KEY, {});
    if (!currentSessions[id]) return;
    const newData = {
      ...currentSessions,
      [id]: {
        ...currentSessions[id],
        summary,
      },
    };
    storage.set(AI_HISTORY_KEY, newData);
    setSessions(newData);
  };

  const deleteSession = (id: string) => {
    const currentSessions = storage.get<Record<string, AISession>>(AI_HISTORY_KEY, {});
    const newData = { ...currentSessions };
    delete newData[id];
    storage.set(AI_HISTORY_KEY, newData);
    setSessions(newData);
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
