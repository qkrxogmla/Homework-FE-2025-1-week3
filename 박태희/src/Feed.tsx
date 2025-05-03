import Menubar from './components/Menubar';
import WeekDates from './components/WeekDates';
import styles from './Feed.module.css';

const Feed = () => {
  return (
    <div className={styles.container}>
      <h1>Feed</h1>
      <WeekDates />
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
