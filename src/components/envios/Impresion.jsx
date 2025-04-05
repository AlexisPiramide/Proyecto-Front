import React from "react";
import "./../../styles/impresion.css";

export default function impresion({paquete}){

    const {remitente, destinatario, dimensiones, peso,codigo} = paquete;

    return (
        <div className="content">
        <div className="remitente">
            <h2>Remitente</h2>
            <div className="datos-remitente">
            <input name="nombre" id="nombre-remitente" disabled placeholder="Remitente" value={remitente.nombre || ''} />
            </div>
        </div>
        <div className="hrdiv"></div>
        <div className="destinatario">
            <h2>Destinatario</h2>
            <div className="datos-destinatario">
            <input name="nombre" id="nombre-destinatario" disabled placeholder="Nombre" value={destinatario.nombre || ''} />
            <input name="text" id="text" disabled placeholder="Texto" value={destinatario.texto || ''} />
            <input name="direccion" id="direccion" disabled placeholder="Dirección" value={destinatario.direccion || ''} />
            <input name="codigopostal" id="codigopostal" disabled placeholder="Código Postal" value={destinatario.codigopostal || ''} />
            </div>
        </div>
        <div className="hrdiv"></div>
        <div className="qr-logo">
            <div className="codigo">
            <img src={codigo} alt="QR Code" />
            </div>
            <div className="datos">
            <label>Dimensiones</label>
            <input name="dimensiones" id="dimensiones" disabled placeholder="Dimensiones" value={dimensiones || ''} />
            <label>Peso</label>
            <input name="peso" id="peso" disabled placeholder="Nombre" value={peso || ''} />
            </div>
        </div>
        </div>
    );
};


