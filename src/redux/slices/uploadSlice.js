
import { USER_API_END_POINT } from '@/utils/constant';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk for uploading profile picture
export const uploadProfilePicture = createAsyncThunk(
    'upload/uploadProfilePicture',
    async ({ userId, file }, { rejectWithValue }) => {
        const formData = new FormData();
        formData.append('profile', file);

        try {
            const token = localStorage.getItem('token');
            console.log('====================================');
            console.log(token);
            console.log('====================================');
            const response = await axios.post(`${USER_API_END_POINT}/upload/profile/${userId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`,
                }
            });
            return response.data; // return data from the response
        } catch (error) {
            return rejectWithValue(error.response.data); // return error message
        }
    }
);

// Async thunk for uploading gallery
export const uploadGallery = createAsyncThunk(
    'upload/uploadGallery',
    async ({ userId, files }, { rejectWithValue }) => {
        const formData = new FormData();
        files.forEach(file => {
            formData.append('gallery', file);
        });

        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(`${USER_API_END_POINT}/upload/gallery/${userId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`,
                }
            });
            return response.data; // return data from the response
        } catch (error) {
            return rejectWithValue(error.response.data); // return error message
        }
    }
);

// Create the slice
const uploadSlice = createSlice({
    name: 'upload',
    initialState: {
        profilePicture: null,
        gallery: [],
        loading: false,
        error: null,
    },
    reducers: {
        resetUploadState: (state) => {
            state.loading = false;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(uploadProfilePicture.pending, (state) => {
                state.loading = true;
            })
            .addCase(uploadProfilePicture.fulfilled, (state, action) => {
                state.loading = false;
                state.profilePicture = action.payload; // save profile picture data
            })
            .addCase(uploadProfilePicture.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload; // save error message
            })
            .addCase(uploadGallery.pending, (state) => {
                state.loading = true;
            })
            .addCase(uploadGallery.fulfilled, (state, action) => {
                state.loading = false;
                state.gallery = action.payload; // save gallery data
            })
            .addCase(uploadGallery.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload; // save error message
            });
    },
});

// Export actions and reducer
export const { resetUploadState } = uploadSlice.actions;
export default uploadSlice.reducer;
