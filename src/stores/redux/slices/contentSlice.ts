import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { AxiosError } from "axios";
import {
  createContentApi,
  getContentsApi,
} from "../../../services/api/contentApi";
import type { Content } from "../../../types/content";
import type { RootState } from "../store";
import { isObjectUrl, revokeObjectUrl, normalizeContent } from "../../../utils/contentUtils";

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
  },
});

export default contentSlice.reducer;
