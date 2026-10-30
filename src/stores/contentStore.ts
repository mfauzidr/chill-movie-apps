import { create } from "zustand";
import { contents as initialContents } from "../data/content";
import type { Content } from "../data/content";

interface ContentState {
  contents: Content[];
  setContents: (contents: Content[]) => void;
  addContent: (content: Omit<Content, "id">) => void;
  updateContent: (id: string, updates: Partial<Omit<Content, "id">>) => void;
  deleteContent: (id: string) => void;
}

const isObjectUrl = (value: string | undefined) => value?.startsWith("blob:") ?? false;

const revokeObjectUrl = (value: string | undefined) => {
  if (value && isObjectUrl(value)) URL.revokeObjectURL(value);
};

const createId = (title: string, contents: Content[]) => {
  const base = title.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") || "content";
  const ids = new Set(contents.map((content) => content.id));
  let id = base;
  let suffix = 2;
  while (ids.has(id)) id = `${base}-${suffix++}`;
  return id;
};

const normalizeContent = (content: Content): Content => {
  const normalized = { ...content };

  if (normalized.type === "film") {
    delete normalized.episodes;
    delete normalized.seasons;
    delete normalized.episodeDuration;
  } else {
    delete normalized.duration;
  }

  return normalized;
};

export const useContentStore = create<ContentState>((set) => ({
  contents: initialContents,

  setContents: (contents) => set({ contents }),

  addContent: (content) => set((state) => ({
    contents: [
      normalizeContent({
        ...content,
        id: createId(content.title, state.contents),
      }),
      ...state.contents,
    ],
  })),

  updateContent: (id, updates) => set((state) => {
    const current = state.contents.find((content) => content.id === id);
    if (!current) return state;
    const next = normalizeContent({ ...current, ...updates, id: current.id });
    const isStillReferenced = (url: string | undefined) => Boolean(url) && (
      next.poster === url || next.banner === url || state.contents.some((content) => content.id !== id && (content.poster === url || content.banner === url))
    );
    if (updates.poster && updates.poster !== current.poster && !isStillReferenced(current.poster)) revokeObjectUrl(current.poster);
    if (updates.banner && updates.banner !== current.banner && !isStillReferenced(current.banner)) revokeObjectUrl(current.banner);
    return { contents: state.contents.map((content) => content.id === id ? next : content) };
  }),

  deleteContent: (id) => set((state) => {
    const deleted = state.contents.find((content) => content.id === id);
    if (deleted) {
      const isReferencedElsewhere = (url: string) => state.contents.some((content) => content.id !== id && (content.poster === url || content.banner === url));
      if (!isReferencedElsewhere(deleted.poster)) revokeObjectUrl(deleted.poster);
      if (deleted.banner !== deleted.poster && !isReferencedElsewhere(deleted.banner)) revokeObjectUrl(deleted.banner);
    }
    return { contents: state.contents.filter((content) => content.id !== id) };
  }),
}));
