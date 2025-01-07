import { SORT_OPTIONS } from '../../utils/sortUtils';
import styles from './SortControls.module.css';

export function SortControls({ sortBy, onSort }) {
  return (
    <div className={styles.container}>
      <label htmlFor="sort" className={styles.label}>Sort by:</label>
      <select
        id="sort"
        value={sortBy}
        onChange={(e) => onSort(e.target.value)}
        className={styles.select}
      >
        <option value={SORT_OPTIONS.DATE_NEW}>Newest First</option>
        <option value={SORT_OPTIONS.DATE_OLD}>Oldest First</option>
        <option value={SORT_OPTIONS.READ_TIME}>Reading Time</option>
        <option value={SORT_OPTIONS.POPULARITY}>Most Popular</option>
        <option value={SORT_OPTIONS.LAST_EDITED}>Last Edited</option>
      </select>
    </div>
  );
}
