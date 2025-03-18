import { useEffect, useState } from "react";
import FormDestinatario from "./FormDestinatario";
import FormDirecciones from "./FormDirecciones";
import FormRemitente from "./FormRemitente";
import { getDimensiones } from "../../services/dimensiones.services";
import Dimension from "./Dimension";

import './../../styles/envios.css'

export default function CrearPaquete(){

    const [remitente, setRemitente] = useState({});
    
    const [destinatario, setDestinatario] = useState({});
    const [direccion, setDireccion] = useState({});
    const [dimension,setDimension] = useState();
    const [dimensiones, setDimensiones] = useState([]);

    useEffect(() => {
        fetchDimensiones()
    },[]);

    useEffect(() => {
        console.log(remitente.length)
    },[dimension,destinatario,direccion,remitente]);

    const fetchDimensiones = async () => {
        const dimensiones = await getDimensiones();
        setDimensiones(dimensiones);
    }




    return(
        <>
            <div className="dimensiones">
            {
                dimensiones.map(d => (
                    <Dimension key={d.id} dimension={d} setDimension={setDimension} selectedDimension={dimension}/>
                ))
            } 
            </div>
            <div className="forms-envio">
                {(dimension && dimension.nombre != null)?<FormDestinatario setDestinatario={setDestinatario}/>:<form></form>}
                {(destinatario && destinatario.nombre?.length > 3 && destinatario.apellidos?.length > 5) ? <FormDirecciones setDireccion={setDireccion} /> : <form></form>}
                {(direccion && direccion.codigoPostal?.length === 5 && direccion.numero?.length > 0) ? <FormRemitente setRemitente={setRemitente} /> : <form></form>}
            </div>
            {(remitente && remitente.length ===14)?<button>Siguiente</button>:<button disabled>Siguiente</button>}
        </>
    )
}