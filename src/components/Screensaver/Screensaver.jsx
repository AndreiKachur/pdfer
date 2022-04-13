import { Button } from 'antd';
import Letterize from 'letterizejs';
import PropTypes from 'prop-types';
import { useRef, useEffect, useState } from 'react';
import ReactAnime from 'react-animejs';
import { FaFilePdf } from 'react-icons/fa';

import styles from './Screensaver.module.scss';

const { Anime, stagger } = ReactAnime;

const Screensaver = ({ setIsScreensaver }) => {
  const animatedDiv = useRef();
  const [letterize, setLetterize] = useState(null);

  useEffect(() => {
    setLetterize(new Letterize({ targets: animatedDiv.current.children }));
  }, [animatedDiv]);

  const handleStart = () => setIsScreensaver(false);

  return (
    <section className={styles.container}>
      <div className={styles.logo}>
        <FaFilePdf />
        <p className={styles.title}>Pdfer</p>
      </div>
      {letterize && (
        <Anime
          initial={[
            {
              targets: letterize?.listAll,
              keyframes: [
                {
                  scale: 0.5,
                },
                {
                  letterSpacing: 10,
                },
                {
                  scale: 1,
                },
                {
                  letterSpacing: 6,
                },
              ],
              easing: 'spring',
              duration: stagger(100, {
                grid: [letterize?.list[0]?.length, letterize?.list?.length],
                from: 'center',
              }),
              loop: true,
            },
          ]}
        ></Anime>
      )}
      <div ref={animatedDiv}>
        <div>pdfer & the.easiest.way.to.create.pdf</div>
        <div>the.easiest.way.to.create.pdf & pdfer</div>
      </div>
      <Anime
        initial={[
          {
            targets: '#box',
            keyframes: [
              {
                left: '45%',
                width: 100,
              },
              {
                left: '85%',
                width: 2,
              },
              {
                left: '45%',
                width: 100,
              },
              {
                left: '10%',
                width: 2,
              },
            ],
            duration: 6700,
            loop: true,
          },
        ]}
      >
        <div id="box" className={styles.box} />
      </Anime>
      <Anime
        initial={[
          {
            targets: '#box2',
            keyframes: [
              {
                right: '45%',
                width: 100,
              },
              {
                right: '85%',
                width: 2,
              },
              {
                right: '45%',
                width: 100,
              },
              {
                right: '10%',
                width: 2,
              },
            ],
            duration: 6700,
            loop: true,
          },
        ]}
      >
        <div id="box2" className={styles.box2} />
      </Anime>
      <Button
        type="primary"
        size="large"
        className={styles.btn}
        onClick={handleStart}
      >
        Start
      </Button>
      <footer className={styles.footer}>©2022 Created by Andrey Kachur</footer>
    </section>
  );
};

Screensaver.propTypes = {
  setIsScreensaver: PropTypes.func,
};

export default Screensaver;
