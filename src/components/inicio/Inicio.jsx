import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { getPaquete } from "../../services/paquetes.services";
import { ToastContainer, toast } from 'react-toastify';
import LeafletMap from "./../leaftlet";

import "./../../styles/home.css"
export default function Inicio() {
    const navigate = useNavigate();
    const [latitud, setLatitud] = useState(null);
    const [longitud, setLongitud] = useState(null);
    const [buscador, setBuscador] = useState("");

    const handleBuscar = async () => {
        const paquete = await getPaquete(buscador);
        if (!paquete) {
            mostrarError("No se ha encontrado el paquete con ese código.");
        } else {
            navigate('/envio', { state: { paquete: paquete } });
        };
    };

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
    useEffect(() => {
        getGeolocation();
    }, []);

    const getGeolocation = () => {
        const geoLocalStorage = sessionStorage.getItem("geoLocalizacion");

        if (geoLocalStorage) {
            const { latitud, longitud } = JSON.parse(geoLocalStorage);
            setLatitud(latitud);
            setLongitud(longitud);
            console.log("Geolocalización obtenida del almacenamiento de sesión:", latitud, longitud);
        } else {
            if ("geolocation" in navigator) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const { latitude, longitude } = position.coords;
                        setLatitud(latitude);
                        setLongitud(longitude);
                        sessionStorage.setItem("geoLocalizacion", JSON.stringify({ latitud: latitude, longitud: longitude }));
                    },
                    (error) => {
                        console.error("Error al obtener la geolocalización:", error);
                    }
                );
            } else {
                console.error("La geolocalización no está soportada en este navegador.");
            }
        }
    }

    return (
        <div className="home">
            <div className="buscador-codigo">
                <h1 className="titulo-home">Bienvenido a la página de inicio</h1>
                <input type="text" id="input" onChange={(e) => setBuscador(e.target.value)} placeholder="Buscar paquete" />
                <button type="button" onClick={handleBuscar}>Buscar</button>
            </div>
            <div className="anuncios">
                <div className="anuncio">
                    <h2 className="titulo-anuncio">Gestiona tu cuenta para buscar los paquetes</h2>
                    <img src="/anuncio.jpg" alt="Anuncio 1" onClick={() => { navigate("/usuario") }} />
                </div>
                <div className="anuncio">
                    <h2 className="titulo-anuncio mapa">Encuentranos por toda España</h2>
                    <LeafletMap latitud={latitud} longitud={longitud} />
                </div>

            </div>
            <ToastContainer />
        </div>
    );
}