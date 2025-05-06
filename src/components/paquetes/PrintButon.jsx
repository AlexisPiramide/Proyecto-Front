import React from "react";
import ReactDOM from "react-dom/client";
import Impresion from "./Impresion"; // Adjust import
import "./../../styles/impresion.css"; // Make sure this works in iframe too

const paqueteEjemplo = {
    remitente: { nombre: "Juan Pérez" },
    destinatario: {
      nombre: "Maria Lopez",
      texto: "Entrega urgente",
      direccion: "Av. Siempre Viva 123",
      codigopostal: "12345",
    },
    dimensiones: "30x20x15",
    peso: "2kg",
    codigo: "https://www.cognex.com/BarcodeGenerator/Content/images/isbn.png", // Replace with actual image
  };
  
  const PrintButton = () => {
    const handlePrint = () => {
      const iframe = document.createElement("iframe");
      iframe.style.position = "fixed";
      iframe.style.width = "0";
      iframe.style.height = "0";
      iframe.style.border = "none";
      iframe.style.visibility = "hidden";
  
      document.body.appendChild(iframe);
  
      const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
  
      const html = iframeDoc.documentElement;
      html.innerHTML = `
        <head></head>
        <body><div id="print-root"></div></body>
      `;
  
      // Copy all stylesheets from main doc to iframe
      const head = iframeDoc.head;
      document.querySelectorAll("style, link[rel='stylesheet']").forEach((style) => {
        head.appendChild(style.cloneNode(true));
      });
  
      const mountNode = iframeDoc.getElementById("print-root");
  
      // Render React component into iframe
      const root = ReactDOM.createRoot(mountNode);
      root.render(<Impresion paquete={paqueteEjemplo} />);
  
      // Wait a bit for rendering before printing
      setTimeout(() => {
        iframe.contentWindow.focus();
        iframe.contentWindow.print();
  
        // Optional: Clean up after printing
        setTimeout(() => {
          document.body.removeChild(iframe);
        }, 1000);
      }, 500);
    };
  
    return <button onClick={handlePrint}>Imprimir etiqueta</button>;
  };
  
  export default PrintButton;