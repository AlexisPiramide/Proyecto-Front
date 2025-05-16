import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import {getPaquete} from "../../services/paquetes.services";
import { ToastContainer, toast } from 'react-toastify';
import "./../../styles/home.css"
import Idea from "../../../pruebas/idea";
export default function Home() {
    const navigate = useNavigate();

    const [buscador, setBuscador] = useState("");
    const [historialPaquetes, setHistorialPaquetes] = useState([]);

    const handleBuscar = async () => {
        const paquete = await getPaquete(buscador);
        if (!paquete) {
            mostrarError("No se ha encontrado el paquete con ese código.");
        }else{
            if (!historialPaquetes.includes(paquete.codigo)) {
                if (historialPaquetes.length < 10) {
                    const nuevoHistorial = [...historialPaquetes, paquete.codigo];
                    setHistorialPaquetes(nuevoHistorial);
                    localStorage.setItem("historial", JSON.stringify(nuevoHistorial));
                }else{
                    const nuevoHistorial = historialPaquetes.filter(cod => cod !== historialPaquetes[0]).concat(paquete.codigo);
                    setHistorialPaquetes(nuevoHistorial);
                    localStorage.setItem("historial", JSON.stringify(nuevoHistorial));
                }
              
            }else{
                const nuevoHistorial = historialPaquetes.filter(cod => cod !== paquete.codigo).concat(paquete.codigo);
                setHistorialPaquetes(nuevoHistorial);
                localStorage.setItem("historial", JSON.stringify(nuevoHistorial));
            }
            navigate('/envio',{state:{paquete:paquete}});
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
                <input type="text" id="input" onChange={(e) => setBuscador(e.target.value)} placeholder="Buscar paquete" />
                <button type="button" onClick={handleBuscar}>Buscar</button>
            </div>
            <div className="historial">
                {historialPaquetes.length > 0 ? (
                    <>
                        {historialPaquetes.map((paquete, index) => (
                            <button key={index} className="paquete-item" onClick={()=>{console.log(paquete)}}>{paquete}</button>
                        ))}
                    </>
                ) : (
                    <></>
                )
                }
            </div>
            {/*<Idea/>*/}
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
            <ToastContainer/>
        </div>
    );
}