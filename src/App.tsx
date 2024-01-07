import { useState, useMemo, useCallback } from "react";
import { bindActionCreators } from "@reduxjs/toolkit";
import {
  add,
  fetchUser,
  remove,
  toggleCompleted,
  useAppDispatch,
  useAppSelector,
  addWithCreateAction,
  fetchJsonServerUsers,
} from "./store/index";
import "./styles.css";
import { IJsonServerUsers, addUserInJsonServerUsers } from "./features/user-slice/userSlice";
import UserSkeleton from "./components/user/UserSkeleton";
import User from "./components/user/User";
import { useThunk } from "./hooks/use-thunk/useThunk";

interface IJsonServerState<T> {
  isLoadingJsonServerUsers?: boolean;
  errorJsonServerUsers?: string | Record<string, string>;
  isCreatingJsonServerUserLoading?: boolean;
  errorCreatingJsonServerUser?: string | Record<string, string>;
};




export default function App() {
  const [title, setTitle] = useState<string>("");
  const [name, setName] = useState<string>("");

  const [titleForCreateAction, setForCreateActionTitle] = useState<string>("");
  // Json Server Users
  const [jsonServerUsers, setJsonServerUsers] = useState<IJsonServerState<IJsonServerUsers>>({});

  // how to use useThunk hook
  const [doFetchJsonServerUsers, isLoadingJsonServerUsers, errorJsonServerUsers] = useThunk(fetchJsonServerUsers);
  const [doAddUserInJsonServerUsers, isCreatingJsonServerUserLoading, errorCreatingJsonServerUser] 
                                                              = useThunk(addUserInJsonServerUsers);

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
    dispatch(fetchUser());
  };
  // use BIND ACTION CREATORs
  const fetchUserWithBindActionCreators = () => {
    bindActionCreators({ fetchUser }, dispatch);
  };
  // we can use all action this roles
  const boundActionCreators = useMemo(
    () => bindActionCreators({ fetchUser, add }, dispatch),
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
  const onCreateActionSave = () => {
    dispatch(addWithCreateAction(titleForCreateAction));
    setForCreateActionTitle("");
  };

  // JSON SERVER REQUEST
  const fetchJsonServerUserList = () => {
    doFetchJsonServerUsers();
    // setJsonServerUsers(prev => ({
    //   ...prev,
    //   isLoadingJsonServerUsers: true,
    // }))

    // dispatch(fetchJsonServerUsers())
    //   .unwrap()
    //   .catch(err => {
    //     setJsonServerUsers(prev => ({
    //       ...prev,
    //       errorJsonServerUsers: err
    //     }))
    //   })
    //   .finally(() => {
    //     setJsonServerUsers(prev => ({
    //       ...prev,
    //       isLoadingJsonServerUsers: false,
    //     }))
    //   });
  };

  const onChange: React.ChangeEventHandler<HTMLInputElement> = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event?.target.value);
  };

  const addUserInJsonServerList = () => {
    doAddUserInJsonServerUsers(name);
    // setJsonServerUsers(prev => ({
    //   ...prev,
    //   isCreatingJsonServerUserLoading: true,
    // }));
    // dispatch(addUserInJsonServerUsers(name)).unwrap()
    //   .catch(err => {
    //     setJsonServerUsers(prev => ({
    //       ...prev,
    //       errorCreatingJsonServerUser: err,
    //     }));
    //   }).finally(() => {
    //     setJsonServerUsers(prev => ({
    //       ...prev,
    //       isCreatingJsonServerUserLoading: false,
    //     }));
    //   })
  };

  /*
   const onChange:  React.ComponentProps<"input">["onChange"]  = (event: React.ChangeEvent<HTMLInputElement>) => {}
   const onChange: React.ChangeEventHandler<HTMLInputElement>  = (event: React.ChangeEvent<HTMLInputElement>) => {}
   const onChange: React.ChangeEventHandler<HTMLInputElement>  = (event) => {}
   const onChange:  React.ComponentProps<"input">["onChange"]  = (event) => {}
   const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {}
  */

  console.log("jsonServerUsers: ", jsonServerUsers);


  return (
    <>
      <div className="App">
        <input value={title} onChange={(e) => setTitle(e.target.value)} />
        <button onClick={onSave}> add todo </button>
      </div>
      <hr />
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
      <hr />
      <div>
        <button onClick={fetchUserWithApi}> fetch user</button>
        {user.loading && "loading"}
        {user.error && user.error.toString()}
        {user.data && <div>Name: {JSON.stringify(user.data)}</div>}
      </div>

      <hr />
      <div>
        <button onClick={fetchUserWithBindActionCreatorsMemo}> fetch user</button>
        {user.loading && "loading"}
        {user.error && user.error.toString()}
        {user.data && <div>Name: {JSON.stringify(user.data)}</div>}
      </div>
      <hr />
      <hr />
      <br />
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
      <hr />
      <h1> Create User </h1>
      <input value={name} onChange={onChange} />
      {!isCreatingJsonServerUserLoading ? <button onClick={addUserInJsonServerList}> Add User </button> : <span> Add User Loading ... </span>}
      {jsonServerUsers?.errorCreatingJsonServerUser &&
        <>
          <h1 style={{ color: 'red' }}>{JSON.stringify(errorCreatingJsonServerUser)}</h1>
          <h1 style={{ color: 'red' }}>{JSON.stringify(user?.error)}</h1>
        </>
      }
      <h1> Yaradilan User {JSON.stringify(user.addJsonServerUser)} </h1>
      <hr />
      <button onClick={fetchJsonServerUserList}> get json server users </button>
      {
        isLoadingJsonServerUsers && <UserSkeleton />
      }
      {
        errorJsonServerUsers && <div style={{color: 'red'}}> {errorJsonServerUsers} </div>
      }
      {
        user?.jsonServerUsers?.length! > 0 &&
        <div style={{ display: "flex" }}>{
          user?.jsonServerUsers?.map((jsServerUser) => (
            <User key={jsServerUser.id} img={jsServerUser.src} name={jsServerUser.id} content={jsServerUser.name} />
          ))
        }
        </div>
      }
    </>
  );
}
