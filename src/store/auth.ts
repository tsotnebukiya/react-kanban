import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { RootStore } from '.';
import auth from '../firebase';

// Create Initial State
export interface AuthState {
  displayName?: string | null;
  email?: string | null;
  authenticated?: boolean | null;
  error?: any;
}

const initialState: AuthState = {
  displayName: null,
  email: null,
  authenticated: null,
  error: null,
};

// Async thunk to log in a user
interface LoginCredentials {
  email: string;
  password: string;
}

export const login = createAsyncThunk(
  'auth/login',
  async (credentials: LoginCredentials, { rejectWithValue }) => {
    try {
      const response = await signInWithEmailAndPassword(
        auth,
        credentials.email,
        credentials.password
      );
      const { displayName, email } = response.user;
      return { displayName, email, authenticated: true };
    } catch (err: any) {
      console.log(`Login failed: ${err.message}`);
      return rejectWithValue(err.message);
    }
  }
);

// Async thunk to log out user

export const logout = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue, getState }) => {
    const state = getState() as RootStore;
    if (state.auth.authenticated) {
      try {
        await signOut(auth);
        return {
          displayName: null,
          email: null,
          authenticated: null,
          error: null,
        };
      } catch (err: any) {
        console.log(`Logout failed: ${err.message}`);
        return rejectWithValue(err);
      }
    } else {
      return { displayName: null, email: null, authenticated: null };
    }
  }
);
// Create Slice

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loggedIn: (state, action: PayloadAction<AuthState>) => {
      state.authenticated = true;
      state.displayName = action.payload.displayName;
      state.email = action.payload.email;
      state.error = null;
    },
    loggedOut: (state) => {
      state.authenticated = null;
      state.email = null;
      state.displayName = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action: PayloadAction<AuthState>) => {
        state.authenticated = action.payload.authenticated;
        state.email = action.payload.email;
        state.displayName = action.payload.displayName;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.authenticated = null;
        state.email = null;
        state.displayName = null;
        state.error = action.payload;
      })
      .addCase(logout.fulfilled, (state) => {
        state.authenticated = null;
        state.email = null;
        state.displayName = null;
        state.error = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const authActions = authSlice.actions;

export default authSlice;
