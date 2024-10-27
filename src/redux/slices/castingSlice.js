import { ADMIN_API_USER, CASTING_API_END_POINT } from '@/utils/constant';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk to create a new casting
export const createCasting = createAsyncThunk(
    'castings/createCasting',
    async (castingData, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${CASTING_API_END_POINT}`, castingData, {
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || 'An error occurred while creating the casting');
        }
    }
);
// Async thunk to fetch casting calls by company
export const fetchCastingCallsByCompany = createAsyncThunk(
    'castings/fetchCastingCallsByCompany',
    async (_, { rejectWithValue }) => { // Fix parameter handling
        try {
            const response = await axios.get(`${ADMIN_API_USER}/castingbycompany`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });
            console.log('====================================');
            console.log(response.data);
            console.log('====================================');
            return response.data.castings || []; // Ensure a default value
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Failed to fetch casting calls by company');
        }
    }
);

// Async thunk to fetch casting calls by projectid

export const fetchCastingCallsByProjectId = createAsyncThunk(
    'castings/fetchCastingCallsByProjectId',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${ADMIN_API_USER}/castingsbyproject`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });

            // Log the actual response data to understand its structure
            console.log('Casting calls by project response:', response.data);

            // Assuming the casting calls are nested in the "castings" field
            return response.data.castings || []; 
        } catch (error) {
            // Log the error for debugging purposes
            console.error('Error fetching casting calls by project:', error);
            return rejectWithValue(error.response?.data || 'Failed to fetch casting calls by project');
        }
    }
);


// Async thunk to fetch casting details by wccId
export const fetchCastingDetailsByWccId = createAsyncThunk(
    'castings/fetchCastingDetailsByWccId',
    async (wccId, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${CASTING_API_END_POINT}/${wccId}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },

            });
            
            return response.data; // Adjust according to the actual response structure
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Failed to fetch casting details');
        }
    }
);

// Async thunk to get the castings related to the logged-in user
export const fetchAllCastings = createAsyncThunk(
    'castings/fetchAllCastings',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${CASTING_API_END_POINT}/me`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });
            return response.data.castings || []; // Ensure a default value
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Failed to fetch casting calls');
        }
    }
);
export const fetchAllCasting = createAsyncThunk(
    'castings/fetchAllCasting',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${CASTING_API_END_POINT}/all`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });
            return response.data.castings || []; // Ensure a default value
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Failed to fetch casting calls');
        }
    }
);

// Async thunk to update a casting by ID
export const updateCasting = createAsyncThunk(
    'castings/updateCasting',
    async ({ castingId, updatedData }, { rejectWithValue }) => {
        try {
            const response = await axios.put(`${CASTING_API_END_POINT}/${castingId}`, updatedData, {
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || 'An error occurred while updating the casting');
        }
    }
);

// Async thunk to delete a casting by ID
export const deleteCasting = createAsyncThunk(
    'castings/deleteCasting',
    async (castingId, { rejectWithValue }) => {
        try {
            await axios.delete(`${CASTING_API_END_POINT}/${castingId}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });
            return castingId;
        } catch (error) {
            return rejectWithValue(error.response?.data || 'An error occurred while deleting the casting');
        }
    }
);

// Async thunk to get upcoming castings
export const fetchUpcomingCastings = createAsyncThunk(
    'castings/fetchUpcomingCastings',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${CASTING_API_END_POINT}/upcoming`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });
            return response.data.upcomingCastings || []; // Ensure a default value
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Failed to fetch upcoming castings');
        }
    }
);

// Async thunk to get updated castings
export const fetchUpdatedCastings = createAsyncThunk(
    'castings/fetchUpdatedCastings',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${CASTING_API_END_POINT}/updated`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });
            console.log('====================================');
            console.log(
                'Updated Castings:',
                response.data.lastUpdatedCastings,
                '===================================='
            );
            console.log('====================================');
            return response.data.lastUpdatedCastings || []; // Ensure a default value
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Failed to fetch updated castings');
        }
    }
);

const initialState = {
    castings: [],
    upcomingCastings: [],
    updatedCastings: [],
    castingDetails: {}, // Initialize as an empty object if expecting single detail
    status: 'idle',
    error: null,
};

const castingSlice = createSlice({
    name: 'castings',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Handle createCasting lifecycle
            .addCase(createCasting.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(createCasting.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.castings.push(action.payload);
            })
            .addCase(createCasting.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            // Handle fetchAllCastings lifecycle
            .addCase(fetchAllCastings.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchAllCastings.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.castings = Array.isArray(action.payload) ? action.payload : [];
            })
            .addCase(fetchAllCastings.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            // Handle fetchAllCastings lifecycle
            .addCase(fetchAllCasting.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchAllCasting.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.castings = Array.isArray(action.payload) ? action.payload : [];
            })
            .addCase(fetchAllCasting.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            // Handle updateCasting lifecycle
            .addCase(updateCasting.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(updateCasting.fulfilled, (state, action) => {
                state.status = 'succeeded';
                const index = state.castings.findIndex(casting => casting._id === action.payload._id);
                if (index !== -1) {
                    state.castings[index] = action.payload;
                }
            })
            .addCase(updateCasting.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            // Handle deleteCasting lifecycle
            .addCase(deleteCasting.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(deleteCasting.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.castings = state.castings.filter(casting => casting._id !== action.payload);
            })
            .addCase(deleteCasting.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            // Handle fetchUpcomingCastings lifecycle
            .addCase(fetchUpcomingCastings.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchUpcomingCastings.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.upcomingCastings = Array.isArray(action.payload) ? action.payload : [];
            })
            .addCase(fetchUpcomingCastings.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            // Handle fetchUpdatedCastings lifecycle
            .addCase(fetchUpdatedCastings.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchUpdatedCastings.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.updatedCastings = Array.isArray(action.payload) ? action.payload : [];
            })
            .addCase(fetchUpdatedCastings.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            // Handle fetchCastingDetailsByWccId lifecycle
            .addCase(fetchCastingDetailsByWccId.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchCastingDetailsByWccId.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.castingDetails = action.payload; // Store the fetched casting details
            })
            .addCase(fetchCastingDetailsByWccId.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(fetchCastingCallsByCompany.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchCastingCallsByCompany.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.castings = Array.isArray(action.payload) ? action.payload : [];
            })
            .addCase(fetchCastingCallsByCompany.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(fetchCastingCallsByProjectId.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchCastingCallsByProjectId.fulfilled, (state, action) => {
                state.status = 'succeeded';

                // Ensure the payload is an array before setting it in the state
                state.castings = Array.isArray(action.payload) ? action.payload : [];
            })
            .addCase(fetchCastingCallsByProjectId.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });

    },
});

export default castingSlice.reducer;
