import { createAction } from "@reduxjs/toolkit";

const addWithCreateAction = createAction("todos/addTodoWithCreateAction", (data: string) => {
  return {
    payload: data,
  };
});

export { addWithCreateAction  };