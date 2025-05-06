import { useState, useEffect } from "react";
import { getTraking } from '../../services/envios.services';
import Tracking from "./Tracking";

import "./../../styles/envio.css"
import {useLocation} from 'react-router-dom';

export default function Envio() {
    const location = useLocation();
    const paquete = location.state.paquete; 

    const [tracking, setTracking] = useState([]);
    const remitente = paquete.remitente;
    const direccionremitente = remitente.direccion;

    const fetchTracking = async () => {
        const response = await getTraking(paquete.id);
        setTracking(response);
    }

    useEffect(() => {
        fetchTracking();
    }, []);

    return (
        <div className="paquete">
            <h1>Paquete - {paquete.id}</h1>
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
                    <p className="destinatario" id="id">{paquete.destinatario.id}</p>
                    <p className="destinatario" id="destinatario">{paquete.destinatario.nombre}</p>
                    <p className="direccion" id="direccion">
                        {paquete.direccion.calle} {paquete.direccion.numero}, {paquete.direccion.codigoPostal}, {paquete.direccion.localidad}, 
                        {paquete.direccion.provincia}, {paquete.direccion.pais}
                    </p>
            </div>
            <Tracking datos={tracking} /> 
        </div>
    </div>
    );
}