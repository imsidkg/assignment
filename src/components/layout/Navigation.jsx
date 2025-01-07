import { Link, useLocation } from 'react-router-dom';
import styles from './Navigation.module.css';

export function Navigation() {
  const location = useLocation();

  return (
    <nav className={styles.nav}>
      <div className={styles.brand}>
        <Link to="/">ArticleHub</Link>
      </div>
      
      <div className={styles.links}>
        <Link 
          to="/" 
          className={location.pathname === '/' ? styles.active : ''}
        >
          Articles
        </Link>
        <Link 
          to="/new" 
          className={location.pathname === '/new' ? styles.active : ''}
        >
          Write Article
        </Link>
        <Link 
          to="/bookmarks" 
          className={location.pathname === '/bookmarks' ? styles.active : ''}
        >
          Bookmarks
        </Link>
      </div>
    </nav>
  );
}