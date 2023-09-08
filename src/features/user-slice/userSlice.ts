import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

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
}

interface UserStae {
  data: User | null;
  loading: boolean;
  error: string | Record<string, string>;
}

const initialState: UserStae = {
  data: null,
  loading: false,
  error: ""
};

const url = "https://randomuser.me/api/";

const fetchUser = createAsyncThunk<User, undefined, { rejectValue: string }>(
  "fetchUser",
  async (_, { rejectWithValue, getState }) => {
      console.log("getState is : s" ,getState());
      
      const response = await axios.get<User>(url);
      if(response.status !== 200) return rejectWithValue("error")
      return response as User | any;
  }
);

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
      .addCase(
        fetchUser.fulfilled,
        (state, action: PayloadAction<User>) => {
          state.loading = false;
          state.data = action.payload;
        }
      )
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = "Error Fetching user data";
      });
  }
});

export const userReducer = userSlice.reducer;

export { fetchUser };
