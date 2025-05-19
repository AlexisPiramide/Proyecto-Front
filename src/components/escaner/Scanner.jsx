import { useEffect, useState } from 'react';
import Html5QrcodePlugin from './Html5QrcodePlugin';
import './../../styles/scanner.css';
import { postTraking } from '../../services/envios.services';
import { ToastContainer, toast } from 'react-toastify';
import { useOutletContext } from 'react-router-dom';

export default function Escaner() {
  const [tipoTracking, setTipoTracking] = useState();
  const [usuario, setUsuario] = useOutletContext();
  const [scannerInstance, setScannerInstance] = useState(null);

  useEffect(() => {
    if (!usuario || !usuario.sucursal) {
      window.location.href = "/";
    }
  }, [usuario]);

  const onNewScanResult = async (decodedText, decodedResult) => {
    if (scannerInstance) {
      await scannerInstance.pause();
    }

    const id = usuario.id;
    const result = await postTraking(decodedText, id, tipoTracking);

    if (!result) {
      mostrarError("No se ha encontrado el paquete con ese código.");
    } else {
      mostarExito("Paquete escaneado con éxito.");
    }

    setTimeout(() => {
      if (scannerInstance) {
        scannerInstance.resume().catch(err => console.error("Error al reanudar escáner:", err));
      }
    }, 1000);
  };

  const mostrarError = (mensaje) => {
    toast.error(mensaje, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      toastId: mensaje,
    });
  };

  const mostarExito = (mensaje) => {
    toast.success(mensaje, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      toastId: mensaje,
    });
  };

  const handleTipoTracking = (tipo) => {
    setTipoTracking(tipo);
  };

  return (
    <div className="body-scanner">
      <div className='botones-entregas'>
        <button className={tipoTracking === 2 ? 'selected' : ''} onClick={() => handleTipoTracking(2)}>No recogido</button>
        <button className={tipoTracking === 3 ? 'selected' : ''} onClick={() => handleTipoTracking(3)}>Entregado</button>
      </div>
      <div className='boton-transito'>
        <button className={tipoTracking === 1 ? 'selected' : ''} onClick={() => handleTipoTracking(1)}>Transito</button>
      </div>

      <div className="scanner">
        {tipoTracking ? (
          <section className="scanner-camera">
            <Html5QrcodePlugin
              fps={10}
              qrbox={250}
              aspectRatio={1.7777}
              disableFlip={true}
              qrCodeSuccessCallback={onNewScanResult}
              onScannerReady={(scanner) => {
                setScannerInstance(scanner);
              }}
              qrCodeErrorCallback={(errorMessage) => {
                console.error("11 Error del escáner (detalles):", errorMessage);
                mostrarError(`Error del escáner: ${errorMessage}`);
              }}
            />
          </section>
        ) : null}
      </div>

      <ToastContainer />
    </div>
  );
}
