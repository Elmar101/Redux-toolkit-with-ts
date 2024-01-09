import React, { useState } from 'react';
import styles from "./styles.module.css";
import { useThunk } from '../../hooks/use-thunk/useThunk';
import { removeUserFromJsonServerUsers, useCreateUserPostMutation, useFetchUserPostsQuery } from '../../store';

interface IProps {
    img?: string;
    name: string;
    content?: string;
    id: string;
};

const User:React.FC<IProps> = ({img, name, content, id}) => {
  const [state, setState] = useState({title: '', author: ''});
  const [doRemoveUserFromJsonServerUsers, isLoading, error] = useThunk(removeUserFromJsonServerUsers);
  const {data , isError , isLoading: isFetchUsersLoading} = useFetchUserPostsQuery({id});
 /*
   dont sent two times request
   const {data: x , isError: xe , isLoading: isFetchUsersLoadingd} = useFetchUserPostsQuery({id});
 */
  const [creteUserPost, {data: creatingUserPostData, isLoading: isCreatingUserPostLoading} ] = useCreateUserPostMutation();
  
  const handleRemoveUser = (id: string) => {
    doRemoveUserFromJsonServerUsers(id);
  };
  
  const handleChange: React.ComponentProps<'input'>['onChange'] = (e) => {
    setState({...state, [e.target.name]: e.target.value})
  };

  const createPosts = () => {
    creteUserPost({
      userId: id,
      author: state.author,
      title: state.title,
    });
    setState({...state, title: '', author: ''})
  };

  return (
	<div className={styles.card}>
		<div className={styles["card-img"]}> <img src={img} /> </div>
		<div className={styles["card-body"]}> 
      <h2 className={styles["card-title"]}> {name} </h2>
			<p className={styles["card-intro"]}> {content} </p>
      { isLoading ? 'Removing... ' : <button onClick={() => handleRemoveUser(id) }> Remove  user </button>}
      {error && <p>{JSON.stringify(error)}</p>}
		</div>
    <div style={{border: '3px solid blue'}}>
      <h6> Create User Post </h6>
      <p> Title : <input name='title' value={state.title} onChange={handleChange} /> </p> 
      <p> Author : <input name='author' value={state.author} onChange={handleChange} /> </p> 
      <button onClick={createPosts}> Create Posts </button>
    </div>
    <div> 
      <h1> POSTS </h1> 
      { isFetchUsersLoading ? <div>Posts Loading .... </div> : data?.map((post)=> (<h6>{post?.title}</h6>)) }
    </div>
	</div>
  )
};
export default User;