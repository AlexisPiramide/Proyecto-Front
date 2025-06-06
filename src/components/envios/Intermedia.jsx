import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getPaquete } from "../../services/paquetes.services";
import "./../../styles/intermedia.css"


export default function Intermedia() {

    const { id } = useParams();

    const navigate = useNavigate();

    const handleBuscar = async () => {
        const paquete = await getPaquete(id);
        if (!paquete) {
            mostrarError("No se ha encontrado el paquete con ese código.");
        } else {
            navigate('/envio', { state: { paquete: paquete } });
        };
    };

    useEffect(() => {
        if (id) {
            handleBuscar();
        }

    }, [id, navigate]);
    
    return (
        <div className="intermedia">
            <h2>El paquete que buscas no existe, revisa el código de seguimiento y asegurate de que sea correcto.</h2> 
            

            <h3>Pulsa aqui para volver al inicio y poder intentarlo de nuevo</h3>
            <button onClick={() => navigate('/')}>Volver al inicio</button>
        </div>
    );
}