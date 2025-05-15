import { Html5Qrcode } from "html5-qrcode";
import { useEffect } from "react";

const qrcodeRegionId = "html5qr-code-full-region";

const createConfig = (props) => {
    const config = {
        fps: props.fps || 10,
        qrbox: props.qrbox || 250,
        aspectRatio: props.aspectRatio,
        disableFlip: props.disableFlip || false,
    };
    return config;
};

const Html5QrcodePlugin = ({
    qrCodeSuccessCallback,
    qrCodeErrorCallback,
    onScannerReady,
    ...props
}) => {
    useEffect(() => {
        const config = createConfig(props);
        const html5QrCode = new Html5Qrcode(qrcodeRegionId);

        html5QrCode
            .start(
                { facingMode: "environment" },
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
                console.error("QR scanner failed to start", err);
            });

        return () => {
            html5QrCode
                .stop()
                .then(() => html5QrCode.clear())
                .catch((err) => console.error("Failed to stop and clear QR code scanner", err));
        };
    }, []);

    return <div id={qrcodeRegionId} />;
};

export default Html5QrcodePlugin;
