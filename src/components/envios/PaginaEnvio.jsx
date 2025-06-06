import "./../../styles/envio.css"
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Tracking from "./Tracking";
import { getTraking } from "./../../services/envios.services"

export default function Envio() {
    const location = useLocation();
    const navigate = useNavigate();

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

    const checkIfuser = () => {
        const usuario = JSON.parse(localStorage.getItem("usuario"));

        if (!usuario){
            return false;
        }
        if ((usuario.usuario.nombre == remitente.nombre && usuario.usuario.apellidos == remitente.apellidos) || (usuario.usuario.nombre == destinatario.nombre && usuario.usuario.apellidos == destinatario.apellidos)) {
            return true;
        }
        else{
            return false;
        }
    }

    const isNotUser = () => {
        const usuario = JSON.parse(localStorage.getItem("usuario"));

        if (!usuario){
            return true;
        }
        else return false;
    }


    const isUser = checkIfuser();

    const notUser = isNotUser();

    return (
        <div className="paquete">
            {isUser?<div className="informacion">
                <h3>Datos del remitente - {remitente.id}</h3>
                <h2 className="remitente-paquete" id="nombre">{remitente.nombre} {remitente.apellidos}</h2> 
                <p className="direccion-paquete" id="direccion">
                    {direccion_remitente.calle} {direccion_remitente.numero}, {direccion_remitente.codigoPostal}, {direccion_remitente.localidad},
                    {direccion_remitente.provincia}, {direccion_remitente.pais}
                </p>

                <h3>Datos del destinatario - {destinatario.id}</h3>
                <h2 className="destinatario-paquete" id="nombre">{destinatario.nombre} {destinatario.apellidos}</h2>
                <p className="direccion-paquete" id="direccion">
                    {direccion_destinatario.calle} {direccion_destinatario.numero}, {direccion_destinatario.codigoPostal}, {direccion_destinatario.localidad},
                    {direccion_destinatario.provincia}, {direccion_destinatario.pais}
                </p>
            </div>
            :
            (notUser ? <div className="informacion_sin_sesion">Inicia sesión para ver esta información</div> : <div className="informacion_sin_sesion"> Esta informacion no te incumbe</div>)}
            <Tracking datos={tracking} />
        </div>
    );
}
