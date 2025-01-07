export function highlightText(text, searchTerm) {
  if (!searchTerm) return text;

  const regex = new RegExp(`(${escapeRegExp(searchTerm)})`, 'gi');
  const parts = text.split(regex);

  return parts.map((part, i) => {
    if (part.toLowerCase() === searchTerm.toLowerCase()) {
      return { text: part, highlight: true, key: i };
    }
    return { text: part, highlight: false, key: i };
  });
}

function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export function searchArticles(articles, searchTerm, filters) {
  return articles.filter(article => {
    const matchesSearch = !searchTerm || 
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = !filters.category || 
      article.category === filters.category;

    const matchesTags = !filters.tags?.length || 
      filters.tags.every(tag => article.tags.includes(tag));

    return matchesSearch && matchesCategory && matchesTags;
  });
}
