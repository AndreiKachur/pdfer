import { useState } from 'react';

import Main from '../Main/Main';
import Screensaver from '../Screensaver/Screensaver';

const App = () => {
  const [isScreensaver, setIsScreensaver] = useState(true);
  const [isOpenSaved, setIsOpenSaved] = useState(false);

  if (isScreensaver) {
    return (
      <Screensaver
        setIsScreensaver={setIsScreensaver}
        setIsOpenSaved={setIsOpenSaved}
      />
    );
  }

  return <Main isOpenSaved={isOpenSaved} />;
};

export default App;
