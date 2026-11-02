import { create } from "zustand";
import type { Content } from "../data/content";
import { getContents, createContent } from "../services/api/contentApi";

interface ContentState {
  contents: Content[];
  setContents: (contents: Content[]) => void;
  addContent: (content: Omit<Content, "id">) => Promise<void>;
  updateContent: (id: string, updates: Partial<Omit<Content, "id">>) => void;
  deleteContent: (id: string) => void;
  isLoading: boolean;
  error: string | null;
  fetchContents: () => Promise<void>;
  hasFetched: boolean;
}

const isObjectUrl = (value: string | undefined) =>
  value?.startsWith("blob:") ?? false;

const revokeObjectUrl = (value: string | undefined) => {
  if (value && isObjectUrl(value)) URL.revokeObjectURL(value);
};

const normalizeContent = <T extends Omit<Content, "id">>(content: T): T => {
  const normalized = { ...content };

  if (normalized.type === "film") {
    delete normalized.totalEpisodes;
    delete normalized.seasons;
    delete normalized.episodeDuration;
  } else {
    delete normalized.duration;
  }

  return normalized;
};

export const useContentStore = create<ContentState>((set, get) => ({
  contents: [],
  isLoading: false,
  error: null,
  hasFetched: false,

  fetchContents: async () => {
    if (get().hasFetched || get().isLoading) return;

    set({ isLoading: true, error: null });

    try {
      const contents = await getContents();
      set({ contents, hasFetched: true });
    } catch (error) {
      console.error("Failed to fetch contents:", error);

      set({
        error: "Failed to load content. Please try again.",
      });
    } finally {
      set({ isLoading: false });
    }
  },

  setContents: (contents) => set({ contents }),

  addContent: async (content) => {
    set({ isLoading: true, error: null });

    try {
      const normalizedContent = normalizeContent(content);

      const createdContent = await createContent(normalizedContent);

      set((state) => ({
        contents: [createdContent, ...state.contents],
      }));
    } catch (error) {
      console.error("Failed to create content:", error);

      set({
        error: "Failed to create content. Please try again.",
      });

      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  updateContent: (id, updates) =>
    set((state) => {
      const current = state.contents.find((content) => content.id === id);
      if (!current) return state;
      const next = normalizeContent({ ...current, ...updates, id: current.id });
      const isStillReferenced = (url: string | undefined) =>
        Boolean(url) &&
        (next.poster === url ||
          next.banner === url ||
          state.contents.some(
            (content) =>
              content.id !== id &&
              (content.poster === url || content.banner === url),
          ));
      if (
        updates.poster &&
        updates.poster !== current.poster &&
        !isStillReferenced(current.poster)
      )
        revokeObjectUrl(current.poster);
      if (
        updates.banner &&
        updates.banner !== current.banner &&
        !isStillReferenced(current.banner)
      )
        revokeObjectUrl(current.banner);
      return {
        contents: state.contents.map((content) =>
          content.id === id ? next : content,
        ),
      };
    }),

  deleteContent: (id) =>
    set((state) => {
      const deleted = state.contents.find((content) => content.id === id);
      if (deleted) {
        const isReferencedElsewhere = (url: string) =>
          state.contents.some(
            (content) =>
              content.id !== id &&
              (content.poster === url || content.banner === url),
          );
        if (!isReferencedElsewhere(deleted.poster))
          revokeObjectUrl(deleted.poster);
        if (
          deleted.banner !== deleted.poster &&
          !isReferencedElsewhere(deleted.banner)
        )
          revokeObjectUrl(deleted.banner);
      }
      return {
        contents: state.contents.filter((content) => content.id !== id),
      };
    }),
}));
