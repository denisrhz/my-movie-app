import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { baseUrl, generateUrl, options } from "../../utils/requestHelper";

export const getMovies = createAsyncThunk('data/fetchData', async (params) => {
  const url = generateUrl(`${baseUrl}/discover/movie`, params);

  return fetch(url, options)
    .then(response => response.json())
    .then(data => data)
    .catch(error => console.error(error));
});

const dataSlice = createSlice({
  name: "data",
  initialState: {
    movies: [],
    popularMovies: [],
    currentPage: 1,
    totalPages: 1,
    loading: false,
  },
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMovies.pending, (state) => {
        state.loading = true;
      })
      .addCase(getMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.movies = action.payload.results;
        state.totalPages = action.payload.total_pages;
        state.currentPage = action.meta.arg.page || 1;
      })
      .addCase(getMovies.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default dataSlice.reducer;