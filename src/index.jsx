import ReactDOM from 'react-dom';

import './assets/styles/index.scss';
import App from './components/App/App';
import ToastContainer from './components/ToastContainer/ToastContainer';

ReactDOM.render(
  <>
    <App />
    <ToastContainer />
  </>,
  document.getElementById('root')
);
