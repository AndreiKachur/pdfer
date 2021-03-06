import { Layout, Menu, Switch } from 'antd';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { FaDownload, FaFilePdf } from 'react-icons/fa';
import { FiPenTool } from 'react-icons/fi';
import { VscSave } from 'react-icons/vsc';

import styles from './Header.module.scss';

const { Header: HeaderAntD } = Layout;

const Header = ({ savePdf, hideToolbar, saveProject }) => {
  const [isChecked, setIsChecked] = useState(true);
  const [isHeaderHidden, setIsHeaderHidden] = useState(true);
  const [theme, setTheme] = useState('dark');
  const makeChecked = () => setIsChecked(!isChecked);

  const handleTheme = () =>
    theme === 'dark' ? setTheme('light') : setTheme('dark');

  useEffect(() => setIsHeaderHidden(false), []);

  useEffect(() => {
    const { style } = document.body;

    style.setProperty('--bg', `var(--${theme}-bg)`);
    style.setProperty('--primary', `var(--${theme}-primary)`);
    style.setProperty('--secondary', `var(--${theme}-secondary)`);
    style.setProperty('--light', `var(--${theme}-light)`);
  }, [theme]);

  return (
    <HeaderAntD
      className={classNames({
        [styles.header]: true,
        [styles.headerOpen]: !isHeaderHidden,
        [styles.headerHidden]: isHeaderHidden,
      })}
    >
      <div className={styles.logo}>
        <FaFilePdf />
        <p className={styles.title}>Pdfer</p>
      </div>
      <section className={styles.rightMenu}>
        <Menu
          mode="horizontal"
          defaultSelectedKeys={['2']}
          className={styles.menu}
        >
          <Menu.Item
            key="toolbar"
            onClick={hideToolbar}
            className={styles.menuItem}
          >
            <FiPenTool />
            <p className={styles.title}>Toolbar</p>
          </Menu.Item>
          <Menu.Item
            key="save"
            onClick={saveProject}
            className={styles.menuItem}
          >
            <VscSave />
            <p className={styles.title}>Save</p>
          </Menu.Item>
          <Menu.Item
            key="download"
            onClick={savePdf}
            className={styles.menuItem}
          >
            <FaDownload />
            <p className={styles.title}>Load</p>
          </Menu.Item>
        </Menu>
        <Switch
          onChange={makeChecked}
          checked={isChecked}
          checkedChildren="Dark"
          unCheckedChildren="Light"
          className={classNames({
            [styles.switch]: true,
            [styles.switchChecked]: isChecked,
          })}
          onClick={handleTheme}
        />
      </section>
    </HeaderAntD>
  );
};

Header.propTypes = {
  hideToolbar: PropTypes.func.isRequired,
  savePdf: PropTypes.func.isRequired,
  saveProject: PropTypes.func.isRequired,
};

export default Header;
