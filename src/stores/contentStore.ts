import { create } from "zustand";
import { contents as initialContents } from "../data/content";
import type { Content } from "../data/content";

interface ContentState {
  contents: Content[];
  setContents: (contents: Content[]) => void;
}

export const useContentStore = create<ContentState>((set) => ({
  contents: initialContents,

  setContents: (contents) => set({ contents }),
}));
