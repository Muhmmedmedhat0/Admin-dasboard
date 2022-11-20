import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const URL = 'https://e-comerce-api-a37q.vercel.app'

export const logIn = createAsyncThunk('user/logIn', async (values, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;

  try {
    const response = await fetch(`${URL}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(values),
    });
    const data = await response.json();
    sessionStorage.setItem('TOKEN', data.token);
    return data;
  } catch (error) {
    rejectWithValue(error);
  }
});

const userSlice = createSlice({
  name: 'user',
  initialState: {
    userInfo: false,
    loading: null,
    error: null,
  },
  extraReducers: {
    // add to user
    [logIn.pending]: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    [logIn.fulfilled]: (state, action) => {
      state.loading = false;
      state.userInfo = action.payload;
    },
    [logIn.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export default userSlice.reducer;
