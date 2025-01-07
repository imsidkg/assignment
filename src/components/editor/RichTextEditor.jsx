import { useCallback, useMemo } from 'react';
import { createEditor } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';
import { withHistory } from 'slate-history';
import { Toolbar } from './Toolbar';
import styles from './RichTextEditor.module.css';

const initialValue = [
  {
    type: 'paragraph',
    children: [{ text: '' }],
  },
];

export function RichTextEditor({ value = initialValue, onChange }) {
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);

  const renderElement = useCallback(({ attributes, children, element }) => {
    switch (element.type) {
      case 'heading-one':
        return <h1 {...attributes}>{children}</h1>;
      case 'heading-two':
        return <h2 {...attributes}>{children}</h2>;
      case 'block-quote':
        return <blockquote {...attributes}>{children}</blockquote>;
      case 'bulleted-list':
        return <ul {...attributes}>{children}</ul>;
      case 'numbered-list':
        return <ol {...attributes}>{children}</ol>;
      case 'list-item':
        return <li {...attributes}>{children}</li>;
      case 'image':
        return (
          <div {...attributes}>
            <img
              src={element.url}
              alt={element.alt || ''}
              className={styles.image}
            />
            {children}
          </div>
        );
      default:
        return <p {...attributes}>{children}</p>;
    }
  }, []);

  const renderLeaf = useCallback(({ attributes, children, leaf }) => {
    let styledChildren = children;

    if (leaf.bold) {
      styledChildren = <strong>{styledChildren}</strong>;
    }
    if (leaf.italic) {
      styledChildren = <em>{styledChildren}</em>;
    }
    if (leaf.underline) {
      styledChildren = <u>{styledChildren}</u>;
    }
    if (leaf.code) {
      styledChildren = <code>{styledChildren}</code>;
    }

    return <span {...attributes}>{styledChildren}</span>;
  }, []);

  return (
    <div className={styles.editor}>
      <Slate editor={editor} value={value} onChange={onChange}>
        <Toolbar />
        <Editable
          className={styles.editable}
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          placeholder="Write your article here..."
          spellCheck
          autoFocus
        />
      </Slate>
    </div>
  );
}
