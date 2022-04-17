import { ToastContainer as ToastContainerFromLib } from 'react-toastify';

import styles from './ToastContainer.module.scss';

const toastConfiguration = {
  position: 'top-right',
  autoClose: 4000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  newestOnTop: false,
  rtl: false,
  pauseOnFocusLoss: true,
  theme: 'colored',
  className: styles.toastConfig,
};

const ToastContainer = () => <ToastContainerFromLib {...toastConfiguration} />;

export default ToastContainer;
