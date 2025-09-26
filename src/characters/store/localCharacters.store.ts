import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Character } from "../types";

interface LocalCharactersState {
  hidden: Set<string>;
  custom: Character[];
  edited: Map<string, Character>;
  version: number; // bump to refresh queries
  hide: (id: string) => void;
  unhide: (id: string) => void;
  toggle: (id: string) => void;
  add: (c: Omit<Character, "_id">) => void;
  edit: (id: string, patch: Partial<Character>) => void;
  reset: () => void;
}

export const useLocalCharacters = create<LocalCharactersState>()(
  persist(
    (set, get) => ({
      hidden: new Set<string>(),
      custom: [],
      edited: new Map<string, Character>(),
      version: 0,
      hide: (id: string) =>
        set((s: LocalCharactersState) => ({
          version: s.version + 1,
          hidden: new Set(s.hidden).add(id),
        })),
      unhide: (id: string) =>
        set((s: LocalCharactersState) => {
          const next = new Set(s.hidden);
          next.delete(id);
          return { version: s.version + 1, hidden: next };
        }),
      toggle: (id: string) =>
        set((s: LocalCharactersState) => {
          const next = new Set(s.hidden);
          if (next.has(id)) next.delete(id);
          else next.add(id);
          return { version: s.version + 1, hidden: next };
        }),
      add: (c: Omit<Character, "_id">) =>
        set((s: LocalCharactersState) => ({
          version: s.version + 1,
          custom: [
            {
              ...c,
              _id: `local-${
                (globalThis as any).crypto?.randomUUID?.() ??
                Math.random().toString(36).slice(2)
              }`,
            },
            ...s.custom,
          ],
        })),
      edit: (id: string, patch: Partial<Character>) =>
        set((s: LocalCharactersState) => {
          const current = s.custom.find((c: Character) => c._id === id);
          if (current) {
            const updated = { ...current, ...patch };
            return {
              version: s.version + 1,
              custom: s.custom.map((c: Character) =>
                c._id === id ? updated : c
              ),
            };
          }
          const map = new Map(s.edited);
          const base = map.get(id);
          map.set(id, { ...(base ?? { _id: id, name: "" }), ...patch });
          return { version: s.version + 1, edited: map };
        }),
      reset: () =>
        set({
          hidden: new Set(),
          custom: [],
          edited: new Map(),
          version: get().version + 1,
        }),
    }),
    {
      name: "lotr-local-characters",
      partialize: (s: LocalCharactersState) =>
        ({
          hidden: Array.from(s.hidden),
          custom: s.custom,
          edited: Array.from(s.edited),
        } as any),
      storage: {
        getItem: (name) => {
          const raw = localStorage.getItem(name);
          if (!raw) return null as any;
          const parsed = JSON.parse(raw);
          const state = parsed.state as any;
          return {
            state: {
              ...state,
              hidden: new Set<string>(state?.hidden ?? []),
              edited: new Map<string, Character>(state?.edited ?? []),
            },
            version: parsed.version,
          };
        },
        setItem: (name, value) =>
          localStorage.setItem(name, JSON.stringify(value)),
        removeItem: (name) => localStorage.removeItem(name),
      },
    }
  ) as any
);
