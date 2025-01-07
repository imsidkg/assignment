import { useCopyToClipboard } from '../../hooks/useCopyToClipboard';
import { SHARE_PLATFORMS, generateShareUrl, generateShareText } from '../../utils/shareUtils';
import { SharePreview } from './SharePreview';
import styles from './ShareModal.module.css';

export function ShareModal({ article, onClose }) {
  const { copied, copyToClipboard } = useCopyToClipboard();
  const shareUrl = generateShareUrl(article.id);
  const shareText = generateShareText(article);

  const handlePlatformShare = (platform) => {
    window.open(
      platform.shareUrl(shareUrl, shareText),
      '_blank',
      'noopener,noreferrer'
    );
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div 
        className={styles.modal} 
        onClick={e => e.stopPropagation()}
      >
        <button className={styles.closeButton} onClick={onClose}>
          ×
        </button>

        <h3>Share Article</h3>
        
        <SharePreview article={article} />

        <div className={styles.platforms}>
          {SHARE_PLATFORMS.map(platform => (
            <button
              key={platform.name}
              className={styles.platformButton}
              onClick={() => handlePlatformShare(platform)}
            >
              <span className={`icon-${platform.icon}`} />
              {platform.name}
            </button>
          ))}
        </div>

        <div className={styles.copySection}>
          <input
            type="text"
            value={shareUrl}
            readOnly
            className={styles.urlInput}
          />
          <button
            className={styles.copyButton}
            onClick={() => copyToClipboard(shareUrl)}
          >
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>
      </div>
    </div>
  );
}
