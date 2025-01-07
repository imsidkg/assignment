export function generateShareUrl(articleId) {
  return `${window.location.origin}/article/${articleId}`;
}

export function generateShareText(article) {
  return `Check out "${article.title}" on ArticleHub`;
}

export function generatePreviewData(article) {
  return {
    title: article.title,
    description: article.excerpt,
    image: article.thumbnail,
    url: generateShareUrl(article.id)
  };
}

export const SHARE_PLATFORMS = [
  {
    name: 'Twitter',
    icon: 'twitter',
    shareUrl: (url, text) => 
      `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
  },
  {
    name: 'LinkedIn',
    icon: 'linkedin',
    shareUrl: (url, text) => 
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
  },
  {
    name: 'Facebook',
    icon: 'facebook',
    shareUrl: (url) => 
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
  },
];

export function getOptimizedImageUrl(url, { width, quality = 75 } = {}) {
  // If using a CDN like Cloudinary or Imgix, you would transform the URL here
  // For now, we'll just return the original URL
  try {
    const imageUrl = new URL(url);
    
    // Add query parameters for optimization
    if (width) {
      imageUrl.searchParams.set('w', width.toString());
    }
    imageUrl.searchParams.set('q', quality.toString());
    
    return imageUrl.toString();
  } catch (e) {
    return url;
  }
}

export function generateBlurHash(url) {
  // In a real application, you would generate a blur hash here
  // For now, return a simple placeholder
  return 'data:image/svg+xml,...';
}
