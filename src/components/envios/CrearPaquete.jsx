import { useEffect, useState } from "react";
import FormDestinatario from "./FormDestinatario";
import FormDirecciones from "./FormDirecciones";
import FormRemitente from "./FormRemitente";
import { getDimensiones } from "../../services/dimensiones.services";
import { getDireccionesUsuario } from "../../services/direcciones.services";
import Dimension from "./Dimension";
import {postPaquete} from "../../services/paquetes.services";
import './../../styles/envios.css'

export default function CrearPaquete(){

    const [remitente, setRemitente] = useState("");
    
    const [destinatario, setDestinatario] = useState({});
    const [direccion, setDireccion] = useState({});
    const [direccionRemitente, setDireccionRemitente] = useState();
    const [dimension,setDimension] = useState();
    const [dimensiones, setDimensiones] = useState([]);

    const [direccionesUsuario, setDireccionesUsuario] = useState([]);

    useEffect(() => {
        fetchDimensiones()
    },[]);

    useEffect(() => {
        console.log(remitente.length)
    },[dimension,destinatario,direccion,remitente]);

    useEffect(() => {
        fetchDirecciones();
    },[remitente]);

    const fetchDirecciones = async () => {
        const direcciones = await getDireccionesUsuario();
        setDireccionesUsuario(direcciones);
    }

    const fetchDimensiones = async () => {
        const dimensiones = await getDimensiones();
        setDimensiones(dimensiones);
    }

    const submit = async () => {

        const datos = {
            dimensiones: dimension?.id,
            remitente: remitente,
            direccion_remitente: direccionRemitente,
            destinatario: `${destinatario.nombre} ${destinatario.apellidos}`,
            direccion_destinatario: {
                calle: direccion.calle,
                numero: direccion.numero,
                codigoPostal: direccion.codigoPostal,
                localidad: direccion.localidad,
                provincia: direccion.provincia,
                pais: direccion.pais
            },
            peso: dimension?.peso
        };

        const result = await postPaquete(datos)
        console.log(result)

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
                {(remitente && remitente.length === 14) ? 
                <select onChange={(e) => setDireccionRemitente(e.target.value)}>
                    {direccionesUsuario.map((element, index) => (
                        <option key={index} value={element.value}>{element.label}</option>
                    ))}
                </select> : <></>
                }
            </div>
            {(remitente && remitente.length ===14)?<button onClick={submit}>Tramitar</button>:<button disabled>Tramitar</button>}
        </>
    )
}