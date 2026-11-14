import { create } from "zustand";
import type { Content } from "../../types/content";
import {
  // updateContentApi,
  deleteContentApi,
} from "../../services/api/contentApi";

interface ContentState {
  contents: Content[];
  
  // updateContent: (
  //   id: string,
  //   updates: Partial<Omit<Content, "id">>,
  // ) => Promise<void>;
  deleteContent: (id: string) => Promise<void>;
  isLoading: boolean;
  error: string | null;
}

const isObjectUrl = (value: string | undefined) =>
  value?.startsWith("blob:") ?? false;

const revokeObjectUrl = (value: string | undefined) => {
  if (value && isObjectUrl(value)) URL.revokeObjectURL(value);
};

// const normalizeContent = <T extends Omit<Content, "id">>(content: T): T => {
//   const normalized = { ...content };

//   if (normalized.type === "film") {
//     delete normalized.totalEpisodes;
//     delete normalized.seasons;
//     delete normalized.episodeDuration;
//   } else {
//     delete normalized.duration;
//   }

//   return normalized;
// };

export const useContentStore = create<ContentState>((set, get) => ({
  contents: [],
  isLoading: false,
  error: null,
  hasFetched: false,

  // updateContent: async (id, updates) => {
  //   set({ isLoading: true, error: null });

  //   try {
  //     const current = get().contents.find((content) => content.id === id);

  //     if (!current) {
  //       throw new Error("Content not found.");
  //     }

  //     const normalizedContent = normalizeContent({
  //       ...current,
  //       ...updates,
  //     });

  //     const updatedContent = await updateContentApi(id, normalizedContent);

  //     set((state) => ({
  //       contents: state.contents.map((content) =>
  //         content.id === id ? updatedContent : content,
  //       ),
  //     }));
  //   } catch (error) {
  //     console.error("Failed to update content:", error);

  //     set({
  //       error: "Failed to update content. Please try again.",
  //     });

  //     throw error;
  //   } finally {
  //     set({ isLoading: false });
  //   }
  // },

  deleteContent: async (id) => {
    set({ isLoading: true, error: null });

    try {
      const current = get().contents.find((content) => content.id === id);

      if (!current) {
        throw new Error("Content not found.");
      }

      await deleteContentApi(id);

      set((state) => ({
        contents: state.contents.filter((content) => content.id !== id),
      }));

      const isReferencedElsewhere = (url: string) =>
        get().contents.some(
          (content) => content.poster === url || content.banner === url,
        );

      if (!isReferencedElsewhere(current.poster)) {
        revokeObjectUrl(current.poster);
      }

      if (
        current.banner !== current.poster &&
        !isReferencedElsewhere(current.banner)
      ) {
        revokeObjectUrl(current.banner);
      }
    } catch (error) {
      console.error("Failed to delete content:", error);

      set({
        error: "Failed to delete content. Please try again.",
      });

      throw error;
    } finally {
      set({ isLoading: false });
    }
  },
}));
