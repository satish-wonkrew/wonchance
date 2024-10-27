import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie'; // Make sure to install and import Cookies if using it
import { USER_API_END_POINT } from '@/utils/constant'; // Adjust path if necessary

// Async thunk to fetch user profile data
export const fetchUserProfile = createAsyncThunk(
    'user/fetchUserProfile',
    async (_, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem('token') || Cookies.get('token');
            if (!token) throw new Error('No token found');

            const response = await axios.get(`${USER_API_END_POINT}/me`, {
                headers: { Authorization: `Bearer ${token}` },
            });


            return response.data;
        } catch (error) {
            const errorMessage = error.response?.data?.message || error.message;
            return rejectWithValue(errorMessage);
        }
    }
);

// Async thunk to update user profile data
export const updateUserProfile = createAsyncThunk(
    'user/updateUserProfile',
    async ({ id, userData }, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem('token') || Cookies.get('token');
            if (!token) throw new Error('No token found');

            const response = await axios.put(`${USER_API_END_POINT}/logupdate/${id}`, userData, {
                headers: { Authorization: `Bearer ${token}` },
            });


            return response.data;
        } catch (error) {
            const errorMessage = error.response?.data?.message || error.message;
            return rejectWithValue(errorMessage);
        }
    }
);

const userSlice = createSlice({
    name: 'user',
    initialState: {
        profile: null,
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserProfile.pending, (state) => {
              
                state.status = 'loading';
            })
            .addCase(fetchUserProfile.fulfilled, (state, action) => {
               
                state.status = 'succeeded';
                state.profile = action.payload;
            })
            .addCase(fetchUserProfile.rejected, (state, action) => {
             
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(updateUserProfile.pending, (state) => {
                
                state.status = 'loading';
            })
            .addCase(updateUserProfile.fulfilled, (state, action) => {
                
                state.status = 'succeeded';
                state.profile = { ...state.profile, ...action.payload };
            })
            .addCase(updateUserProfile.rejected, (state, action) => {
              
                state.status = 'failed';
                state.error = action.payload;
            });
    },
});

export default userSlice.reducer;
