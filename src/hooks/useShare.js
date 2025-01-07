import { useCallback } from 'react';
import { useNotification } from '../context/NotificationContext';
import { generateShareUrl, generateShareText } from '../utils/shareUtils';

export function useShare() {
  const { showNotification } = useNotification();

  const shareArticle = useCallback(async (article) => {
    const shareData = {
      title: article.title,
      text: generateShareText(article),
      url: generateShareUrl(article.id),
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
        showNotification('Shared successfully!', 'success');
      } else {
        throw new Error('Native sharing not supported');
      }
    } catch (err) {
      // Fallback to showing share modal
      return false;
    }
    return true;
  }, [showNotification]);

  return { shareArticle };
}
