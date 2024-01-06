import React from 'react';
import styles from "./styles.module.css";

const UserSkeleton = () => {
  return (
    <div className={styles.card}> <div className="card-img skeleton"> </div>
		<div className={styles['card-body']}>
			<h2 className={`${styles['card-title']} ${styles.skeleton}`}></h2>
			<p className={`${styles['card-intro']} ${styles.skeleton}`}></p>
		</div>
	</div>
  )
}
export default UserSkeleton