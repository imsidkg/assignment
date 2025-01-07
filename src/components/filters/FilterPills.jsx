import styles from './FilterPills.module.css';

export function FilterPills({ filters, onRemoveFilter }) {
  if (!Object.values(filters).some(Boolean)) return null;

  return (
    <div className={styles.container}>
      {filters.category && (
        <span className={styles.pill}>
          Category: {filters.category}
          <button
            onClick={() => onRemoveFilter('category')}
            className={styles.remove}
          >
            ×
          </button>
        </span>
      )}
      
      {filters.tags?.map(tag => (
        <span key={tag} className={styles.pill}>
          Tag: {tag}
          <button
            onClick={() => onRemoveFilter('tags', tag)}
            className={styles.remove}
          >
            ×
          </button>
        </span>
      ))}

      {filters.searchTerm && (
        <span className={styles.pill}>
          Search: {filters.searchTerm}
          <button
            onClick={() => onRemoveFilter('searchTerm')}
            className={styles.remove}
          >
            ×
          </button>
        </span>
      )}
    </div>
  );
}
