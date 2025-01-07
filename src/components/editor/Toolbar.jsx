import { useSlate } from 'slate-react';
import { Editor, Transforms, Element as SlateElement } from 'slate';
import {
  BiBold,
  BiItalic,
  BiUnderline,
  BiCode,
  BiHeading,
  BiListUl,
  BiListOl,
  BiQuoteRight,
  BiImage
} from 'react-icons/bi';
import styles from './Toolbar.module.css';

const LIST_TYPES = ['numbered-list', 'bulleted-list'];

export function Toolbar() {
  const editor = useSlate();

  const toggleBlock = (format) => {
    const isActive = isBlockActive(editor, format);
    const isList = LIST_TYPES.includes(format);

    Transforms.unwrapNodes(editor, {
      match: n => LIST_TYPES.includes(n.type),
      split: true,
    });

    Transforms.setNodes(editor, {
      type: isActive ? 'paragraph' : isList ? 'list-item' : format,
    });

    if (!isActive && isList) {
      const block = { type: format, children: [] };
      Transforms.wrapNodes(editor, block);
    }
  };

  const toggleMark = (format) => {
    const isActive = isMarkActive(editor, format);
    if (isActive) {
      Editor.removeMark(editor, format);
    } else {
      Editor.addMark(editor, format, true);
    }
  };

  return (
    <div className={styles.toolbar}>
      <ToolbarButton
        format="bold"
        icon={<BiBold />}
        onMouseDown={() => toggleMark('bold')}
      />
      <ToolbarButton
        format="italic"
        icon={<BiItalic />}
        onMouseDown={() => toggleMark('italic')}
      />
      <ToolbarButton
        format="underline"
        icon={<BiUnderline />}
        onMouseDown={() => toggleMark('underline')}
      />
      <ToolbarButton
        format="code"
        icon={<BiCode />}
        onMouseDown={() => toggleMark('code')}
      />
      <div className={styles.divider} />
      <ToolbarButton
        format="heading-one"
        icon={<BiHeading />}
        onMouseDown={() => toggleBlock('heading-one')}
      />
      <ToolbarButton
        format="bulleted-list"
        icon={<BiListUl />}
        onMouseDown={() => toggleBlock('bulleted-list')}
      />
      <ToolbarButton
        format="numbered-list"
        icon={<BiListOl />}
        onMouseDown={() => toggleBlock('numbered-list')}
      />
      <ToolbarButton
        format="block-quote"
        icon={<BiQuoteRight />}
        onMouseDown={() => toggleBlock('block-quote')}
      />
    </div>
  );
}

const ToolbarButton = ({ format, icon, onMouseDown }) => {
  const editor = useSlate();
  const isActive = isMarkActive(editor, format) || isBlockActive(editor, format);

  return (
    <button
      className={`${styles.button} ${isActive ? styles.active : ''}`}
      onMouseDown={(event) => {
        event.preventDefault();
        onMouseDown();
      }}
    >
      {icon}
    </button>
  );
};

const isBlockActive = (editor, format) => {
  const [match] = Editor.nodes(editor, {
    match: n => n.type === format,
  });
  return !!match;
};

const isMarkActive = (editor, format) => {
  const marks = Editor.marks(editor);
  return marks ? marks[format] === true : false;
};
