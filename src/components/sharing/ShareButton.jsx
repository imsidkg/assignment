import { useState } from 'react';
import { useShare } from '../../hooks/useShare';
import { ShareModal } from './ShareModal';
import styles from './ShareButton.module.css';

export function ShareButton({ article }) {
  const [showModal, setShowModal] = useState(false);
  const { shareArticle } = useShare();

  const handleShare = async () => {
    const nativeShareSuccessful = await shareArticle(article);
    if (!nativeShareSuccessful) {
      setShowModal(true);
    }
  };

  return (
    <>
      <button
        className={styles.button}
        onClick={handleShare}
        aria-label="Share article"
      >
        <svg
          viewBox="0 0 24 24"
          width="24"
          height="24"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
        >
          <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
          <polyline points="16 6 12 2 8 6" />
          <line x1="12" y1="2" x2="12" y2="15" />
        </svg>
        <span>Share</span>
      </button>

      {showModal && (
        <ShareModal
          article={article}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
}
