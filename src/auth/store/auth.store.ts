import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  email?: string;
  token?: string; // The One API bearer token
  login: (input: { email: string; token: string }) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      email: undefined,
      token: undefined,
      login: ({ email, token }: { email: string; token: string }) =>
        set({ email, token }),
      logout: () => set({ email: undefined, token: undefined }),
    }),
    { name: "auth" }
  ) as any
);
