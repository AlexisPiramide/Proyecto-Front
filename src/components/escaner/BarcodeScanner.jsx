import React, { useState, useEffect } from 'react';

const BarcodeScanner = () => {
  const [barcode, setBarcode] = useState(null);
  const [isSupported, setIsSupported] = useState(false);

  useEffect(() => {
    if ('BarcodeDetector' in window) {
      setIsSupported(true);
    }
  }, []);

  const handleScan = async (event) => {
    const video = event.target;
    const barcodeDetector = new BarcodeDetector({ formats: ['ean_13', 'upc_e'] });
    try {
      const barcodes = await barcodeDetector.detect(video);
      if (barcodes.length > 0) {
        setBarcode(barcodes[0].rawValue);
      }
    } catch (error) {
      console.error('Barcode detection failed', error);
    }
  };

  return (
    <div>
      {!isSupported ? (
        <p>Your browser does not support barcode scanning.</p>
      ) : (
        <>
          <video
            onPlay={handleScan}
            width="100%"
            height="auto"
            controls
            autoPlay
            muted
            style={{ maxWidth: '500px' }}
          />
          {barcode && <p>Scanned Barcode: {barcode}</p>}
        </>
      )}
    </div>
  );
};

export default BarcodeScanner;
