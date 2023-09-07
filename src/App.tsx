import { useState } from "react";
import {
  add,
  fetchUser,
  remove,
  toggleCompleted,
  useAppDispatch,
  useAppSelector
} from "./store/index";
import "./styles.css";

export default function App() {
  const [title, setTitle] = useState<string>("");
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

  return (
    <>
      <div className="App">
        <input value={title} onChange={(e) => setTitle(e.target.value)} />
        <button onClick={onSave}> add todo </button>
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
        <button onClick={() => dispatch(fetchUser())}> fetch user</button>
        {user.loading && "loading"}
        {user.error && user.error}
        {user.data && <div>Name: {JSON.stringify(user.data)}</div>}
      </div>
    </>
  );
}
