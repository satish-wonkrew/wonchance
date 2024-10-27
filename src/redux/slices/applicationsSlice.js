import axiosInstance from '@/utils/axiosInstance';
import { USER_API_END_POINT } from '@/utils/constant';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk to apply for a specific role
export const applyForRole = createAsyncThunk(
    'applications/applyForRole',
    async (roleId, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post(`${USER_API_END_POINT}/applications/apply-for-role`, { roleId });
            return response.data; // Return the data from the response
        } catch (error) {
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message);
            } else {
                return rejectWithValue("An error occurred while applying for the role.");
            }
        }
    }
);

// Async thunk to get applicants by role
export const getApplicantsByRole = createAsyncThunk(
    'applications/getApplicantsByRole',
    async (roleId, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(`${USER_API_END_POINT}/applications/role/applicants/${roleId}`);
            return response.data.applicants; // Return the data from the response
        } catch (error) {
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message);
            } else {
                return rejectWithValue("An error occurred while fetching applicants.");
            }
        }
    }
);

const applicationsSlice = createSlice({
    name: 'applications',
    initialState: {
        applicationResponse: null, // Initialize as null to indicate no response yet
        applicants: [], // Initialize applicants array
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(applyForRole.pending, (state) => {
                state.loading = true; // Set loading to true when the request is pending
                state.error = null; // Clear previous error
            })
            .addCase(applyForRole.fulfilled, (state, action) => {
                state.loading = false; // Set loading to false when the request is fulfilled
                state.applicationResponse = action.payload; // Store the application response
                state.error = null; // Clear error on successful response
            })
            .addCase(applyForRole.rejected, (state, action) => {
                state.loading = false; // Set loading to false on rejection
                state.error = action.payload || "Failed to apply for the role."; // Set error message
            })
            .addCase(getApplicantsByRole.pending, (state) => {
                state.loading = true; // Set loading to true when the request is pending
                state.error = null; // Clear previous error
            })
            .addCase(getApplicantsByRole.fulfilled, (state, action) => {
                state.loading = false; // Set loading to false when the request is fulfilled
                state.applicants = action.payload; // Store the applicants data
                state.error = null; // Clear error on successful response
            })
            .addCase(getApplicantsByRole.rejected, (state, action) => {
                state.loading = false; // Set loading to false on rejection
                state.error = action.payload || "Failed to fetch applicants."; // Set error message
            });
    },
});

// Export the reducer to be used in the store
export const applicationsReducer = applicationsSlice.reducer;
