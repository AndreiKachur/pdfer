import { Layout, Menu, Switch } from 'antd';
import classNames from 'classnames';
import { useState } from 'react';
import { FaDownload, FaFilePdf } from 'react-icons/fa';
import { VscSave } from 'react-icons/vsc';

import styles from './Header.module.scss';

const { Header: HeaderAntD } = Layout;

const Header = () => {
    const [isChecked, setIsChecked] = useState(false);
    const makeChecked = () => setIsChecked(!isChecked);

    return (
        <HeaderAntD className={styles.header}>
            <div className={styles.logo}>
                <FaFilePdf />
                <p className={styles.title}>Pdfer</p>
            </div>
            <section className={styles.rightMenu}>
                <Switch
                    onChange={makeChecked}
                    checked={isChecked}
                    checkedChildren="Dark"
                    unCheckedChildren="Light"
                    className={classNames({
                        [styles.switch]: true,
                        [styles.switchChecked]: isChecked
                    })}
                />
                <Menu
                    mode="horizontal"
                    defaultSelectedKeys={['2']}
                    className={styles.menu}
                >
                    <Menu.Item key="save" onClick={() => console.log('save')} className={styles.menuItem}>
                        <VscSave />
                        <p className={styles.title}>Save</p>
                    </Menu.Item>
                    <Menu.Item key="download" onClick={() => console.log('download')} className={styles.menuItem}>
                        <FaDownload />
                        <p className={styles.title}>Load</p>
                    </Menu.Item>
                </Menu>
            </section>
        </HeaderAntD>
    )
}

export default Header;