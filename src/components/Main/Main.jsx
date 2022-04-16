import { Layout } from 'antd';
import { EditorState } from 'draft-js';
import { useState, useRef, useEffect } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import { useReactToPrint } from 'react-to-print';

import Header from '../Header/Header';

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import styles from './Main.module.scss';

const { Content, Footer } = Layout;

const Main = () => {
  const [editorState, setEditorState] = useState(EditorState?.createEmpty());
  const [isToolbarHidden, setIsToolbarHidden] = useState(false);
  const [toolbarCache, setToolbarCache] = useState(null);
  const [isSavePdf, setIsSavePdf] = useState(false);
  const refEditor = useRef();

  const pageStyle = `
    @media print {
      @page { size: landscape; }
    }

    @page {
      size: 80mm 50mm;
    }
  `;

  const handlePrint = useReactToPrint({
    content: () => refEditor.current,
    // pageStyle: pageStyle
  });

  useEffect(() => refEditor.current?.focusEditor(), [refEditor]);

  const hideToolbar = () => setIsToolbarHidden(!isToolbarHidden);

  const savePdf = () => {
    setToolbarCache(isToolbarHidden);
    setIsToolbarHidden(true);
    setIsSavePdf(true);
  };

  useEffect(() => {
    isSavePdf && handlePrint();
    if (toolbarCache != null) {
      setIsToolbarHidden(toolbarCache);
      setToolbarCache(null);
    }
    setIsSavePdf(false);
  }, [isSavePdf, handlePrint, toolbarCache]);

  const handleEditorState = (state) => setEditorState(state);

  const headerProps = { savePdf, hideToolbar };

  return (
    <Layout className={styles.layout}>
      <Header {...headerProps} />
      <Content className={styles.content}>
        <section className={styles.page}>
          <Editor
            toolbarHidden={isToolbarHidden}
            wrapperClassName="demo-wrapper"
            toolbarClassName={styles.toolbar}
            editorClassName={styles.editor}
            ref={refEditor}
            editorState={editorState}
            onEditorStateChange={handleEditorState}
            toolbar={{
              inline: { inDropdown: true },
              list: { inDropdown: true },
              textAlign: { inDropdown: true },
              link: { inDropdown: true },
              history: { inDropdown: true },
            }}
          />
        </section>
      </Content>
      <Footer className={styles.footer}>©2022 Created by Andrey Kachur</Footer>
    </Layout>
  );
};

export default Main;
