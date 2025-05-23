import { useState, useEffect } from "react";
import { getTraking } from '../../services/envios.services';
import Tracking from "./Tracking";

import "./../../styles/envio.css"
import { useLocation } from 'react-router-dom';

export default function Envio() {
    const location = useLocation();
    const paquete = location.state.paquete;

    const [tracking, setTracking] = useState([]);
    const remitente = paquete.remitente;
    const direccion_remitente = paquete.direccion_destinatario;

    const destinatario = paquete.destinatario;
    const direccion_destinatario = paquete.direccion_destinatario;

    const fetchTracking = async () => {
        const response = await getTraking(paquete.id);
        console.log(response);
        setTracking(response);
    }

    useEffect(() => {
        fetchTracking();
    }, []);

    return (
        <div className="paquete">
            <div className="informacion">
                <div className="datos-remitente">
                    <h3>Datos del remitente</h3>
                    <p className="remitente-paquete" id="id">{remitente.id}</p>
                    <p className="remitente-paquete" id="remitente">{remitente.nombre}</p>
                    <p className="direccion-paquete" id="direccion">
                        {direccion_remitente.calle} {direccion_remitente.numero}, {direccion_remitente.codigoPostal}, {direccion_remitente.localidad},
                        {direccion_remitente.provincia}, {direccion_remitente.pais}
                    </p>
                </div>
                <div className="datos-destinatario">
                    <h3>Datos del destinatario</h3>
                    <p className="destinatario-paquete" id="id">{destinatario.id}</p>
                    <p className="destinatario-paquete" id="destinatario">{destinatario.nombre}</p>
                    <p className="direccion-paquete" id="direccion">
                        {direccion_destinatario.calle} {direccion_destinatario.numero}, {direccion_destinatario.codigoPostal}, {direccion_destinatario.localidad},
                        {direccion_destinatario.provincia}, {direccion_destinatario.pais}
                    </p>
                </div>

            </div>
            <Tracking datos={tracking} />
        </div>
    );
}