import styles from './ArticlePreview.module.css';

export function ArticlePreview({ article }) {
  const { title, excerpt, category, thumbnail, content, tags } = article;

  return (
    <div className={styles.preview}>
      {thumbnail && (
        <img 
          src={thumbnail} 
          alt={title} 
          className={styles.thumbnail}
        />
      )}
      
      <h1 className={styles.title}>{title}</h1>
      
      <div className={styles.meta}>
        {category && (
          <span className={styles.category}>{category}</span>
        )}
        {tags.length > 0 && (
          <div className={styles.tags}>
            {tags.map(tag => (
              <span key={tag} className={styles.tag}>
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      <p className={styles.excerpt}>{excerpt}</p>

      <div className={styles.content}>
        {/* Here you would implement a proper content renderer for your Slate content */}
        {/* This is a simplified version */}
        {content.map((node, i) => (
          <div key={i}>
            {node.children.map((child, j) => (
              <span key={j}>{child.text}</span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
