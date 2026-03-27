export interface PlaygroundSessionData {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  brandId: string;
  styleId: string | null;
  activeComponentId: string | null;
  variantNotes: string[];
}

const STORAGE_KEY = 'playground-sessions';

export function getAllSessions(): PlaygroundSessionData[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as PlaygroundSessionData[];
  } catch {
    return [];
  }
}

export function getSession(id: string): PlaygroundSessionData | null {
  const sessions = getAllSessions();
  return sessions.find((s) => s.id === id) ?? null;
}

export function saveSession(session: PlaygroundSessionData): void {
  const sessions = getAllSessions();
  const idx = sessions.findIndex((s) => s.id === session.id);
  if (idx >= 0) {
    sessions[idx] = session;
  } else {
    sessions.push(session);
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
}

export function deleteSession(id: string): void {
  const sessions = getAllSessions().filter((s) => s.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
}

export function createSession(
  data: Omit<PlaygroundSessionData, 'id' | 'createdAt'>,
): PlaygroundSessionData {
  const session: PlaygroundSessionData = {
    ...data,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };
  saveSession(session);
  return session;
}
