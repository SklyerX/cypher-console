import { create } from "zustand";

interface Response {
  stats: Stats;
  setStats: (stats: Stats) => void;
}

interface Stats {
  success: boolean;
  type: "request" | "credentials";
  value?: string;
}

export const useResponseStore = create<Response>()((set) => ({
  stats: {
    success: false,
    type: "request",
    value: undefined,
  },
  setStats: (stats: Stats) => set({ stats }),
}));
