import axios from "axios";
import { RootState } from './store';
import { Article } from "./src/interface";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

// Define the initial state type
interface ArticlesState {
  items: Article[];
  authors: string[];
  categories: string[];
  selectedAuthors: string[];
  selectedCategories: string[];
  selectedSortOrders: string[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

// Define the async thunk for fetching articles
export const fetchArticles = createAsyncThunk<Article[]>(
  "articles/fetchArticles",
  async () => {
    const response = await axios.get<Article[]>(
      `${import.meta.env.VITE_API_URL}`
    );
    return response.data;
  }
);

// Define the initial state
const initialState: ArticlesState = {
  items: [],
  authors: [],
  categories: [],
  selectedAuthors: [],
  selectedCategories: [],
  selectedSortOrders: [],
  status: "idle",
  error: null,
};

// Create the slice
const articlesSlice = createSlice({
  name: "articles",
  initialState,
  reducers: {
    // Update selected authors
    toggleAuthorFilter(state, action: PayloadAction<string>) {
      const author = action.payload;
      if (state.selectedAuthors.includes(author)) {
        state.selectedAuthors = state.selectedAuthors.filter(
          (a) => a !== author
        );
      } else {
        state.selectedAuthors.push(author);
      }
    },
    // Update selected categories
    toggleCategoryFilter(state, action: PayloadAction<string>) {
      const category = action.payload;
      if (state.selectedCategories.includes(category)) {
        state.selectedCategories = state.selectedCategories.filter(
          (c) => c !== category
        );
      } else {
        state.selectedCategories.push(category);
      }
    },
    // Update sort order
    toggleSortOrderFilter(state, action: PayloadAction<string>) {
      const sortOrder = action.payload;
      if (state.selectedSortOrders.includes(sortOrder)) {
        state.selectedSortOrders = state.selectedSortOrders.filter(
          (s) => s !== sortOrder
        );
      } else {
        state.selectedSortOrders.push(sortOrder);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticles.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchArticles.fulfilled,
        (state, action: PayloadAction<Article[]>) => {
          state.status = "succeeded";
          state.items = action.payload;
          state.authors = Array.from(
            new Set(action.payload.map((article) => article.author))
          );
          state.categories = Array.from(
            new Set(action.payload.map((article) => article.source))
          );
        }
      )
      .addCase(fetchArticles.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch articles";
      });
  },
});

export const { toggleAuthorFilter, toggleCategoryFilter, toggleSortOrderFilter } = articlesSlice.actions;

export default articlesSlice.reducer;

export const selectFilteredArticles = (state: RootState) => {
  const { items, selectedAuthors, selectedCategories, selectedSortOrders } = state.articles;

  // Filter by selected authors
  let filteredArticles = items.filter(article =>
    (selectedAuthors.length === 0 || selectedAuthors.includes(article.author)) &&
    (selectedCategories.length === 0 || selectedCategories.includes(article.source))
  );

  // Sort articles based on sortOrder

  if(selectedSortOrders.length) {
    selectedSortOrders.forEach((sortOrder) => {
      if (sortOrder === 'date') {
        filteredArticles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      } else if (sortOrder === 'title') {
        filteredArticles.sort((a, b) => a.title.localeCompare(b.title));
      }
    })
  }
  return filteredArticles;
};
