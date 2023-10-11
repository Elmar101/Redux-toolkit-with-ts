import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { getUsers } from "../../http-request/usersApiRequest";

export type Name = Record<string, string>;
export type Coordinates = Record<string, string>;
export type Timezone = Record<string, string>;
export interface Location {
  [key: string]: string | Coordinates | Timezone;
}
export type Login = Record<string, string>;

export interface Dob {
  date: Date;
  age: number;
}

export interface Registered {
  date: Date;
  age: number;
}
export interface Id {
  name: string;
  value: string;
}
export interface Picture {
  large: string;
  medium: string;
  thumbnall: string;
}

export interface Result {
  gender: string;
  name: Name;
  location: Location;
  email: string;
  login: Login;
  dob: Dob;
  registered: Registered;
  phone: string;
  cell: string;
  id: IdleDeadline;
  picture: Picture;
  nat: string;
}

export interface Info {
  seed: string;
  results: number;
  page: number;
  version: string;
}
export interface User {
  result: Result[];
  info: Info;
};

interface UserState {
  data: User | null;
  loading: boolean;
  error: string | Record<string, string> | AxiosError;
}

const initialState: UserState = {
  data: null,
  loading: false,
  error: "",
};

const fetchUser = createAsyncThunk("fetchUser", async (_, thunkApi) => {
  try {
    const response = await getUsers();
    return response.data;
  } catch (error) {
    const err = error as AxiosError
    if (err.status !== 400) return thunkApi.rejectWithValue("error");
    return thunkApi.rejectWithValue(err.response?.status);
  }
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state, action) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(fetchUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = "Error Fetching user data";
      });
  },
});

export const userReducer = userSlice.reducer;

export { fetchUser };
