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
    const isStartedRef = useRef(false);

    useEffect(() => {
        const config = createConfig(props);

        if (!props.qrCodeSuccessCallback) {
            throw new Error("qrCodeSuccessCallback is required callback.");
        }

        const html5QrCode = new Html5Qrcode(qrcodeRegionId);
        html5QrcodeScannerRef.current = html5QrCode;

        html5QrCode
            .start(
                { facingMode: "environment" },
                config,
                props.qrCodeSuccessCallback,
                props.qrCodeErrorCallback
            )
            .then(() => {
                isStartedRef.current = true;
            })
            .catch((err) => {
                console.error("Error iniciando escáner:", err);
                alert("No se pudo acceder a la cámara. Verifica los permisos o conecta una cámara.");

                if (props.qrCodeErrorCallback) {
                    props.qrCodeErrorCallback(err);
                }
            });

        return () => {
            if (html5QrCode && isStartedRef.current) {
                html5QrCode
                    .stop()
                    .then(() => html5QrCode.clear())
                    .catch((err) => console.warn("Error deteniendo escáner:", err));
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
