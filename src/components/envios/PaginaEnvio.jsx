import { useState, useEffect } from "react";
import { getTraking } from '../../services/envios.services';
import Tracking from "./Tracking";

import "./../../styles/envio.css"
import { useLocation } from 'react-router-dom';

import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Tracking from "./Tracking"; // Asumo que tienes este componente
import { getTraking } from "../api"; // Asegúrate de importar esta función

export default function Envio() {
    const location = useLocation();
    const navigate = useNavigate();

    // Validación previa
    if (!location.state || !location.state.paquete) {
        console.error("No se recibió el paquete. Redirigiendo...");
        useEffect(() => {
            navigate("/");
        }, []);
        return null;
    }

    const paquete = location.state.paquete;

    const [tracking, setTracking] = useState([]);

    const remitente = paquete.remitente;
    const direccion_remitente = paquete.direccion_remitente;

    const destinatario = paquete.destinatario;
    const direccion_destinatario = paquete.direccion_destinatario;

    const fetchTracking = async () => {
        const response = await getTraking(paquete.id);
        setTracking(response);
    };

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
