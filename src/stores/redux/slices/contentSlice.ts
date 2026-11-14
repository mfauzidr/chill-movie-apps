import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { AxiosError } from "axios";
import {
  createContentApi,
  deleteContentApi,
  getContentsApi,
  updateContentApi,
} from "../../../services/api/contentApi";
import type { Content } from "../../../types/content";
import type { RootState } from "../store";
import { revokeObjectUrl, normalizeContent } from "../../../utils/contentUtils";

export interface ContentState {
  contents: Content[];
  isFetching: boolean;
  isCreating: boolean;
  isUpdating: boolean;
  isDeleting: boolean;
  hasFetched: boolean;
  error: string | null;
}

const initialState: ContentState = {
  contents: [],
  isFetching: false,
  isCreating: false,
  isUpdating: false,
  isDeleting: false,
  hasFetched: false,
  error: null,
};

export const fetchContents = createAsyncThunk<
  Content[],
  void,
  { state: RootState; rejectValue: string }
>(
  "content/fetchContents",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getContentsApi();

      return response;
    } catch (error) {
      const err = error as AxiosError;
      if (err.response?.status === 404) {
        return rejectWithValue("Content Not Found.");
      }

      return rejectWithValue("An error occurred while fetching contents.");
    }
  },
  {
    condition: (_, { getState }) => {
      const { hasFetched, isFetching } = getState().content;

      return !hasFetched && !isFetching;
    },
  },
);

export const addContent = createAsyncThunk<
  Content,
  Omit<Content, "id">,
  { rejectValue: string }
>("content/addContent", async (payload, { rejectWithValue }) => {
  try {
    const normalizedPayload = normalizeContent(payload);
    const response = await createContentApi(normalizedPayload);
    return response;
  } catch (error) {
    const err = error as AxiosError;
    if (err.response?.status === 400) {
      return rejectWithValue("Invalid content data.");
    }
    return rejectWithValue("An error occurred while adding content.");
  }
});

export const updateContent = createAsyncThunk<
  Content,
  { id: string; updates: Omit<Content, "id"> },
  { state: RootState; rejectValue: string }
>(
  "content/updateContent",
  async ({ id, updates }, { getState, rejectWithValue }) => {
    try {
      const state = getState();

      const currentContent = state.content.contents.find(
        (content) => content.id === id,
      );

      if (!currentContent) {
        return rejectWithValue("Content not found.");
      }

      const { id: contentId, ...contentData } = currentContent;

      const normalizedUpdates = normalizeContent({
        ...contentData,
        ...updates,
      });

      const response = await updateContentApi(contentId, normalizedUpdates);

      return response;
    } catch (error) {
      return rejectWithValue("An error occurred while updating content.");
    }
  },
);

export const deleteContent = createAsyncThunk<
  string,
  { id: string },
  { state: RootState; rejectValue: string }
>("content/deleteContent", async ({ id }, { getState, rejectWithValue }) => {
  try {
    const state = getState();
    const currentContent = state.content.contents.find(
      (content) => content.id === id,
    );
    if (!currentContent) {
      return rejectWithValue("Content not found.");
    }

    await deleteContentApi(id);

    const isReferencedElsewhere = (url: string) =>
      getState().content.contents.some(
        (content) =>
          content.id !== id &&
          (content.poster === url || content.banner === url),
      );

    if (!isReferencedElsewhere(currentContent.poster)) {
      revokeObjectUrl(currentContent.poster);
    }

    if (
      currentContent.banner !== currentContent.poster &&
      !isReferencedElsewhere(currentContent.banner)
    ) {
      revokeObjectUrl(currentContent.banner);
    }

    return id;
  } catch (error) {
    return rejectWithValue("An error occurred while deleting content.");
  }
});

const contentSlice = createSlice({
  name: "content",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchContents.pending, (state) => {
        state.isFetching = true;
        state.error = null;
      })
      .addCase(fetchContents.fulfilled, (state, action) => {
        state.isFetching = false;
        state.hasFetched = true;
        state.error = null;
        state.contents = action.payload;
      })
      .addCase(fetchContents.rejected, (state, action) => {
        state.isFetching = false;
        state.hasFetched = false;
        state.error =
          action.payload ||
          action.error.message ||
          "An error occurred while fetching contents.";
      })
      .addCase(addContent.pending, (state) => {
        state.isCreating = true;
        state.error = null;
      })
      .addCase(addContent.fulfilled, (state, action) => {
        state.isCreating = false;
        state.error = null;
        state.contents = [action.payload, ...state.contents];
      })
      .addCase(addContent.rejected, (state, action) => {
        state.isCreating = false;
        state.error =
          action.payload ||
          action.error.message ||
          "An error occurred while adding contents.";
      })
      .addCase(updateContent.pending, (state) => {
        state.isUpdating = true;
        state.error = null;
      })
      .addCase(updateContent.fulfilled, (state, action) => {
        state.isUpdating = false;
        state.error = null;
        state.contents = state.contents.map((content) =>
          content.id === action.payload.id ? action.payload : content,
        );
      })
      .addCase(updateContent.rejected, (state, action) => {
        state.isUpdating = false;
        state.error =
          action.payload ||
          action.error.message ||
          "An error occurred while updating contents.";
      })
      .addCase(deleteContent.pending, (state) => {
        state.isDeleting = true;
        state.error = null;
      })
      .addCase(deleteContent.fulfilled, (state, action) => {
        state.isDeleting = false;
        state.error = null;

        state.contents = state.contents.filter(
          (content) => content.id !== action.payload,
        );
      })
      .addCase(deleteContent.rejected, (state, action) => {
        state.isDeleting = false;
        state.error =
          action.payload ||
          action.error.message ||
          "An error occurred while deleting content.";
      });
  },
});

export default contentSlice.reducer;
