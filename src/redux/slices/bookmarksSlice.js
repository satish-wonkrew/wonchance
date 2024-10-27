// redux/slices/bookmarksSlice.js
import axiosInstance from '@/utils/axiosInstance';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Fetch all bookmarks
export const fetchBookmarks = createAsyncThunk('bookmarks/fetchBookmarks', async (_, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.get('/bookmarks');
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || 'Failed to fetch bookmarks');
    }
});

// Add a bookmark
export const addBookmark = createAsyncThunk('bookmarks/addBookmark', async (roleId, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.post(`/bookmarks/${roleId}`);
        return response.data;  // Ensure this matches the expected structure
    } catch (error) {
        return rejectWithValue(error.response?.data || 'Failed to add bookmark');
    }
});

// Remove a bookmark
export const removeBookmark = createAsyncThunk('bookmarks/removeBookmark', async (roleId, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.delete(`/bookmarks/${roleId}`);
        return { roleId, message: response.data.message };
    } catch (error) {
        return rejectWithValue(error.response?.data || 'Failed to remove bookmark');
    }
});

const bookmarksSlice = createSlice({
    name: 'bookmarks',
    initialState: {
        bookmarks: [],
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Handle fetch bookmarks
            .addCase(fetchBookmarks.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchBookmarks.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.bookmarks = action.payload;
            })
            .addCase(fetchBookmarks.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            // Handle add bookmark
            .addCase(addBookmark.fulfilled, (state, action) => {
                state.bookmarks.push(action.payload);
            })
            .addCase(addBookmark.rejected, (state, action) => {
                state.error = action.payload;
            })
            // Handle remove bookmark
            .addCase(removeBookmark.fulfilled, (state, action) => {
                state.bookmarks = state.bookmarks.filter(bookmark => bookmark._id !== action.payload.roleId);
            })
            .addCase(removeBookmark.rejected, (state, action) => {
                state.error = action.payload;
            });
    },
});

export default bookmarksSlice.reducer;
