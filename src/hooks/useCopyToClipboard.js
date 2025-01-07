import { useState } from 'react';
import { useNotification } from '../context/NotificationContext';

export function useCopyToClipboard() {
  const [copied, setCopied] = useState(false);
  const { showNotification } = useNotification();

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      showNotification('Copied to clipboard!', 'success');
      
      // Reset copied state after 2 seconds
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      showNotification('Failed to copy to clipboard', 'error');
    }
  };

  return { copied, copyToClipboard };
}
