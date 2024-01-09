import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 } from "uuid";
import { addWithCreateAction } from "./createAction";

export interface Todo {
  id: string;
  title: string;
  completed: boolean;
}

const initialState: Todo[] = [];

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    add: (state, action: PayloadAction<string>) => {
      const newTodo: Todo = {
        id: v4(),
        title: action.payload,
        completed: false
      };
      state.push(newTodo);
    },
    remove: (state, action: PayloadAction<string>) => {
      return state.filter((item) => item.id !== action.payload);
    },
    toggleCompleted: (state, action: PayloadAction<string>) => {
      return state.map((item) =>
        item.id === action.payload
          ? { ...item, completed: !item.completed }
          : item
      );
    }
  },
  extraReducers(builder) {
    builder.addCase(addWithCreateAction, (state, action: PayloadAction<string>)=>{
      const newTodo: Todo = {
        id: v4(),
        title: action.payload,
        completed: false,
      };
      state.push(newTodo);
    });
  },
});

export const todoReducer = todoSlice.reducer;
export const { add, remove, toggleCompleted } = todoSlice.actions;
