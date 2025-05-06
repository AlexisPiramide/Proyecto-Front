import { useState } from "react";
import {Link, useNavigate} from 'react-router-dom';
import {getPaquete} from "../../services/paquetes.services";

import "./../../styles/home.css"
export default function Home() {
    const navigate = useNavigate();

    const [buscador, setBuscador] = useState("");
    const [historialPaquetes, setHistorialPaquetes] = useState([]);

    const handleBuscar = async () => {
        const paquete = await getPaquete(buscador);
        if (!paquete) {
            mostrarError("No se ha encontrado el paquete con ese código.");
        }else{
            const nuevoHistorial = [...historialPaquetes, paquete.codigo];
            setHistorialPaquetes(nuevoHistorial);
            navigate('/componentB',{state:{paquete:paquete}});
        }
     
    };

    useEffect(() => {
        const historial = JSON.parse(localStorage.getItem("historial"));
        if (historial) {
            setHistorialPaquetes(historial);
        }
    }, []);

    const mostrarError = (mensaje) => {
        if (mensaje) {
            toast.error(mensaje, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                toastId: mensaje,
            });
        }
    };

    return (
        <div>
            <div className="buscador-codigo">
                <h1 className="titulo-home">Bienvenido a la página de inicio</h1>
                <input type="text" id="input" onChange={(e) => setBuscador(e.target.value)} placeholder="Buscar paquete¡" />
                <button type="button" onClick={handleBuscar}>Buscar</button>
            </div>
            <div className="historial">
                {historialPaquetes.length > 0 ? (
                    <div className="historial-lista">
                        <h2>Historial de paquetes</h2>
                        {historialPaquetes.map((paquete, index) => (
                            <div key={index} className="paquete-item">
                                <p>{paquete.codigo}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="historial"></div>
                )
                }
            </div>
            <div className="anuncios">
                <div className="anuncio">
                    <h2 className="titulo-anuncio">Placeholder Anuncio 1</h2>
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjt-ewgNomB7qqJH9Hn5VxQsnOgH_rRb2u9Q&s" alt="Anuncio 1" />
                </div>
                <div className="anuncio">
                    <h2 className="titulo-anuncio">Placeholder Anuncio 2</h2>
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjt-ewgNomB7qqJH9Hn5VxQsnOgH_rRb2u9Q&s" alt="Anuncio 2" />
                </div>
            </div>
        </div>
    );
}