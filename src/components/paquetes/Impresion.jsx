import "./../../styles/impresion.css";

export default function impresion({ paquete, barcode }) {

    const { remitente, destinatario, dimensiones, peso, direccion_destinatario, direccion_remitente } = paquete;

    const direccionR = direccion_remitente.calle + " " + direccion_remitente.numero;
    const localidadR = direccion_remitente.localidad + ", " + direccion_remitente.provincia + ", " + direccion_remitente.pais;

    const direccionD = direccion_destinatario.calle + " " + direccion_destinatario.numero;
    const localidadD = direccion_destinatario.localidad + ", " + direccion_destinatario.provincia + ", " + direccion_destinatario.pais;

    return (
        <div className="content">
            <div className="remitente">
                <h2>Remitente</h2>
                <div className="datos-remitente">
                    <input name="nombre" id="nombre-remitente" disabled placeholder="Remitente" value={remitente.nombre || ''} />
                    <input name="direccion" id="direccion-remitente" disabled placeholder="Dirección" value={direccionR || ''} />
                    <input name="localidad" id="localidad-remitente" disabled placeholder="Localidad" value={localidadR || ''} />
                    <input name="codigopostal" id="codigopostal-remitente" disabled placeholder="Código Postal" value={direccion_remitente.codigopostal || ''} />
                </div>
            </div>
            <div className="hrdiv"></div>
            <div className="destinatario">
                <h2>Destinatario</h2>
                <div className="datos-destinatario">
                    <input name="nombre" id="nombre-destinatario" disabled placeholder="Nombre" value={destinatario.nombre || ''} />
                    <input name="direccion" id="direccion" disabled placeholder="Dirección" value={direccionD || ''} />
                    <input name="localidad" id="localidad-destinatario" disabled placeholder="Localidad" value={localidadD || ''} />
                    <input name="codigopostal" id="codigopostal" disabled placeholder="Código Postal" value={direccion_destinatario.codigopostal || ''} />
                </div>
            </div>
            <div className="hrdiv"></div>
            <div className="qr-logo">
                <div className="codigo">
                    <img src={barcode} alt="QR Code" />
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


