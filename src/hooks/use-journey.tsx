'use client';

import { LOCATIONS, type SectionKey, TOTAL_LOCATIONS } from '@/data/locations';
import { type ReactNode, createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';

const STORAGE_KEY = 'hanh-trinh-kham-pha:v1';
const SECTION_KEYS: SectionKey[] = ['A', 'B', 'C'];
const KNOWN_IDS = new Set(LOCATIONS.map((location) => location.id));

type JourneyState = {
  explored: string[];
  opened: Record<string, SectionKey[]>;
};

const EMPTY_STATE: JourneyState = { explored: [], opened: {} };

// Dữ liệu trong localStorage có thể cũ hoặc bị sửa tay: chỉ giữ lại id và mục hợp lệ.
function readState(): JourneyState {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return EMPTY_STATE;
    const parsed = JSON.parse(raw) as Partial<JourneyState>;
    const explored = Array.isArray(parsed.explored) ? parsed.explored.filter((id) => KNOWN_IDS.has(id)) : [];
    const opened: JourneyState['opened'] = {};
    for (const [id, keys] of Object.entries(parsed.opened ?? {})) {
      if (KNOWN_IDS.has(id) && Array.isArray(keys)) opened[id] = keys.filter((key) => SECTION_KEYS.includes(key));
    }
    return { explored: Array.from(new Set(explored)), opened };
  } catch {
    return EMPTY_STATE;
  }
}

function writeState(state: JourneyState) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Trình duyệt chặn lưu trữ (chế độ riêng tư...): vẫn chạy bình thường, chỉ không giữ được tiến độ.
  }
}

type JourneyContextValue = {
  exploredCount: number;
  total: number;
  isComplete: boolean;
  isExplored: (id: string) => boolean;
  openedSections: (id: string) => SectionKey[];
  /** Ghi nhận đã mở một đề mục. Trả về true nếu lần mở này hoàn tất địa điểm. */
  openSection: (id: string, key: SectionKey) => boolean;
  /** Trả về true nếu địa điểm vừa được đánh dấu lần đầu. */
  markExplored: (id: string) => boolean;
  reset: () => void;
};

const JourneyContext = createContext<JourneyContextValue | null>(null);

export function JourneyProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<JourneyState>(() => (typeof window === 'undefined' ? EMPTY_STATE : readState()));
  const stateRef = useRef(state);
  stateRef.current = state;

  useEffect(() => {
    writeState(state);
  }, [state]);

  const markExplored = useCallback((id: string) => {
    if (stateRef.current.explored.includes(id)) return false;
    const next = { ...stateRef.current, explored: [...stateRef.current.explored, id] };
    stateRef.current = next;
    setState(next);
    return true;
  }, []);

  const openSection = useCallback(
    (id: string, key: SectionKey) => {
      const current = stateRef.current.opened[id] ?? [];
      if (current.includes(key)) return false;
      const keys = [...current, key];
      const next = { ...stateRef.current, opened: { ...stateRef.current.opened, [id]: keys } };
      stateRef.current = next;
      setState(next);
      return SECTION_KEYS.every((k) => keys.includes(k)) && markExplored(id);
    },
    [markExplored]
  );

  const reset = useCallback(() => {
    stateRef.current = EMPTY_STATE;
    setState(EMPTY_STATE);
  }, []);

  const value = useMemo<JourneyContextValue>(
    () => ({
      exploredCount: state.explored.length,
      total: TOTAL_LOCATIONS,
      isComplete: state.explored.length >= TOTAL_LOCATIONS,
      isExplored: (id) => state.explored.includes(id),
      openedSections: (id) => state.opened[id] ?? [],
      openSection,
      markExplored,
      reset,
    }),
    [state, openSection, markExplored, reset]
  );

  return <JourneyContext.Provider value={value}>{children}</JourneyContext.Provider>;
}

export function useJourney() {
  const context = useContext(JourneyContext);
  if (!context) throw new Error('useJourney must be used within JourneyProvider');
  return context;
}
