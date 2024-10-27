import axios from 'axios';
import { ADMIN_API_USER, PROJECTS_API_END_POINT } from '@/utils/constant';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Function to get token from local storage
const getToken = () => localStorage.getItem('token');

// Define initial state
const initialState = {
    projects: [],
    project: null,
    status: 'idle',
    error: null,
};

export const fetchProjectsByCompany = createAsyncThunk(
    'projects/fetchProjectsByCompany',
    async (_, { rejectWithValue }) => {
        try {
            const token = getToken();
            const response = await axios.get(`${ADMIN_API_USER}/projectbycompany`, {
                headers: { 'Authorization': `Bearer ${token}` },
            });
            console.log('====================================');
            console.log(response.data);
            console.log('====================================');
            return response.data.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || error.message || 'Failed to fetch projects by company'
            );
        }
    }
);
export const fetchProjectsByCompanis = createAsyncThunk(
    'projects/fetchProjectsByCompanis',
    async (selectedCompanyId, { rejectWithValue }) => {
        try {

            const token = getToken(); // Ensure getToken() correctly retrieves your token
            const response = await axios.get(`${PROJECTS_API_END_POINT}/${selectedCompanyId}`, {
                headers: { 'Authorization': `Bearer ${token}` },
            });


            return response.data.data; // Return only the data from the response
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || error.message || 'Failed to fetch projects'
            );
        }
    }
);


export const fetchAssignedProjects = createAsyncThunk(
    'projects/fetchAssignedProjects',
    async (_, { rejectWithValue }) => {
        try {
            const token = getToken();
            const response = await axios.get(`${ADMIN_API_USER}/myprojects-assigned`, {
                headers: { 'Authorization': `Bearer ${token}` },
            });
            return response.data.assignedProjects;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || error.message || 'Failed to fetch assigned projects'
            );
        }
    }
);



// Thunks for async operations
export const fetchAllProjects = createAsyncThunk(
    'projects/fetchAllProjects',
    async (_, { rejectWithValue }) => {
        try {
            const token = getToken();
            const response = await axios.get(`${PROJECTS_API_END_POINT}`, {
                headers: { 'Authorization': `Bearer ${token}` },
            });
            console.log('====================================');
            console.log(response);
            console.log('====================================');
            return response.data;
            if (Array.isArray(response.data)) {

            } else {
                throw new Error('Unexpected response format.');
            }
        } catch (error) {
            return rejectWithValue(error.message || 'Failed to fetch projects');
        }
    }
);

export const fetchProjectById = createAsyncThunk(
    'projects/fetchProjectById',
    async (id, { rejectWithValue }) => {
        try {
            const token = getToken();
            const response = await axios.get(`${PROJECTS_API_END_POINT}/${id}`, {
                headers: { 'Authorization': `Bearer ${token}` },
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || error.message || 'Failed to fetch project'
            );
        }
    }
);

export const createProject = createAsyncThunk(
    'projects/createProject',
    async (projectData, { rejectWithValue }) => {
        try {
            const token = getToken();
            const response = await axios.post(`${PROJECTS_API_END_POINT}`, projectData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`,
                },
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || error.message || 'Failed to create project'
            );
        }
    }
);

export const updateProject = createAsyncThunk(
    'projects/updateProject',
    async ({ projectId, updatedData }, { rejectWithValue }) => {
        try {
            const token = getToken();
            const response = await fetch(`${PROJECTS_API_END_POINT}/${projectId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(updatedData),
            });

            if (!response.ok) {
                throw new Error('Failed to update project');
            }

            return response.json();
        } catch (error) {
            return rejectWithValue(error.message || 'Failed to update project');
        }
    }
);

export const deleteProject = createAsyncThunk(
    'projects/deleteProject',
    async (id, { rejectWithValue }) => {
        try {
            const token = getToken();
            await axios.delete(`${PROJECTS_API_END_POINT}/${id}`, {
                headers: { 'Authorization': `Bearer ${token}` },
            });
            return id;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || error.message || 'Failed to delete project'
            );
        }
    }
);

// Create slice
const projectSlice = createSlice({
    name: 'projects',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllProjects.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchAllProjects.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.projects = action.payload;
            })
            .addCase(fetchAllProjects.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload || 'Failed to fetch projects';
            })
            .addCase(fetchProjectById.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchProjectById.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.project = action.payload;
            })
            .addCase(fetchProjectById.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload || 'Failed to fetch project by ID';
            })
            .addCase(createProject.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(createProject.fulfilled, (state, action) => {
                state.projects.push(action.payload);
                state.status = 'succeeded';
            })
            .addCase(createProject.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload || 'Failed to create project';
            })
            .addCase(updateProject.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(updateProject.fulfilled, (state, action) => {
                state.status = 'succeeded';
                const index = state.projects.findIndex((project) => project._id === action.payload._id);
                if (index !== -1) {
                    state.projects[index] = action.payload;
                }
            })
            .addCase(updateProject.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload || 'Failed to update project';
            })
            .addCase(deleteProject.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(deleteProject.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.projects = state.projects.filter((project) => project._id !== action.payload);
            })
            .addCase(deleteProject.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(fetchProjectsByCompany.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchProjectsByCompany.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.projects = action.payload;
            })
            .addCase(fetchProjectsByCompany.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload || 'Failed to fetch projects by company';
            })
            .addCase(fetchAssignedProjects.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchAssignedProjects.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.projects = action.payload;
            })
            .addCase(fetchAssignedProjects.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload || 'Failed to fetch assigned projects';
            })
            .addCase(fetchProjectsByCompanis.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchProjectsByCompanis.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.projects = action.payload;
            })
            .addCase(fetchProjectsByCompanis.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload || 'Failed to fetch projects by company';
            })
    },
});

export default projectSlice.reducer;
