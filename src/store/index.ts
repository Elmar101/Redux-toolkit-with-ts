import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import {
  add,
  remove,
  toggleCompleted,
  todoReducer
} from "../features/todo-slice/todoSlice";
import { userReducer, fetchUser } from "../features/user-slice/userSlice";

const store = configureStore({
  reducer: {
    todos: todoReducer,
    users: userReducer
  }
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export { add, remove, toggleCompleted, fetchUser };
