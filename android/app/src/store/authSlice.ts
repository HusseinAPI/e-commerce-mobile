import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { UserData } from '../types/UserData';

export const signIn = createAsyncThunk(
  'auth/signIn',
  async (userData: UserData, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const response = await fetch(`http://192.168.88.226:3001/users/signin`, {
        method: 'POST',
        body: JSON.stringify(userData),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      });
      const data = await response.json();
      console.log(data);

      if (data) {
        return data;
      }
      return null;
    } catch (error) {
      if (error instanceof Error) {
        rejectWithValue(error.message);
      } else {
        rejectWithValue(error);
      }
    }
  },
);

export const signUp = createAsyncThunk(
  'auth/signUp',
  async (userData: UserData, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const response = await fetch('http://192.168.88.226:3001/users/signup', {
        method: 'POST',
        body: JSON.stringify(userData),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      });
      const data = await response.json();

      if (data) {
        return data;
      }
      return null;
    } catch (error) {
      if (error instanceof Error) {
        rejectWithValue(error.message);
      } else {
        rejectWithValue(error);
      }
    }
  },
);

const initialState = {
  user: null,
  profileImg: null,
  favourite: [],
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      state.user = action.payload;
    },

    logout: state => {
      state.user = null;
    },
  },
  extraReducers: builder =>
    builder
      .addCase(signIn.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.user = action.payload;
      }),
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
