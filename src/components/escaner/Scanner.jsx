import { useEffect, useState } from 'react';
import Html5QrcodePlugin from './Html5QrcodePlugin';
import './../../styles/scanner.css';
import { postTraking } from '../../services/envios.services';
import { ToastContainer, toast } from 'react-toastify';
import { useOutletContext } from 'react-router-dom';

export default function Escaner() {
    const [tipoTracking, setTipoTracking] = useState();
    const [esReparto, setEsReparto] = useState();
    const [usuario, setUsuario] = useOutletContext();
    const [scannerInstance, setScannerInstance] = useState(null);

    useEffect(() => {
        if (!usuario || !usuario.sucursal) {
            window.location.href = "/";
        }
    }, [usuario]);

    const onNewScanResult = async (decodedText, decodedResult) => {
        if (scannerInstance) {
            scannerInstance.pause();
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
                scannerInstance.resume();
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
            <div className="scanner">
                <button onClick={() => setEsReparto(true)}>Reparto</button>

                {esReparto ? (
                    <>
                        <button onClick={() => handleTipoTracking(2)}>No recogido</button>
                        <button onClick={() => handleTipoTracking(3)}>Entregado</button>
                    </>
                ) : null}

                <button onClick={() => { handleTipoTracking(1); setEsReparto(false); }}>Transito</button>

                {tipoTracking ? (
                    <section className="scanner-camera">
                        <Html5QrcodePlugin fps={10} qrbox={250} disableFlip={true} qrCodeSuccessCallback={onNewScanResult} onScannerReady={(scanner) => setScannerInstance(scanner)} />
                    </section>
                ) : null}
            </div>
            <ToastContainer />
        </div>
    );
}
