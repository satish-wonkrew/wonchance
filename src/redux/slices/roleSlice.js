import { ROLE_API_ENDPOINT } from '@/utils/constant';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk to create a new role
export const createRole = createAsyncThunk(
    'roles/createRole',
    async (roleData, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${ROLE_API_ENDPOINT}`, roleData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || 'An error occurred while creating the role');
        }
    }
);

// Async thunk to fetch roles by project ID
export const fetchRolesByProject = createAsyncThunk(
    'roles/fetchRolesByProject',
    async (selectedProject, { rejectWithValue }) => {

        try {
            // Extract projectId from the project object
            const projectId = selectedProject.id;
            

            const response = await axios.get(`${ROLE_API_ENDPOINT}/projects/${projectId}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });

            // Return roles data
            return response.data.roles || response.data;
        } catch (error) {
            // Provide a more detailed error message
            return rejectWithValue(
                error.response?.data || 'An error occurred while fetching roles for the project'
            );
        }
    }
);
// Async thunk to fetch roles by project ID
export const fetchRolesByProjectId = createAsyncThunk(
    'roles/fetchRolesByProjectId',
    async (selectedProject, { rejectWithValue }) => {

        try {
            // Extract projectId from the project object
            const projectId = selectedProject
            console.log('====================================');
            console.log(selectedProject);
            console.log('====================================');
            

            const response = await axios.get(`${ROLE_API_ENDPOINT}/projects/${projectId}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });

            // Return roles data
            return response.data.roles || response.data;
        } catch (error) {
            // Provide a more detailed error message
            return rejectWithValue(
                error.response?.data || 'An error occurred while fetching roles for the project'
            );
        }
    }
);



// Async thunk to get all roles
export const fetchAllRoles = createAsyncThunk(
    'roles/fetchAllRoles',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${ROLE_API_ENDPOINT}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });

            return response.data.roles || response.data; 
        } catch (error) {
            return rejectWithValue(error.response?.data || 'An error occurred while fetching roles');
        }
    }
);

// Async thunk to get a role by ID
export const fetchRoleById = createAsyncThunk(
    'roles/fetchRoleById',
    async (roleId, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${ROLE_API_ENDPOINT}/${roleId}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });

            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || 'An error occurred while fetching the role');
        }
    }
);

// Async thunk to update a role by ID
export const updateRole = createAsyncThunk(
    'roles/updateRole',
    async ({ roleId, updatedData }, { rejectWithValue }) => {
        try {
            const response = await axios.put(`${ROLE_API_ENDPOINT}/${roleId}`, updatedData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || 'An error occurred while updating the role');
        }
    }
);

// Async thunk to delete a role by ID
export const deleteRole = createAsyncThunk(
    'roles/deleteRole',
    async (roleId, { rejectWithValue }) => {
        try {
            await axios.delete(`${ROLE_API_ENDPOINT}/${roleId}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });

            return roleId;
        } catch (error) {
            return rejectWithValue(error.response?.data || 'An error occurred while deleting the role');
        }
    }
);

const roleSlice = createSlice({
    name: 'roles',
    initialState: {
        roles: [],
        selectedRole: null,
        status: null,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createRole.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(createRole.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.roles.push(action.payload);
            })
            .addCase(createRole.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(fetchAllRoles.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchAllRoles.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.roles = action.payload;
            })
            .addCase(fetchAllRoles.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(fetchRoleById.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchRoleById.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.selectedRole = action.payload;
            })
            .addCase(fetchRoleById.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(deleteRole.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(deleteRole.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.roles = state.roles.filter(role => role._id !== action.payload);
            })
            .addCase(deleteRole.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(updateRole.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(updateRole.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.roles = state.roles.map(role => 
                    role._id === action.payload._id ? action.payload : role
                );
                state.selectedRole = action.payload;
            })
            .addCase(updateRole.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(fetchRolesByProject.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchRolesByProject.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.roles = action.payload;
            })
            .addCase(fetchRolesByProject.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(fetchRolesByProjectId.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchRolesByProjectId.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.roles = action.payload;
            })
            .addCase(fetchRolesByProjectId.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    },
});

export default roleSlice.reducer;
