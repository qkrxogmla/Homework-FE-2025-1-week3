import { getFullWeekDates } from '../utils/getWeek';
import styles from './WeekDates.module.css';

const days = ['월', '화', '수', '목', '금', '토', '일'];

const WeekDates = () => {
  const dates = getFullWeekDates();

  return (
    <div className={styles.weekDatesContainer}>
      {dates.map((dateStr, idx) => {
        const date = new Date(dateStr);
        const labelTop = days[idx];
        const labelBottom = date.getDate();

        const classNames = [styles.dayBox];
        if (idx === 5) classNames.push(styles.saturday);
        if (idx === 6) classNames.push(styles.sunday);
        const isToday = date.toDateString() === new Date().toDateString();

        return (
          <div
            key={dateStr}
            className={[...classNames, styles.daywrap].join(' ')}
          >
            <div>{labelTop}</div>
            <div className={isToday ? styles.today : undefined}>
              {labelBottom}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default WeekDates;
