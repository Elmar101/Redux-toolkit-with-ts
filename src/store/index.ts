import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import { userReducer } from "./features/user-slice/userSlice";
import { postApi, postApiReducer } from "./api/postsApi";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { todoReducer } from "./features/todo-slice/todoSlice";

const store = configureStore({
  reducer: {
    todos: todoReducer,
    users: userReducer,
    [postApi.reducerPath]: postApiReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(postApi.middleware)
  },
});

setupListeners(store.dispatch);
export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

/*
  export type UseAppDispatch =  () => typeof store.dispatch;
  export const useAppDispatch : UseAppDispatch = useDispatch;
*/

(window as Window & typeof globalThis & {store: any} ).store = store;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export * from './features/todo-slice/todoSlice';
export * from  "./features/user-slice/userSlice";
export { useFetchUserPostsQuery, useCreateUserPostMutation } from './api/postsApi'
