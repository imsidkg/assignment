import { generatePreviewData } from '../../utils/shareUtils';
import styles from './SharePreview.module.css';

export function SharePreview({ article }) {
  const previewData = generatePreviewData(article);

  return (
    <div className={styles.preview}>
      {previewData.image && (
        <img
          src={previewData.image}
          alt={previewData.title}
          className={styles.image}
        />
      )}
      <div className={styles.content}>
        <h4 className={styles.title}>{previewData.title}</h4>
        <p className={styles.description}>{previewData.description}</p>
        <span className={styles.url}>{previewData.url}</span>
      </div>
    </div>
  );
}
