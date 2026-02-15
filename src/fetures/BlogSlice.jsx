import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchBlogs = createAsyncThunk("bolgs/fetchBlogs", async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");

  if (!response.ok) {
    throw new Error("unable to fetch blogs");
  }
  return await response.json();
});

const initialState = {
  blogs: [],
  currentPage: 1,
  loading: false,
  error: null,
};

const BlogSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {
    removeBlog: (state, action) => {
      let newBlogs = state.blogs.filter((value) => value.id != action.payload);

      state.blogs = newBlogs;
    },
    moveToPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlogs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        state.blogs = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchBlogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { removeBlog, moveToPage } = BlogSlice.actions;
export default BlogSlice.reducer;
