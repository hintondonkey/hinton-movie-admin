import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import categoryService from './categoryServices';

const initialState = {
    category: [],
    subcategory: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: '',
};

export const createCategory = createAsyncThunk(
    'auth/createCategory',
    async (category, thunkAPI) => {
        try {
            return await categoryService.handleCreateCategory(category);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const listCategory = createAsyncThunk(
    'auth/listCategory',
    async (category, thunkAPI) => {
        try {
            return await categoryService.handleListCategory();
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const getIdCategory = createAsyncThunk(
    'auth/getIdCategory',
    async (category, thunkAPI) => {
        try {
            return await categoryService.handleGetIdCategory(category);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const updateCategory = createAsyncThunk(
    'auth/updateCategory',
    async (category, thunkAPI) => {
        try {
            return await categoryService.handleUpdateCategory(category);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const subCreateCategory = createAsyncThunk(
    'auth/subCreateCategory',
    async (category, thunkAPI) => {
        try {
            return await categoryService.handleCreateSubCategory(category);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const resetState = createAction('Reset_all');

export const categorySlice = createSlice({
    name: 'category',
    initialState: initialState,
    reducers: {},
    extraReducers: (buildeer) => {
        buildeer
            .addCase(createCategory.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createCategory.fulfilled, (state, action) => {
                state.isError = false;
                state.isLoading = false;
                state.isSuccess = true;
                state.createCategory = action.payload;
                state.message = 'success';
            })
            .addCase(createCategory.rejected, (state, action) => {
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
                state.isLoading = false;
            })
            .addCase(listCategory.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(listCategory.fulfilled, (state, action) => {
                state.isError = false;
                state.isLoading = false;
                state.isSuccess = true;
                state.category = action.payload;
                state.message = 'success';
            })
            .addCase(listCategory.rejected, (state, action) => {
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
                state.isLoading = false;
            })
            .addCase(getIdCategory.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getIdCategory.fulfilled, (state, action) => {
                state.isError = false;
                state.isLoading = false;
                state.isSuccess = true;
                state.getIdcategory = action.payload;
                state.message = 'success';
            })
            .addCase(getIdCategory.rejected, (state, action) => {
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
                state.isLoading = false;
            })
            .addCase(updateCategory.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateCategory.fulfilled, (state, action) => {
                state.isError = false;
                state.isLoading = false;
                state.isSuccess = true;
                state.updateCategory = action.payload;
                state.message = 'success';
            })
            .addCase(updateCategory.rejected, (state, action) => {
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
                state.isLoading = false;
            })
            .addCase(subCreateCategory.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(subCreateCategory.fulfilled, (state, action) => {
                state.isError = false;
                state.isLoading = false;
                state.isSuccess = true;
                state.subCreateCategory = action.payload;
                state.message = 'success';
            })
            .addCase(subCreateCategory.rejected, (state, action) => {
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
                state.isLoading = false;
            })
            .addCase(resetState, () => initialState);
    },
});

export default categorySlice.reducer;
