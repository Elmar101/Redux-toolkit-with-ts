import axios, { AxiosResponse } from "axios";
import { getUserUrl, getJsonServerUsersUrl } from "./httpUrl";
import { IJsonServerUsers, User } from "../features/user-slice/userSlice";

export const getUsers = (): Promise<AxiosResponse<User>> =>{
  return axios.get<User>(getUserUrl);
};

export const getJsonServerUsers = (): Promise<AxiosResponse<IJsonServerUsers[]>> =>{
  return axios.get<IJsonServerUsers[]>(getJsonServerUsersUrl);
};

export const addUserJsonServerUsers = (body: {id: string, name: string} ): Promise<AxiosResponse<IJsonServerUsers>> =>{
  return axios.post<IJsonServerUsers>(getJsonServerUsersUrl, body);
};

export const removedUserFromJsonServerUsers = (id: string): Promise<AxiosResponse<IJsonServerUsers>> => {
  return axios.delete<IJsonServerUsers>(`${getJsonServerUsersUrl}/${id}`);
};