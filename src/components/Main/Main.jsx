import { Layout } from 'antd';
import classNames from 'classnames';
import { EditorState, convertFromRaw, convertToRaw } from 'draft-js';
import PropTypes from 'prop-types';
import { useState, useRef, useEffect } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import { useReactToPrint } from 'react-to-print';
import { toast } from 'react-toastify';

import Header from '../Header/Header';

import { TOOLBAR_OPTIONS, PAGE_STYLE, MESSAGE } from './constants';

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import styles from './Main.module.scss';

const { Content, Footer } = Layout;

const Main = ({ isOpenSaved }) => {
  const [editorState, setEditorState] = useState(EditorState?.createEmpty());
  const [isToolbarHidden, setIsToolbarHidden] = useState(true);
  const [isNotDisplayed, setIsNotDisplayed] = useState(true);
  const [toolbarCache, setToolbarCache] = useState(null);
  const [isSavePdf, setIsSavePdf] = useState(false);
  const refEditor = useRef();

  const saveProject = () => {
    const jsonState = JSON.stringify(
      convertToRaw(editorState.getCurrentContent())
    );

    localStorage.setItem('editorState', jsonState);
    toast.success(MESSAGE.SAVED);
  };

  const handlePrint = useReactToPrint({
    content: () => refEditor.current,
    // pageStyle: PAGE_STYLE
  });

  useEffect(() => {
    setTimeout(() => {
      setIsNotDisplayed(false);
      setIsToolbarHidden(false);
    }, 500);

    if (isOpenSaved) {
      const { editorState } = localStorage;

      if (!editorState) {
        return toast.info(MESSAGE.EMPTY);
      }
      const savedState = convertFromRaw(JSON.parse(editorState));

      setEditorState(EditorState.createWithContent(savedState));
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => refEditor.current?.focusEditor(), [refEditor]);

  const hideToolbar = () => setIsToolbarHidden(!isToolbarHidden);

  const savePdf = () => {
    setToolbarCache(isToolbarHidden);
    setIsNotDisplayed(true);
    setIsSavePdf(true);
  };

  useEffect(() => {
    isSavePdf && handlePrint();
    if (toolbarCache != null) {
      setIsNotDisplayed(toolbarCache);
      setToolbarCache(null);
    }
    setIsSavePdf(false);
  }, [isSavePdf, handlePrint, toolbarCache]);

  const handleEditorState = (state) => setEditorState(state);

  const headerProps = { savePdf, hideToolbar, saveProject };

  const toolbarStyles = classNames({
    [styles.toolbar]: true,
    [styles.toolbarOpen]: !isToolbarHidden,
    [styles.toolbarHidden]: isToolbarHidden,
  });

  return (
    <Layout className={styles.layout}>
      <Header {...headerProps} />
      <Content className={styles.content}>
        <section className={styles.page}>
          <Editor
            toolbarHidden={isNotDisplayed}
            toolbarClassName={toolbarStyles}
            editorClassName={styles.editor}
            ref={refEditor}
            editorState={editorState}
            onEditorStateChange={handleEditorState}
            toolbar={TOOLBAR_OPTIONS}
          />
        </section>
      </Content>
      <Footer className={styles.footer}>©2022 Created by Andrey Kachur</Footer>
    </Layout>
  );
};

Main.propTypes = {
  isOpenSaved: PropTypes.bool.isRequired,
};

export default Main;
