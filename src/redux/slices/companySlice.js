import { ADMIN_API_USER, COMPANY_API_END_POINT } from '@/utils/constant';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunks
export const createCompany = createAsyncThunk(
  'companies/createCompany',
  async (companyData, { rejectWithValue }) => {
    try {
      const response = await axios.post(COMPANY_API_END_POINT, companyData, {
        headers: {
          "Content-Type": "multipart/form-data",
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to create company');
    }
  }
);

export const createProjectByCompany = createAsyncThunk(
  'projects/createProjectByCompany',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${ADMIN_API_USER}/projectbycompany`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to create project');
    }
  }
);

export const updateCompanyDetails = createAsyncThunk(
  'company/updateCompanyDetails',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${ADMIN_API_USER}/mycompany-update`, formData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to update company details');
    }
  }
);

export const fetchCompanyById = createAsyncThunk(
  'company/fetchCompanyById',
  async (companyId, { rejectWithValue }) => {
    try {
      const response = await fetch(`${COMPANY_API_END_POINT}/${companyId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch company');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch company');
    }
  }
);

export const fetchAllCompanies = createAsyncThunk(
  'company/fetchAllCompanies',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${COMPANY_API_END_POINT}/get`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      
      const data = await response.data;
      return data;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch companies');
    }
  }
);
export const fetchAllCompany = createAsyncThunk(
  'company/fetchAllCompany',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${COMPANY_API_END_POINT}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch companies');
      }
      
      const data = await response.json();
      return data.companies;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch companies');
    }
  }
);

export const updateCompany = createAsyncThunk(
  'company/updateCompany',
  async ({ companyId, updatedData }, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      for (const key in updatedData) {
        if (updatedData[key] !== undefined) {
          formData.append(key, updatedData[key]);
        }
      }
      const response = await fetch(`${COMPANY_API_END_POINT}/${companyId}`, {
        method: 'PUT',
        body: formData,
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (!response.ok) {
        throw new Error('Failed to update company');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to update company');
    }
  }
);

export const deleteCompany = createAsyncThunk(
  'company/deleteCompany',
  async (companyId, { rejectWithValue }) => {
    try {
      const response = await fetch(`${COMPANY_API_END_POINT}/${companyId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (!response.ok) {
        throw new Error('Failed to delete company');
      }
      return companyId;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to delete company');
    }
  }
);

export const fetchAssignedCompanyDetails = createAsyncThunk(
  'company/fetchAssignedCompanyDetails',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${ADMIN_API_USER}/mycompany-assigned`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      return response.data.companyDetails
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch assigned company details');
    }
  }
);

// Slice
const companySlice = createSlice({
  name: 'companies',
  initialState: {
    companies: [],
    selectedCompany: null,
    assignedCompany: null,
    status: null,
    error: null,
    projects: [],
    companyDetails: {}, // Change to an object if only one company detail is stored
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handle createCompany lifecycle
      .addCase(createCompany.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(createCompany.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.companies.push(action.payload);
      })
      .addCase(createCompany.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      // Handle fetchCompanyById lifecycle
      .addCase(fetchCompanyById.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchCompanyById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.selectedCompany = action.payload;
      })
      .addCase(fetchCompanyById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      // Handle fetchAllCompanies lifecycle
      .addCase(fetchAllCompany.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchAllCompany.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.companies = action.payload;
      })
      .addCase(fetchAllCompany.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      // Handle fetchAllCompanies lifecycle
      .addCase(fetchAllCompanies.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchAllCompanies.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.companies = action.payload;
      })
      .addCase(fetchAllCompanies.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      // Handle updateCompany lifecycle
      .addCase(updateCompany.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(updateCompany.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const index = state.companies.findIndex(company => company._id === action.payload._id);
        if (index !== -1) {
          state.companies[index] = action.payload;
        }
      })
      .addCase(updateCompany.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      // Handle deleteCompany lifecycle
      .addCase(deleteCompany.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(deleteCompany.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.companies = state.companies.filter(company => company._id !== action.payload);
      })
      .addCase(deleteCompany.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      // Handle updateCompanyDetails lifecycle
      .addCase(updateCompanyDetails.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(updateCompanyDetails.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.companyDetails = action.payload;
      })
      .addCase(updateCompanyDetails.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      // Handle createProjectByCompany lifecycle
      .addCase(createProjectByCompany.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(createProjectByCompany.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.projects.push(action.payload);
      })
      .addCase(createProjectByCompany.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      // Handle fetchAssignedCompanyDetails lifecycle
      .addCase(fetchAssignedCompanyDetails.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchAssignedCompanyDetails.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.assignedCompany = action.payload;
      })
      .addCase(fetchAssignedCompanyDetails.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default companySlice.reducer;
