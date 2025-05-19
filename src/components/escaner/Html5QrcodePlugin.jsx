import { Html5Qrcode } from "html5-qrcode";
import { useEffect, useRef } from "react";

const qrcodeRegionId = "html5qr-code-full-region";

const createConfig = (props) => {
  let config = {};
  if (props.fps) config.fps = props.fps;
  if (props.qrbox) config.qrbox = props.qrbox;
  if (props.aspectRatio) config.aspectRatio = props.aspectRatio;
  if (props.disableFlip !== undefined) config.disableFlip = props.disableFlip;
  return config;
};

const Html5QrcodePlugin = (props) => {
  const html5QrcodeScannerRef = useRef(null);

  useEffect(() => {
    const config = createConfig(props);
    if (!props.qrCodeSuccessCallback) {
      throw new Error("qrCodeSuccessCallback is required callback.");
    }

    // Crear instancia con el div id
    const html5QrCode = new Html5Qrcode(qrcodeRegionId);

    html5QrcodeScannerRef.current = html5QrCode;

    // Empezar escaneo con cámara por defecto (puedes especificar cámara)
    html5QrCode
      .start(
        { facingMode: "environment" }, // cámara trasera
        config,
        props.qrCodeSuccessCallback,
        props.qrCodeErrorCallback
      )
      .catch((err) => {
        console.error("Error iniciando escáner:", err);
        if (props.qrCodeErrorCallback) props.qrCodeErrorCallback(err);
      });

    return () => {
      // Cleanup: parar escaneo y liberar cámara
      if (html5QrCode) {
        html5QrCode
          .stop()
          .then(() => html5QrCode.clear())
          .catch((err) =>
            console.warn("Error deteniendo escáner:", err)
          );
      }
    };
  }, [props]);

  return (
    <div
      id={qrcodeRegionId}
      style={{ width: "100%", minHeight: "300px" }}
    />
  );
};

export default Html5QrcodePlugin;
  