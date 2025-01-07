import { useBookmarks } from '../../context/BookmarkContext';
import styles from './BookmarkButton.module.css';

export function BookmarkButton({ articleId }) {
  const { state, toggleBookmark } = useBookmarks();
  const isBookmarked = state.bookmarks.includes(articleId);

  return (
    <button
      className={`${styles.button} ${isBookmarked ? styles.active : ''}`}
      onClick={() => toggleBookmark(articleId)}
      aria-label={isBookmarked ? 'Remove bookmark' : 'Add bookmark'}
    >
      <svg
        viewBox="0 0 24 24"
        width="24"
        height="24"
        stroke="currentColor"
        strokeWidth="2"
        fill={isBookmarked ? 'currentColor' : 'none'}
      >
        <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
      </svg>
    </button>
  );
}
