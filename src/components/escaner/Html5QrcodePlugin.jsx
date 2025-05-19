import { useEffect, useRef } from "react";
import { Html5Qrcode } from "html5-qrcode";

const Html5QrcodePlugin = ({
  fps = 10,
  qrbox = 250,
  aspectRatio = 1.0,
  disableFlip = false,
  qrCodeSuccessCallback,
  qrCodeErrorCallback,
  onScannerReady,
}) => {
  const qrcodeRegionId = "html5qr-code-full-region";
  const html5QrCodeRef = useRef(null);

  useEffect(() => {
    const html5QrCode = new Html5Qrcode(qrcodeRegionId);
    html5QrCodeRef.current = html5QrCode;

    const config = {
      fps,
      qrbox,
      aspectRatio,
      disableFlip,
    };

    Html5Qrcode.getCameras()
      .then((devices) => {
        if (devices && devices.length) {
          const cameraId = devices[0].id;

          // Add a small delay to ensure the DOM is fully rendered
          setTimeout(() => {
            html5QrCode
              .start(
                cameraId,
                config,
                qrCodeSuccessCallback,
                qrCodeErrorCallback
              )
              .then(() => {
                if (onScannerReady) {
                  onScannerReady(html5QrCode);
                }
              })
              .catch((err) => {
                console.error("Error starting QR code scanner:", err);
                qrCodeErrorCallback(`Fallo al iniciar cámara: ${err}`);
              });
          }, 300); // delay in ms — helps ensure video element is ready
        } else {
          qrCodeErrorCallback("No se encontraron cámaras disponibles.");
        }
      })
      .catch((err) => {
        qrCodeErrorCallback(`Error al obtener cámaras: ${err}`);
      });

    return () => {
      // Stop the scanner when the component unmounts
      if (html5QrCodeRef.current) {
        html5QrCodeRef.current
          .stop()
          .then(() => {
            html5QrCodeRef.current.clear();
          })
          .catch((err) => console.error("Error al detener cámara:", err));
      }
    };
  }, []);

  return <div id={qrcodeRegionId} />;
};

export default Html5QrcodePlugin;
