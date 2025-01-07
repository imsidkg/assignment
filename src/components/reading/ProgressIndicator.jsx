import { useReadingProgress } from '../../hooks/useReadingProgress';
import styles from './ProgressIndicator.module.css';

export function ProgressIndicator() {
  const progress = useReadingProgress();

  return (
    <div className={styles.container}>
      <div 
        className={styles.progress}
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
