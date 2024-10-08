import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { apiUrl } from "../../constants/API_URL";

export interface IALLREPORTS {
  reports: unknown | null;
  loading: boolean;
  error: null | string;
}

const initialState: IALLREPORTS = {
  reports: null,
  loading: false,
  error: null,
};

export const getFilteredData = createAsyncThunk(
  "/fetchReports",
  async ({
    statusNav,
    category,
    limit,
  }: {
    statusNav: string;
    category: string;
    limit: number;
  }) => {
    const url =
      `${apiUrl}/reports/?skip=0&limit=${limit}` +
      (category && category !== "Hamısı" ? `&categories=${category}` : "") +
      (statusNav && statusNav !== "bütün" ? `&status=${statusNav}` : "");

    const response = await fetch(url);

    // Check if response is OK before parsing JSON
    if (!response.ok) {
      throw new Error("Failed to fetch reports");
    }

    const data = await response.json();
    return data;
  }
);

const allReports = createSlice({
  name: "allReport",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      getFilteredData.fulfilled,
      (state, action: PayloadAction) => {
        state.reports = action.payload;
        state.loading = false;
        state.error = null;
      }
    );
  },
});

export default allReports.reducer;
