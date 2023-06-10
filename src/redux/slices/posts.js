import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';

export const fetchPosts = createAsyncThunk('/posts/fetchPosts', async () => {
    let {data} = await axios.get('/posts');
    let items = data.slice().sort((a,b) => {return new Date(b.createdAt) - new Date(a.createdAt)});
    return items;
});

export const fetchPostsByViews = createAsyncThunk('/posts/fetchPosts', async () => {
    let {data} = await axios.get('/posts');
    let items = data.slice().sort((a,b) => {return b.viewsCount - a.viewsCount});
    return items;
});

const initialState = {
    posts: {
        items: [],
        status: 'loading'
    },
}

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {

    },
    extraReducers: {
        [fetchPosts.pending]: (state) => {
            state.posts.status = 'loading';
        },
        [fetchPosts.fulfilled]: (state, action) => {
            state.posts.items = action.payload;
            state.posts.status = 'loaded'
        },
        [fetchPosts.rejected]: (state) => {
            state.posts.items = [];
            state.posts.status = 'error';
        },
        [fetchPostsByViews.pending]: (state) => {
            state.posts.status = 'loading';
        },
        [fetchPostsByViews.fulfilled]: (state, action) => {
            state.posts.items = action.payload;
            state.posts.status = 'loaded'
        },
        [fetchPostsByViews.rejected]: (state) => {
            state.posts.items = [];
            state.posts.status = 'error';
        }
    }
});

export const postsReducer = postsSlice.reducer;