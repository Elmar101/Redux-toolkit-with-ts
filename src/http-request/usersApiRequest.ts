import axios, { AxiosResponse } from "axios"
import { getUserUrl } from "./httpUrl";
import { User } from "../features/user-slice/userSlice";

export const getUsers = (): Promise<AxiosResponse<User>> =>{
  return axios.get<User>(getUserUrl);
};