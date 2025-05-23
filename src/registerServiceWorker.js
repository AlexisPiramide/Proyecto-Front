import { Workbox } from "workbox-window";

const register = () => {
  if (navigator?.serviceWorker) {
    const wb = new Workbox(`/service-worker.js`);

    const checkForUpdate = () => {
      const isUpdate = window.confirm("New Update Available. Click OK to update");
      if (isUpdate) {
        wb.messageSkipWaiting();
      }
    };

    wb.addEventListener("waiting", checkForUpdate);
    wb.register();
  }
};

export default register;
