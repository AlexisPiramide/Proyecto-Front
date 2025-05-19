import { Html5Qrcode } from "html5-qrcode";
import { useEffect, useRef } from "react";

const qrcodeRegionId = "html5qr-code-full-region";

const Html5QrcodePlugin = ({
  qrCodeSuccessCallback,
  qrCodeErrorCallback,
  onScannerReady,
  fps = 10,
  qrbox = 250,
  aspectRatio = 1.7777, // 16:9 ratio (recomendado)
  disableFlip = true,
}) => {
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

    // Intenta obtener la cámara por defecto
    Html5Qrcode.getCameras()
      .then((devices) => {
        if (devices && devices.length) {
          const cameraId = devices[0].id;
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
              qrCodeErrorCallback(`Fallo al iniciar cámara: ${err}`);
            });
        } else {
          qrCodeErrorCallback("No se encontraron cámaras disponibles.");
        }
      })
      .catch((err) => {
        qrCodeErrorCallback(`Error al obtener cámaras: ${err}`);
      });

    return () => {
      html5QrCode.stop().catch((err) => console.error("Error al detener cámara:", err));
    };
  }, []);

  return <div id={qrcodeRegionId} />;
};

export default Html5QrcodePlugin;
