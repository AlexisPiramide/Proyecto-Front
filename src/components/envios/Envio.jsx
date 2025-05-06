import { useState, useEffect } from "react";

import "./../../styles/envio.css"
import traking from "../../services/envios.services";
import Tracking from "./Tracking";

export default function Envio(envio) {

    const [tracking, setTracking] = useState([]);
    const remitente = envio.remitente;
    const direccionremitente = remitente.direccion;

    const fetchTracking = async () => {
        const response = await traking(envio.id);
        setTracking(response);
    }

    useEffect(() => {
        fetchTracking();
    }, []);

    return (
        <div className="envio">
            <h1>Envio - {envio.id}</h1>
            <div className="informacion">
                <h2>Informacion Basica</h2>
                <div className="datos-remitente">
                    <h3>Datos del remitente</h3>
                    <p className="remitente" id="id">{remitente.id}</p>
                    <p className="remitente" id="remitente">{remitente.nombre}</p>
                    <p className="direccion" id="direccion">
                        {direccionremitente.calle} {direccionremitente.numero}, {direccionremitente.codigoPostal}, {direccionremitente.localidad}, 
                        {direccionremitente.provincia}, {direccionremitente.pais}
                    </p>
                </div>
                <div className="datos-destinatario">
                    <h3>Datos del destinatario</h3>
                    <p className="destinatario" id="id">{envio.destinatario.id}</p>
                    <p className="destinatario" id="destinatario">{envio.destinatario.nombre}</p>
                    <p className="direccion" id="direccion">
                        {envio.direccion.calle} {envio.direccion.numero}, {envio.direccion.codigoPostal}, {envio.direccion.localidad}, 
                        {envio.direccion.provincia}, {envio.direccion.pais}
                    </p>
            </div>

            <Tracking datos={tracking} /> 
           
        </div>
    </div>
    );
}