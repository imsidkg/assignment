import { useState, useCallback } from 'react';
import { useArticleActions } from '../../context/ArticleContext';
import { RichTextEditor } from '../editor/RichTextEditor';
import styles from './ArticleForm.module.css';

const CATEGORIES = ['Technology', 'Business', 'Health', 'Science', 'Arts'];

const initialEditorValue = [
  {
    type: 'paragraph',
    children: [{ text: '' }],
  },
];

export function ArticleForm({ editArticle = null }) {
  const { addArticle, updateArticle } = useArticleActions();
  const [isPreview, setIsPreview] = useState(false);
  
  const [formData, setFormData] = useState({
    title: editArticle?.title || '',
    excerpt: editArticle?.excerpt || '',
    category: editArticle?.category || '',
    thumbnail: editArticle?.thumbnail || '',
    tags: editArticle?.tags || [],
    content: editArticle?.content || initialEditorValue
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEditorChange = useCallback((value) => {
    setFormData(prev => ({
      ...prev,
      content: value
    }));
  }, []);

  const handleTagInput = (e) => {
    if (e.key === 'Enter' && e.target.value) {
      e.preventDefault();
      const newTag = e.target.value.trim();
      if (!formData.tags.includes(newTag)) {
        setFormData(prev => ({
          ...prev,
          tags: [...prev.tags, newTag]
        }));
      }
      e.target.value = '';
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editArticle) {
      updateArticle(formData);
    } else {
      addArticle(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="title"
        value={formData.title}
        onChange={handleInputChange}
        placeholder="Title"
      />
      <input
        type="text"
        name="excerpt"
        value={formData.excerpt}
        onChange={handleInputChange}
        placeholder="Excerpt"
      />
      <select
        name="category"
        value={formData.category}
        onChange={handleInputChange}
      >
        <option value="">Select Category</option>
        {CATEGORIES.map(category => (
          <option key={category} value={category}>{category}</option>
        ))}
      </select>
      <input
        type="text"
        name="thumbnail"
        value={formData.thumbnail}
        onChange={handleInputChange}
        placeholder="Thumbnail URL"
      />
      <input
        type="text"
        name="tags"
        value={formData.tags.join(', ')}
        onChange={handleInputChange}
        onKeyDown={handleTagInput}
        placeholder="Tags (comma-separated)"
      />
      <RichTextEditor
        value={formData.content}
        onChange={handleEditorChange}
      />
      <button type="submit">{editArticle ? 'Update' : 'Add'} Article</button>
    </form>
  );
}
