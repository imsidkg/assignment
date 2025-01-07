export const SORT_OPTIONS = {
  DATE_NEW: 'date_new',
  DATE_OLD: 'date_old',
  READ_TIME: 'read_time',
  POPULARITY: 'popularity',
  LAST_EDITED: 'last_edited'
};

export function sortArticles(articles, sortBy) {
  const sortedArticles = [...articles];

  switch (sortBy) {
    case SORT_OPTIONS.DATE_NEW:
      return sortedArticles.sort((a, b) => 
        new Date(b.createdAt) - new Date(a.createdAt)
      );

    case SORT_OPTIONS.DATE_OLD:
      return sortedArticles.sort((a, b) => 
        new Date(a.createdAt) - new Date(b.createdAt)
      );

    case SORT_OPTIONS.READ_TIME:
      return sortedArticles.sort((a, b) => 
        calculateReadTime(b.content) - calculateReadTime(a.content)
      );

    case SORT_OPTIONS.POPULARITY:
      return sortedArticles.sort((a, b) => 
        (b.viewCount || 0) - (a.viewCount || 0)
      );

    case SORT_OPTIONS.LAST_EDITED:
      return sortedArticles.sort((a, b) => 
        new Date(b.lastEdited) - new Date(a.lastEdited)
      );

    default:
      return sortedArticles;
  }
}

export function calculateReadTime(content) {
  const WORDS_PER_MINUTE = 200;
  const wordCount = content.reduce((count, node) => {
    return count + node.children.reduce((nodeCount, child) => 
      nodeCount + (child.text?.split(/\s+/).length || 0), 0
    );
  }, 0);

  return Math.ceil(wordCount / WORDS_PER_MINUTE);
}
