import { useReading } from '../../context/ReadingContext';
import styles from './FontSizeControl.module.css';

export function FontSizeControl() {
  const { state, dispatch } = useReading();
  const { fontSize } = state;

  const adjustFontSize = (increment) => {
    const newSize = Math.max(12, Math.min(24, fontSize + increment));
    dispatch({ type: 'SET_FONT_SIZE', payload: newSize });
  };

  return (
    <div className={styles.container}>
      <button
        className={styles.button}
        onClick={() => adjustFontSize(-1)}
        aria-label="Decrease font size"
      >
        A-
      </button>
      <span className={styles.size}>{fontSize}px</span>
      <button
        className={styles.button}
        onClick={() => adjustFontSize(1)}
        aria-label="Increase font size"
      >
        A+
      </button>
    </div>
  );
}
