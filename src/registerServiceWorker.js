import { Workbox } from "workbox-window";

const register = () => {
  if ("serviceWorker" in navigator) {
    const wb = new Workbox("/service-worker.js");

    const checkForUpdate = () => {
      const isUpdate = window.confirm("New update available. Click OK to update");
      if (isUpdate) {
        wb.messageSkipWaiting();
      }
    };

    wb.addEventListener("waiting", checkForUpdate);
    wb.register();
  }
};

export default register;
