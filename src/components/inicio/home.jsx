import { useState } from "react";
import PrintButton from "../paquetes/PrintButon";
import "./../../styles/home.css"
export default function Home() {


    const [buscador, setBuscador] = useState("");
    const [historialPaquetes, setHistorialPaquetes] = useState([]);
    const handleBuscar = () => {
        console.log(buscador);
    };

    useEffect(() => {
        const historial = JSON.parse(localStorage.getItem("historial"));
        if (historial) {
            setHistorialPaquetes(historial);
        }
    }, []);

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
            <PrintButton />
        </div>
    );
}