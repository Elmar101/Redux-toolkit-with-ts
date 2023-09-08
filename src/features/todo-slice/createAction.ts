import { createAction } from "@reduxjs/toolkit";

const addWithCreateAction = createAction("", (data: string) => {
  return {
    payload: data,
  };
});

export { addWithCreateAction  };