import React from 'react';

import Menubar from './components/Menubar';
import styles from './Feed.module.css';

const Feed = () => {
  return (
    <div className={styles.container}>
      <h1>Feed</h1>
      <p>Welcome to the feed page!</p>
      <Menubar
        house="active"
        compass="inactive"
        bell="inactive"
        user="inactive"
      />
    </div>
  );
};
export default Feed;
