// imprimirPaquete.js
import React from "react";
import ReactDOM from "react-dom/client";
import Impresion from "../components/paquetes/Impresion"; // Ensure correct path
import "./../styles/impresion.css"; // Ensure path works

export const imprimir = (paquete) => {
  const iframe = document.createElement("iframe");
  iframe.style.position = "fixed";
  iframe.style.width = "0";
  iframe.style.height = "0";
  iframe.style.border = "none";
  iframe.style.visibility = "hidden";

  document.body.appendChild(iframe);

  const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;

  iframeDoc.open();
  iframeDoc.write(`<html><head></head><body><div id="print-root"></div></body></html>`);
  iframeDoc.close();

  // Copy all styles
  const head = iframeDoc.head;
  document.querySelectorAll("style, link[rel='stylesheet']").forEach((style) => {
    head.appendChild(style.cloneNode(true));
  });

  const mountNode = iframeDoc.getElementById("print-root");

  const root = ReactDOM.createRoot(mountNode);
  root.render(<Impresion paquete={paquete} />);

  setTimeout(() => {
    iframe.contentWindow.focus();
    iframe.contentWindow.print();

    setTimeout(() => {
      document.body.removeChild(iframe);
    }, 1000);
  }, 500);
};
