import { useEffect, useState, useRef } from "react";
import Html5QrcodePlugin from "./Html5QrcodePlugin";
import "./../../styles/scanner.css";
import { postTraking } from "../../services/envios.services";
import { ToastContainer, toast } from "react-toastify";
import { useOutletContext } from "react-router-dom";

export default function Escaner() {
    const [tipoTracking, setTipoTracking] = useState(null);
    const [usuario] = useOutletContext();
    const [isScanning, setIsScanning] = useState(false);

    const scannerRef = useRef(null);

    useEffect(() => {
        if (!usuario || !usuario.sucursal) {
            window.location.href = "/";
        }
    }, [usuario]);

    const onNewScanResult = async (decodedText, decodedResult) => {

        if (isScanning) return;

        setIsScanning(true);
        mostrarExito("Escaneando...");
        const id = usuario.id;

        try {
            const result = await postTraking(decodedText, id, tipoTracking);
        if (!result) {
            mostrarError("No se ha encontrado el paquete con ese código.");
        } else {
            mostrarExito("Paquete escaneado con éxito.");
        }

        } catch (error) {
            console.error("Error al escanear el código:", error);
            mostrarError("Error al escanear el código. Inténtalo de nuevo.");
        }
     
        setTimeout(() => {
            setIsScanning(false);
        }, 5000);
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

    const mostrarExito = (mensaje) => {
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
            <div className="botones-entregas">
                <button
                    className={tipoTracking === 2 ? "selected" : ""}
                    onClick={() => handleTipoTracking(2)}
                >
                    No recogido
                </button>
                <button
                    className={tipoTracking === 3 ? "selected" : ""}
                    onClick={() => handleTipoTracking(3)}
                >
                    Entregado
                </button>
            </div>
            <div className="boton-transito">
                <button
                    className={tipoTracking === 1 ? "selected" : ""}
                    onClick={() => handleTipoTracking(1)}
                >
                    Transito
                </button>
            </div>

            <div className="scanner">
                {tipoTracking ? (
                    <section className="scanner-camera">
                        <Html5QrcodePlugin fps={10} qrbox={250} aspectRatio={1.7777} disableFlip={true} qrCodeSuccessCallback={onNewScanResult} />
                    </section>
                ) : (
                    <p>Por favor selecciona un tipo de tracking para activar el escáner</p>
                )}
            </div>

            <ToastContainer />
        </div>
    );
}
