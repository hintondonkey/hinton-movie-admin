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
    async (movie, thunkAPI) => {
        try {
            return await movieService.handleCreateMovie(movie);
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

export const deleteMovies = createAsyncThunk(
    'auth/deleteMovies',
    async (id, thunkAPI) => {
        try {
            return await movieService.handleDeleteMovies(id);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const updateMovie = createAsyncThunk(
    'auth/updateMovie',
    async (movie, thunkAPI) => {
        try {
            return await movieService.handleUpdateMovie(movie);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const updateWatchList = createAsyncThunk(
    'auth/updateWatchList',
    async (movie, thunkAPI) => {
        try {
            return await movieService.handleUpdateWatchList(movie);
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
            .addCase(deleteMovies.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteMovies.fulfilled, (state, action) => {
                state.isError = false;
                state.isLoading = false;
                state.isSuccess = true;
                state.deleteMovies = 'Delete Success';
                state.message = 'success';
            })
            .addCase(deleteMovies.rejected, (state, action) => {
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
                state.isLoading = false;
            })
            .addCase(updateMovie.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateMovie.fulfilled, (state, action) => {
                state.isError = false;
                state.isLoading = false;
                state.isSuccess = true;
                state.updateMovie = action.payload;
                state.message = 'success';
            })
            .addCase(updateMovie.rejected, (state, action) => {
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
                state.isLoading = false;
            })
            .addCase(updateWatchList.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateWatchList.fulfilled, (state, action) => {
                state.isError = false;
                state.isLoading = false;
                state.isSuccess = true;
                state.updateWatchList = action.payload;
                state.message = 'success';
            })
            .addCase(updateWatchList.rejected, (state, action) => {
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
                state.isLoading = false;
            })
            .addCase(resetState, () => initialState);
    },
});

export default movieSlice.reducer;
