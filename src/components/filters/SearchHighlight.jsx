import styles from './SearchHighlight.module.css';
import { highlightText } from '../../utils/searchUtils';

export function SearchHighlight({ text, searchTerm }) {
  const parts = highlightText(text, searchTerm);

  return (
    <span>
      {parts.map(({ text, highlight, key }) => (
        highlight ? (
          <mark key={key} className={styles.highlight}>{text}</mark>
        ) : text
      ))}
    </span>
  );
}
