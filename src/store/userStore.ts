import { create } from "zustand";

interface UserState {
  name: string | null;
  username: string | null;
  setUser: (payload: { name: string; username: string }) => void;
  resetUser: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  name: null,
  username: null,
  setUser: ({ name, username }) => set({ name, username }),
  resetUser: () => set({ name: null, username: null }),
}));
