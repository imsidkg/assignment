import { useNotification } from '../../context/NotificationContext';
import styles from './Notification.module.css';

export function Notification() {
  const { state } = useNotification();

  return (
    <div className={styles.container}>
      {state.notifications.map(notification => (
        <div 
          key={notification.id}
          className={`${styles.notification} ${styles[notification.type]}`}
        >
          {notification.message}
        </div>
      ))}
    </div>
  );
}
