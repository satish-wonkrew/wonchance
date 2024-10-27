import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/utils/axiosInstance";
import { ADMIN_API_USER, USER_API_END_POINT, API_BASE_URL } from "@/utils/constant";
import axios from "axios";

// Define your async thunks here

export const fetchApprovedUsers = createAsyncThunk(
    "talent/fetchApprovedUsers",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(`${USER_API_END_POINT}/approved`);
            return response.data.users;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);
// Async thunk to fetch assigned users
export const fetchAssignedUsers = createAsyncThunk(
    'user/fetchAssignedUsers',
    async (_, { rejectWithValue }) => {
        try {
            // Retrieve token from local storage or another secure location
            const token = localStorage.getItem('token');

            // Make the request with the token in the headers
            const response = await axios.get(`${ADMIN_API_USER}/assign-user`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            console.log('Assigned Users Data:', response.data.assignedUsers);

            return response.data;
        } catch (error) {
            const errorMessage = error.response?.data?.message || error.message;
            return rejectWithValue(errorMessage);
        }
    }
);
export const getUserById = createAsyncThunk(
    "talent/getUserById",
    async (userId, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(`${USER_API_END_POINT}/profile/${userId}`);
            return response.data.user;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const fetchAllUsers = createAsyncThunk(
    "talent/fetchAllUsers",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(`${ADMIN_API_USER}/users/`);
            return response.data.users;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const updateUserApprovalStatus = createAsyncThunk(
    "talent/updateUserApprovalStatus",
    async ({ userId, isApproved }, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.patch(`${ADMIN_API_USER}/users/${userId}`, { isApproved });
            return response.data.user;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const assignUserToProject = createAsyncThunk(
    "talent/assignUserToProject",
    async ({ userId, projectId }, { rejectWithValue }) => {
        if (!projectId) {
            return rejectWithValue("Project ID is required");
        }
        try {
            const response = await axiosInstance.post(`${ADMIN_API_USER}/projects/${projectId}/assign`, { userId });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const assignUserToCompany = createAsyncThunk(
    "talent/assignUserToCompany",
    async ({ userId, companyId }, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post(`${ADMIN_API_USER}/companies/${companyId}/assign`, { userId });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

const talentSlice = createSlice({
    name: "talent",
    initialState: {
        users: [],
        assignedUsers: [],
        selectedUser: null,
        filters: {
            gender: "",
            professionalLevel: "",
            age: "",
            profile: "",
        },
        status: "idle",
        error: null,
    },
    reducers: {
        setFilters(state, action) {
            state.filters = { ...state.filters, ...action.payload };
        },
        clearFilters(state) {
            state.filters = {
                gender: "",
                professionalLevel: "",
                age: "",
                profile: "",
            };
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchApprovedUsers.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchApprovedUsers.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.users = action.payload;
            })
            .addCase(fetchApprovedUsers.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })
            .addCase(fetchAllUsers.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchAllUsers.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.users = action.payload;
            })
            .addCase(fetchAllUsers.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })
            .addCase(updateUserApprovalStatus.pending, (state) => {
                state.status = "loading";
            })
            .addCase(updateUserApprovalStatus.fulfilled, (state, action) => {
                state.status = "succeeded";
                const updatedUser = action.payload;
                state.users = state.users.map((user) =>
                    user.id === updatedUser.id ? updatedUser : user
                );
            })
            .addCase(updateUserApprovalStatus.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })
            .addCase(getUserById.pending, (state) => {
                state.status = "loading";
            })
            .addCase(getUserById.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.selectedUser = action.payload;
            })
            .addCase(getUserById.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })
            .addCase(assignUserToProject.pending, (state) => {
                state.status = "loading";
            })
            .addCase(assignUserToProject.fulfilled, (state, action) => {
                state.status = "succeeded";
                // Handle successful assignment (update state if needed)
            })
            .addCase(assignUserToProject.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })
            .addCase(assignUserToCompany.pending, (state) => {
                state.status = "loading";
            })
            .addCase(assignUserToCompany.fulfilled, (state, action) => {
                state.status = "succeeded";
                // Handle successful assignment (update state if needed)
            })
            .addCase(assignUserToCompany.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })
            .addCase(fetchAssignedUsers.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchAssignedUsers.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.assignedUsers = action.payload;
            })
            .addCase(fetchAssignedUsers.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    },
});

export const { setFilters, clearFilters } = talentSlice.actions;

export default talentSlice.reducer;
