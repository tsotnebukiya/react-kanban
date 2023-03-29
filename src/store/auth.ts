import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  User,
} from 'firebase/auth';
import { RootStore } from '.';
import auth from '../firebase';

// Create Initial State
export interface AuthState {
  user: User | null;
  authenticated?: boolean | null;
  error?: { header: string; message: any } | null;
  authChecked?: boolean;
}

const initialState: AuthState = {
  user: null,
  authenticated: null,
  error: null,
  authChecked: false,
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
      return { user: response.user, authenticated: true };
    } catch (err: any) {
      console.log(`Login failed: ${err.message}`);
      return rejectWithValue(err.message);
    }
  }
);
export const signup = createAsyncThunk(
  'auth/signup',
  async (credentials: LoginCredentials, { rejectWithValue }) => {
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        credentials.email,
        credentials.password
      );
      return { user: response.user, authenticated: true };
    } catch (err: any) {
      console.log(`Signup failed: ${err.message}`);
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
          user: null,
          authenticated: null,
          error: null,
        };
      } catch (err: any) {
        console.log(`Logout failed: ${err.message}`);
        console.log(err);
        return rejectWithValue(err);
      }
    } else {
      return { user: null, authenticated: null };
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
      state.user = action.payload.user;
      state.error = null;
    },
    loggedOut: (state) => {
      state.authenticated = null;
      state.user = null;
      state.error = null;
    },
    authChecked: (state, action: PayloadAction<boolean>) => {
      state.authChecked = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action: PayloadAction<AuthState>) => {
        state.authenticated = action.payload.authenticated;
        state.user = action.payload.user;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.authenticated = null;
        state.user = null;
        state.error = { header: 'Logind failed', message: action.payload };
      })
      .addCase(logout.fulfilled, (state) => {
        state.authenticated = null;
        state.user = null;
        state.error = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.error = { header: 'Logout failed', message: action.payload };
      })
      .addCase(signup.fulfilled, (state, action: PayloadAction<AuthState>) => {
        state.authenticated = action.payload.authenticated;
        state.user = action.payload.user;
        state.error = null;
      })
      .addCase(signup.rejected, (state, action) => {
        state.authenticated = null;
        state.user = null;
        state.error = { header: 'Signup failed', message: action.payload };
      });
  },
});

export const authActions = authSlice.actions;

export default authSlice;
