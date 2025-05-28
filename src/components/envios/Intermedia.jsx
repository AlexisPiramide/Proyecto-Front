import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getPaquete } from "../../services/paquetes.services";



export default function Intermedia() {

    const { id } = useParams();

    const navigate = useNavigate();

    const handleBuscar = async () => {
        const paquete = await getPaquete(buscador);
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
            <button onClick={() => navigate('/')}>Volver al inicio</button>
        </div>
    );
}