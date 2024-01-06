import React from 'react';
import styles from "./styles.module.css";

interface IProps {
    img?: string;
    name: string;
    content?: string;
};

const User:React.FC<IProps> = ({img, name, content}) => {
  return (
	<div className={styles.card}>
		<div className={styles["card-img"]}> <img src={img} /> </div>
		<div className={styles["card-body"]}> 
      <h2 className={styles["card-title"]}> {name} </h2>
			<p className={styles["card-intro"]}> {content} </p>
		</div>
	</div>
  )
};
export default User;