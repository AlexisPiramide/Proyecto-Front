import { useEffect, useState, useRef, Suspense, lazy } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useOutletContext } from "react-router-dom";
import useGeolocation from "../../utils/useGeolocation";
import { postTraking } from "../../services/envios.services";
import "./../../styles/scanner.css";
import "react-toastify/dist/ReactToastify.css";

const Html5QrcodePlugin = lazy(() => import("./Html5QrcodePlugin"));

export default function Escaner() {
    const [tipoTracking, setTipoTracking] = useState(null);
    const [usuario] = useOutletContext();
    const [isScanning, setIsScanning] = useState(false);
    const { location, address, error } = useGeolocation();
    const scannerRef = useRef(null);

    useEffect(() => {
        if (!usuario?.usuario?.sucursal) {
            window.location.href = "/";
        }
    }, [usuario]);

    const mostrarError = (mensaje) => {
        if (!toast.isActive(mensaje)) {
            toast.error(mensaje, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                toastId: mensaje,
            });
        }
    };

    const mostrarExito = (mensaje) => {
        if (!toast.isActive(mensaje)) {
            toast.success(mensaje, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                toastId: mensaje,
            });
        }
    };

    const onNewScanResult = async (decodedText) => {
        if (isScanning) return;

        setIsScanning(true);
        mostrarExito("Escaneando...");
        const id = usuario.id;

        try {
            const result = await postTraking(decodedText, id, tipoTracking,address);
            if (!result) {
                mostrarError("No se ha encontrado el paquete con ese código.");
            } else {
                mostrarExito("Paquete escaneado con éxito.");
            }
        } catch (error) {
            console.error("Error al escanear el código:", error);
            mostrarError("Error al escanear el código. Inténtalo de nuevo.");
        }

        setTimeout(() => setIsScanning(false), 5000);
    };

    return (
        <div className="body-scanner">
            <div className="botones-entregas">
                <button className={tipoTracking === 2 ? "selected" : ""} onClick={() => setTipoTracking(2)}>No recogido</button>
                <button className={tipoTracking === 3 ? "selected" : ""} onClick={() => setTipoTracking(3)}>Entregado</button>
            </div>
            <div className="boton-transito">
                <button className={tipoTracking === 1 ? "selected" : ""} onClick={() => setTipoTracking(1)}>Transito</button>
            </div>

            <div className="scanner">
                {!tipoTracking && <p>Selecciona un tipo de tracking para activar el escáner.</p>}
                {!address && <p>Activa la geolocalización para escanear.</p>}

                {tipoTracking && address && (
                    <Suspense fallback={<p>Cargando escáner...</p>}>
                        <section className="scanner-camera">
                            <Html5QrcodePlugin
                                fps={10}
                                qrbox={250}
                                aspectRatio={1.7777}
                                disableFlip={true}
                                qrCodeSuccessCallback={onNewScanResult}
                            />
                        </section>
                    </Suspense>
                )}
            </div>

            <ToastContainer />
        </div>
    );
}
