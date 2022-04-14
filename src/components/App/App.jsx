import { useState } from 'react';

import Main from '../Main/Main';
import Screensaver from '../Screensaver/Screensaver';

const App = () => {
  const [isScreensaver, setIsScreensaver] = useState(true);

  if (isScreensaver) {
    return <Screensaver setIsScreensaver={setIsScreensaver} />;
  }

  return <Main />;
};

export default App;
