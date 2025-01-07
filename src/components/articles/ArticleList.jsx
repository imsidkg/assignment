import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useArticles } from '../../context/ArticleContext';
import styles from './ArticleList.module.css';
import { LazyImage } from '../common/LazyImage';
import { getOptimizedImageUrl } from '../../utils/imageOptimizer';
import { SearchHighlight } from '../filters/SearchHighlight';
import { FilterPills } from '../filters/FilterPills';
import { SortControls } from '../filters/SortControls';
import { searchArticles } from '../../utils/searchUtils';
import { sortArticles, SORT_OPTIONS } from '../../utils/sortUtils';

export function ArticleList() {
  const [filters, setFilters] = useState({
    searchTerm: '',
    category: '',
    tags: []
  });
  const [sortBy, setSortBy] = useState(SORT_OPTIONS.DATE_NEW);
  const { state } = useArticles();

  // Memoize filtered and sorted articles
  const displayedArticles = useMemo(() => {
    const filteredArticles = searchArticles(state.articles, filters);
    return sortArticles(filteredArticles, sortBy);
  }, [state.articles, filters, sortBy]);

  const handleRemoveFilter = (filterType, value) => {
    setFilters(prev => {
      if (filterType === 'tags') {
        return {
          ...prev,
          tags: prev.tags.filter(tag => tag !== value)
        };
      }
      return {
        ...prev,
        [filterType]: ''
      };
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.controls}>
        <input
          type="text"
          placeholder="Search articles..."
          value={filters.searchTerm}
          onChange={(e) => setFilters(prev => ({
            ...prev,
            searchTerm: e.target.value
          }))}
          className={styles.searchInput}
        />
        
        <SortControls
          sortBy={sortBy}
          onSort={setSortBy}
        />
      </div>

      <FilterPills
        filters={filters}
        onRemoveFilter={handleRemoveFilter}
      />

      <div className={styles.grid}>
        {displayedArticles.map(article => (
          <ArticleCard
            key={article.id}
            article={article}
            searchTerm={filters.searchTerm}
          />
        ))}
      </div>
    </div>
  );
}

function ArticleCard({ article, searchTerm }) {
  return (
    <Link to={`/article/${article.id}`} className={styles.card}>
      <LazyImage
        src={article.thumbnail}
        alt={article.title}
        className={styles.thumbnail}
      />
      <div className={styles.content}>
        <h2 className={styles.title}>
          <SearchHighlight
            text={article.title}
            searchTerm={searchTerm}
          />
        </h2>
        <p className={styles.excerpt}>
          <SearchHighlight
            text={article.excerpt}
            searchTerm={searchTerm}
          />
        </p>
        <div className={styles.meta}>
          <span className={styles.category}>{article.category}</span>
          <span className={styles.readTime}>
            {calculateReadTime(article.content)} min read
          </span>
          <span className={styles.date}>
            {new Date(article.lastEdited).toLocaleDateString()}
          </span>
        </div>
      </div>
    </Link>
  );
}