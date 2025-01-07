import React, { useState } from 'react';
import { Editor } from 'draft-js';

export const ArticleCreate = () => {
  const [editorState, setEditorState] = useState('');

  const handleEditorChange = (state) => {
    setEditorState(state);
  };

  return (
    <div className="article-create">
      <input type="text" placeholder="Title" />
      <input type="text" placeholder="Excerpt" />
      <select>
        <option value="Technology">Technology</option>
        <option value="Business">Business</option>
        {/* More categories */}
      </select>
      <Editor editorState={editorState} onChange={handleEditorChange} />
      <button>Preview</button>
      <button>Save</button>
    </div>
  );
};
