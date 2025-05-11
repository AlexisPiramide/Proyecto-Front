import { useEffect, useState } from 'react';
import Html5QrcodePlugin from './Html5QrcodePlugin';
import './../../styles/scanner.css';

export default function Escaner() {
    const [decodedResults, setDecodedResults] = useState('');

    const onNewScanResult = (decodedText, decodedResult) => {
       setDecodedResults(`${decodedText}-${decodedResult}`);
    };

    useEffect(() => {
        console.log(decodedResults);
    }, [decodedResults]);

    return (
        <div className="body-scanner">
            <div className="scanner">
                <section className="scanner-camera">
                    <Html5QrcodePlugin fps={10} qrbox={250} disableFlip={false} qrCodeSuccessCallback={onNewScanResult} />
                </section>
            </div>
        </div>
    );
}
