import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { baseUrl, generateUrl, options } from "../../utils/requestHelper";

export const getMovies = createAsyncThunk(`data/fetchData` , async (params) => {  
    const url = generateUrl(`${baseUrl}/discover/movie`, params);
  
    return fetch(url, options)
      .then(response => response.json())
      .then((data) => {
        return data.results;
      })
      .catch((error) => console.error(error));
    })

const dataSlice = createSlice({
  name: "data",
  initialState: {
    movies: [],
    pagination: {
      currentPage: 1,
      totalPages: 1,
    },
    loading: false,
  },
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(getMovies.pending, (state, action) => {
        state.loading = true
      })
      .addCase(getMovies.fulfilled, (state, action) => {
        if (action.payload) {
          state.loading = false
        }
        state.movies = action.payload
      })
  },
})

export default dataSlice.reducer