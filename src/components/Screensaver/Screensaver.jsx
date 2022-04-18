import { Button } from 'antd';
import Letterize from 'letterizejs';
import PropTypes from 'prop-types';
import { useRef, useEffect, useState } from 'react';
import ReactAnime from 'react-animejs';
import { FaFilePdf } from 'react-icons/fa';

import { LETTERISE_KEYFRAMES } from './constants';
import getKeyframes from './getKeyframes';

import styles from './Screensaver.module.scss';

const { Anime, stagger } = ReactAnime;

const Screensaver = ({ setIsScreensaver, setIsOpenSaved }) => {
  const animatedLetters = useRef();
  const [letterize, setLetterize] = useState(null);

  useEffect(() => {
    setLetterize(new Letterize({ targets: animatedLetters.current.children }));
  }, [animatedLetters]);

  const handleStart = (e, isOpen = false) => {
    isOpen && setIsOpenSaved(true);
    setIsScreensaver(false);
  };

  return (
    <section className={styles.container}>
      <div className={styles.logo}>
        <FaFilePdf />
        <p className={styles.title}>Pdfer</p>
      </div>
      <article className={styles.animated}>
        <Anime initial={getKeyframes('#box', '100%', '42%', '0%')}>
          <div id="box" className={styles.box1} />
        </Anime>
        <div className={styles.letterize}>
          {letterize && (
            <Anime
              initial={[
                {
                  targets: letterize?.listAll,
                  keyframes: LETTERISE_KEYFRAMES,
                  easing: 'spring',
                  duration: stagger(100, {
                    grid: [letterize?.list[0]?.length, letterize?.list?.length],
                    from: 'center',
                  }),
                  loop: true,
                },
              ]}
            />
          )}
          <div ref={animatedLetters}>
            <div>pdfer & the.easiest.way.to.create.pdf</div>
            <div>the.easiest.way.to.create.pdf & pdfer</div>
          </div>
        </div>
        <Anime initial={getKeyframes('#box2', '0%', '48%', '100%')}>
          <div id="box2" className={styles.box2} />
        </Anime>
      </article>
      <section className={styles.btnWrapper}>
        <Button
          type="primary"
          size="large"
          className={styles.btn}
          onClick={handleStart}
        >
          New Project
        </Button>
        <Button
          type="primary"
          size="large"
          className={styles.btn}
          onClick={(e) => handleStart(e, true)}
        >
          Open Project
        </Button>
      </section>
      <footer className={styles.footer}>©2022 Created by Andrey Kachur</footer>
    </section>
  );
};

Screensaver.propTypes = {
  setIsScreensaver: PropTypes.func.isRequired,
  setIsOpenSaved: PropTypes.func.isRequired,
};

export default Screensaver;
