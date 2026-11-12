import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { AxiosError } from "axios";
import { getContentsApi } from "../../../services/api/contentApi";
import type { Content } from "../../../types/content";

export interface ContentState {
  contents: Content[];
  isLoading: boolean;
  error: string | null;
}

const initialState: ContentState = {
  contents: [],
  isLoading: false,
  error: null,
};

export const fetchContents = createAsyncThunk<
  Content[],
  void,
  { rejectValue: string }
>("content/fetchContents", async (_, { rejectWithValue }) => {
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
});

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
        state.error = null;
        state.contents = action.payload;
      })
      .addCase(fetchContents.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          action.payload ||
          action.error.message ||
          "An error occurred while fetching contents.";
      });
  },
});

export default contentSlice.reducer;
