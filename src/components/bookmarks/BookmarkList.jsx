import { useBookmarks } from '../../context/BookmarkContext';
import { useArticles } from '../../context/ArticleContext';
import { Link } from 'react-router-dom';
import styles from './BookmarkList.module.css';

export function BookmarkList() {
  const { state: bookmarkState } = useBookmarks();
  const { state: articleState } = useArticles();

  const bookmarkedArticles = articleState.articles.filter(article =>
    bookmarkState.bookmarks.includes(article.id)
  );

  if (bookmarkedArticles.length === 0) {
    return (
      <div className={styles.empty}>
        <p>No bookmarked articles yet</p>
        <Link to="/" className={styles.link}>Browse articles</Link>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h2>Your Bookmarks</h2>
      <div className={styles.grid}>
        {bookmarkedArticles.map(article => (
          <Link 
            key={article.id} 
            to={`/article/${article.id}`}
            className={styles.card}
          >
            {article.thumbnail && (
              <img 
                src={article.thumbnail} 
                alt={article.title} 
                className={styles.thumbnail}
              />
            )}
            <div className={styles.content}>
              <h3>{article.title}</h3>
              <p>{article.excerpt}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
