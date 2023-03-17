import { createSlice, configureStore } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = { 
  repos: [], 
  isLoading: false, 
};

export const reposSlice = createSlice({
  name: 'repos',
  initialState: initialState,
  reducers: {
    setRepos: (state, action) => {
      state.repos = action.payload;
      state.filteredRepos = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});


export const reposActions = reposSlice.actions;


const store = configureStore({
  reducer: reposSlice.reducer
});
export default store;


export const fetchRepos = (query) => async (dispatch) => {

  let URL;

  if (query === 'react') {
    URL = `https://api.github.com/search/repositories?q=${query}&per_page=20`
  } else {
    URL = `https://api.github.com/search/repositories?q=${query}`
  }

  dispatch(reposSlice.actions.setIsLoading(true));

  try {

    const response = await axios.get(
      URL
    );

    if (response.status !== 200) {
      throw new Error('Network response was not ok');
    }

    dispatch(reposSlice.actions.setRepos(response.data.items));

  } catch (error) {
    console.error('There was a problem with the axios operation:', error);
  } finally {
    dispatch(reposSlice.actions.setIsLoading(false));
  }
};