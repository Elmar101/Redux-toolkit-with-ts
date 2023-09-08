import { useState, useMemo } from "react";
import { bindActionCreators } from "@reduxjs/toolkit";
import {
  add,
  fetchUser,
  remove,
  toggleCompleted,
  useAppDispatch,
  useAppSelector,
  addWithCreateAction
} from "./store/index";
import "./styles.css";

export default function App() {
  const [title, setTitle] = useState<string>("");
  const [titleForCreateAction, setForCreateActionTitle] = useState<string>("");
  const todos = useAppSelector((state) => state.todos);
  const user = useAppSelector((state) => state.users);

  const dispatch = useAppDispatch();

  const onSave = () => {
    dispatch(add(title));
    setTitle("");
  };

  const onRemove = (id: string) => {
    dispatch(remove(id));
  };

  const onToggle = (id: string) => {
    dispatch(toggleCompleted(id));
  };

  const fetchUserWithApi = () => {
    dispatch(fetchUser())
  };
  // use BIND ACTION CREATORs
  const fetchUserWithBindActionCreators = () => {
    bindActionCreators({fetchUser} , dispatch);
  };
  // we can use all action this roles
  const boundActionCreators = useMemo(
    () => bindActionCreators({fetchUser, add}, dispatch),
    [dispatch]
  );

  const onBindSave = () => {
    boundActionCreators.add(title);
    setTitle("");
  };

  const fetchUserWithBindActionCreatorsMemo = () => {
    boundActionCreators.fetchUser();
  };

  // createAction
  const onCreateActionSave = () =>{
    dispatch(addWithCreateAction(titleForCreateAction));
    setForCreateActionTitle("");
  }

  return (
    <>
      <div className="App">
        <input value={title} onChange={(e) => setTitle(e.target.value)} />
        <button onClick={onSave}> add todo </button>
      </div>
      <hr/>
      <div className="App">
        <input value={title} onChange={(e) => setTitle(e.target.value)} />
        <button onClick={onBindSave}> add todo use bind action creators</button>
      </div>
      <div className="App">
        <ul>
          {todos.map((todo) => (
            <li key={todo.id}>
              <span>{todo.title}</span>
              <button onClick={() => onToggle(todo.id)}>
                {todo.completed ? "Marked" : "UnMarked"}
              </button>
              <button onClick={() => onRemove(todo.id)}> X </button>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <button onClick={fetchUserWithApi}> fetch user</button>
        {user.loading && "loading"}
        {user.error && user.error.toString()}
        {user.data && <div>Name: {JSON.stringify(user.data)}</div>}
      </div>
      <hr/>
      <div>
        <button onClick={fetchUserWithApi}> fetch user</button>
        {user.loading && "loading"}
        {user.error && user.error.toString()}
        {user.data && <div>Name: {JSON.stringify(user.data)}</div>}
      </div>

      <hr/>
      <div>
        <button onClick={fetchUserWithBindActionCreatorsMemo}> fetch user</button>
        {user.loading && "loading"}
        {user.error && user.error.toString()}
        {user.data && <div>Name: {JSON.stringify(user.data)}</div>}
      </div>
      <hr/>
      <hr/>
      <br/>
       <div className="App">
        <input value={titleForCreateAction} onChange={(e) => setForCreateActionTitle(e.target.value)} />
        <button onClick={onCreateActionSave}> add todo </button>
      </div>
       <div className="App">
        <ul>
          {todos.map((todo) => (
            <li key={todo.id}>
              <span>{todo.title}</span>
              <button onClick={() => onToggle(todo.id)}>
                {todo.completed ? "Marked" : "UnMarked"}
              </button>
              <button onClick={() => onRemove(todo.id)}> X </button>
            </li>
          ))}
        </ul>
      </div>
      <hr/>
    </>
  );
}
