import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { v4 } from "uuid";
import { addUserJsonServerUsers, getJsonServerUsers, getUsers } from "../../http-request/usersApiRequest";

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

export interface IJsonServerUsers {
  id: string;
  name: string;
  src?: string;
}

interface UserState {
  data: User | null;
  jsonServerUsers?: IJsonServerUsers[] | null,
  addJsonServerUser?: IJsonServerUsers;
  loading: boolean;
  error: string | Record<string, string> | AxiosError;
}

const initialState: UserState = {
  data: null,
  jsonServerUsers: null,
  loading: false,
  error: "",
};

function delay(pauseTime: number):Promise<unknown> {
  return new Promise((resolve)=>{
    setTimeout(resolve, pauseTime);
  })
};

const fetchUser = createAsyncThunk("fetchUser", async (_, thunkApi) => {
  try {
    const response = await getUsers();
    await delay(1500);
    return response.data;
  } catch (error) {
    const err = error as AxiosError
    if (err.status !== 400) return thunkApi.rejectWithValue("error");
    return thunkApi.rejectWithValue(err.response?.status);
  }
});

const fetchJsonServerUsers = createAsyncThunk("fetchJsonServerUsers", async (_, thunkApi) => {
  try {
    const { data } = await getJsonServerUsers();
    await delay(3000);
    return data;
  } catch (error) {
    const err = error as AxiosError
    if (err.status !== 400) return thunkApi.rejectWithValue("error Json server");
    return thunkApi.rejectWithValue(err.response?.status);
  }
});

const addUserInJsonServerUsers = createAsyncThunk("addJsonServerUsers", async (name: string ,thunkApi) => {
  try {
    const { data } = await addUserJsonServerUsers({id: v4(), name});
    await delay(3000);
    return data;
  } catch (error) {
    const err = error as AxiosError
    if (err.status !== 400) return thunkApi.rejectWithValue("error Json server");
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
    // JSON SERVER GET USERS
     builder
      .addCase(fetchJsonServerUsers.pending, (state, action) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(fetchJsonServerUsers.fulfilled, (state, action: PayloadAction<IJsonServerUsers[]>) => {
        state.loading = false;
        state.jsonServerUsers = action.payload;
      })
      .addCase(fetchJsonServerUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = "Error Fetching JSON SERVER USERS ...";
      });

      builder
        .addCase(addUserInJsonServerUsers.pending, (state, action) => {
          state.loading = true;
          state.error = "";
        })
        .addCase(addUserInJsonServerUsers.fulfilled, (state, action: PayloadAction<IJsonServerUsers>) => {
          state.loading = false;
          state.addJsonServerUser = action.payload;
        })
        .addCase(addUserInJsonServerUsers.rejected, (state, action) => {
          state.loading = false;
          state.error = "Error Fetching JSON SERVER USERS ...";
        });
  },
});

export const userReducer = userSlice.reducer;

export { fetchUser, fetchJsonServerUsers, addUserInJsonServerUsers };
