import React from 'react';
import styles from "./styles.module.css";
import { useThunk } from '../../hooks/use-thunk/useThunk';
import { removeUserFromJsonServerUsers, useFetchUserPostsQuery } from '../../store';

interface IProps {
    img?: string;
    name: string;
    content?: string;
    id: string;
};

const User:React.FC<IProps> = ({img, name, content, id}) => {
  const [doRemoveUserFromJsonServerUsers, isLoading, error] = useThunk(removeUserFromJsonServerUsers);
  const {data , isError , isLoading: isFetchUsersLoading} = useFetchUserPostsQuery({id});
  
  const handleRemoveUser = (id: string) => {
    doRemoveUserFromJsonServerUsers(id);
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
    <div> 
      <h1> POSTS </h1> 
      { isFetchUsersLoading ? <div>Posts Loading .... </div> : data?.map((post)=> (<h6>{post?.title}</h6>)) }
    </div>
	</div>
  )
};
export default User;