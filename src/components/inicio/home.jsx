import { useState } from "react";
import PrintButton from "./../../components/envios/PrintButon";
import "./../../styles/home.css"
export default function Home() {


    const [buscador, setBuscador] = useState("");
    const handleBuscar = () => {
        console.log(buscador);
    };


    return (
        <div>
            <div className="buscador-codigo">
                <h1 className="titulo-home">Bienvenido a la página de inicio</h1>
                <input id="input" className="input-buscador-codigo" onChange={(e)=>{setBuscador(e.target.value)}}></input><button className="button-buscador-codigo" onClick={handleBuscar}>Buscar</button>
                <br></br>
            </div>
            <div className="anuncios">
                <div className="anuncio-1">
                    <h2 className="titulo-anuncio">Placeholder Anuncio 1</h2>
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjt-ewgNomB7qqJH9Hn5VxQsnOgH_rRb2u9Q&s"></img>
                </div>
                <div className="anuncio-1">
                    <h2 className="titulo-anuncio">Placeholder Anuncio 2</h2>
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjt-ewgNomB7qqJH9Hn5VxQsnOgH_rRb2u9Q&s"></img>
                </div>
            </div>
            <PrintButton />
        </div>
    );
}