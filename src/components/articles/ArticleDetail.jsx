import { useParams, Link } from 'react-router-dom';
import { useArticles } from '../../context/ArticleContext';
import styles from './ArticleDetail.module.css';
import { StickyHeader } from '../reading/StickyHeader';
import { ProgressIndicator } from '../reading/ProgressIndicator';
import { useReading } from '../../context/ReadingContext';
import { ShareButton } from '../sharing/ShareButton';

export function ArticleDetail() {
  const { id } = useParams();
  const { state } = useArticles();
  const { state: readingState } = useReading();
  
  const article = state.articles.find(a => a.id === id);

  if (!article) {
    return <div>Article not found</div>;
  }

  return (
    <>
     <ProgressIndicator />
      <StickyHeader title={article.title} />
      <div 
        className={styles.container}
        style={{ fontSize: `${readingState.fontSize}px` }}
      >

     
    <div className={styles.container}>
      {article.thumbnail && (
        <img 
          src={article.thumbnail} 
          alt={article.title} 
          className={styles.thumbnail}
        />
      )}

      <h1 className={styles.title}>{article.title}</h1>

      <div className={styles.meta}>
        <span className={styles.category}>{article.category}</span>
        <span className={styles.date}>
          Last edited: {new Date(article.lastEdited).toLocaleDateString()}
        </span>
      </div>

      <p className={styles.excerpt}>{article.excerpt}</p>

      <div className={styles.content}>
        {article.content.map((node, i) => (
          <div key={i}>
            {node.children.map((child, j) => (
              <span key={j}>{child.text}</span>
            ))}
          </div>
        ))}
      </div>

      <div className={styles.actions}>
        <ShareButton article={article} />
        <Link 
          to={`/edit/${article.id}`} 
          className={styles.editButton}
        >
          Edit Article
        </Link>
      </div>
    </div>
    </div>
    </>
  );
}