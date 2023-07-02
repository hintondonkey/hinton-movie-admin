import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import movieService from './movieServices';

const initialState = {
    movie: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: '',
};

export const createMovie = createAsyncThunk(
    'auth/createMovie',
    async (category, thunkAPI) => {
        try {
            return await movieService.handleCreateMovie(category);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const getAllMovies = createAsyncThunk(
    'auth/getAllMovies',
    async (id, thunkAPI) => {
        try {
            return await movieService.handleGetAllMovies(id);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const getDetailMovies = createAsyncThunk(
    'auth/getDetailMovies',
    async (id, thunkAPI) => {
        try {
            return await movieService.handleGetDetailMovies(id);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const resetState = createAction('Reset_all');

export const movieSlice = createSlice({
    name: 'moive',
    initialState: initialState,
    reducers: {},
    extraReducers: (buildeer) => {
        buildeer
            .addCase(createMovie.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createMovie.fulfilled, (state, action) => {
                state.isError = false;
                state.isLoading = false;
                state.isSuccess = true;
                state.createMovie = action.payload;
                state.message = 'success';
            })
            .addCase(createMovie.rejected, (state, action) => {
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
                state.isLoading = false;
            })
            .addCase(getAllMovies.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllMovies.fulfilled, (state, action) => {
                state.isError = false;
                state.isLoading = false;
                state.isSuccess = true;
                state.movie = action.payload;
                state.message = 'success';
            })
            .addCase(getAllMovies.rejected, (state, action) => {
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
                state.isLoading = false;
            })
            .addCase(getDetailMovies.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getDetailMovies.fulfilled, (state, action) => {
                state.isError = false;
                state.isLoading = false;
                state.isSuccess = true;
                state.getDetailMovies = action.payload;
                state.message = 'success';
            })
            .addCase(getDetailMovies.rejected, (state, action) => {
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
                state.isLoading = false;
            })
            .addCase(resetState, () => initialState);
    },
});

export default movieSlice.reducer;
