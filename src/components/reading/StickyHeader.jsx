import { useScrollPosition } from '../../hooks/useScrollPosition';
import { FontSizeControl } from './FontSizeControl';
import styles from './StickyHeader.module.css';

export function StickyHeader({ title }) {
  const scrollPosition = useScrollPosition();
  const isVisible = scrollPosition > 200; // Show after scrolling 200px

  return (
    <header className={`${styles.header} ${isVisible ? styles.visible : ''}`}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.controls}>
        <FontSizeControl />
      </div>
    </header>
  );
}
