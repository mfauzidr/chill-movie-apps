import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { AxiosError } from "axios";
import { getContentsApi } from "../../../services/api/contentApi";
import type { Content } from "../../../types/content";
import type { RootState } from "../store";

export interface ContentState {
  contents: Content[];
  isLoading: boolean;
  hasFetched: boolean;
  error: string | null;
}

const initialState: ContentState = {
  contents: [],
  isLoading: false,
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
      const { hasFetched, isLoading } = getState().content;

      return !hasFetched && !isLoading;
    },
  },
);

const contentSlice = createSlice({
  name: "content",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchContents.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchContents.fulfilled, (state, action) => {
        state.isLoading = false;
        state.hasFetched = true;
        state.error = null;
        state.contents = action.payload;
      })
      .addCase(fetchContents.rejected, (state, action) => {
        state.isLoading = false;
        state.hasFetched = false;
        state.error =
          action.payload ||
          action.error.message ||
          "An error occurred while fetching contents.";
      });
  },
});

export default contentSlice.reducer;
