import { useEffect, useState } from "react";
import FormDestinatario from "./FormDestinatario";
import FormDirecciones from "./FormDirecciones";
import FormRemitente from "./FormRemitente";
import { getDimensiones } from "../../services/dimensiones.services";
import { getDireccionesUsuario } from "../../services/direcciones.services";
import Dimension from "./Dimension";
import {postPaquete} from "../../services/paquetes.services";
import './../../styles/envios.css'
import { ToastContainer } from 'react-toastify';

export default function CrearPaquete(){

    const [remitente, setRemitente] = useState({});
    
    const [destinatario, setDestinatario] = useState({});
    const [direccion, setDireccion] = useState({});
    const [direccionRemitente, setDireccionRemitente] = useState();
    const [dimension,setDimension] = useState();
    const [dimensiones, setDimensiones] = useState([]);

    const [direccionesUsuario, setDireccionesUsuario] = useState([]);
    const [direccionesDestinatario, setDireccionesDestinatario] = useState([]);
    const [direccionesRemitente, setDireccionesRemitente] = useState([]);
    const [peso, setPeso] = useState(0);
    useEffect(() => {
        fetchDimensiones()
    },[]);

    useEffect(() => {
    },[dimension,destinatario,direccion,remitente]);

    useEffect(() => {
        fetchDirecciones();
    },[remitente]);

    const fetchDirecciones = async () => {
        const direcciones = await getDireccionesUsuario(remitente.id);
        setDireccionesUsuario(direcciones);
    }

    const fetchDimensiones = async () => {
        const dimensiones = await getDimensiones();
        setDimensiones(dimensiones);
    }

    const submit = async () => {

        const datos = {
            dimensiones: dimension?.id,
            remitente: /^[A-Za-z0-9]{4}-[A-Za-z0-9]{4}-[A-Za-z0-9]{4}$/.test(destinatario.id) ? destinatario.id : {nombre: destinatario.nombre, apellidos:destinatario.apellidos,correo: destinatario.correo, telefono: destinatario.telefono},
            direccion_remitente: {
                calle: direccion.calle,
                numero: direccion.numero,
                codigoPostal: direccion.codigoPostal,
                localidad: direccion.localidad,
                provincia: direccion.provincia,
                pais: direccion.pais
            },
            destinatario: /^[A-Za-z0-9]{4}-[A-Za-z0-9]{4}-[A-Za-z0-9]{4}$/.test(destinatario.id) ? destinatario.id : {nombre: destinatario.nombre, apellidos:destinatario.apellidos},
            direccion_destinatario: {
                calle: direccion.calle,
                numero: direccion.numero,
                codigoPostal: direccion.codigoPostal,
                localidad: direccion.localidad,
                provincia: direccion.provincia,
                pais: direccion.pais
            },
            peso: peso
        };
        
        //const result = await postPaquete(datos)
        console.log(datos)

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
                {(dimension && dimension.nombre != null)?<FormDestinatario setDestinatario={setDestinatario} setDireccionesDestinatario={setDireccionesDestinatario}/>:<form></form>}
                {(destinatario && (destinatario.nombre?.length > 1 && destinatario.apellidos?.length > 1) || (destinatario && /^[A-Za-z0-9]{4}-[A-Za-z0-9]{4}-[A-Za-z0-9]{4}$/.test(destinatario.id))) ? <FormDirecciones usuario={destinatario} setDireccion={setDireccion} direcciones={direccionesDestinatario} /> : <form></form>}
                {(direccion && direccion.codigoPostal?.length === 5 && direccion.numero?.length > 0) ? <FormRemitente setRemitente={setRemitente} setDireccionesRemitente={setDireccionesRemitente} /> : <form></form>}
                
                {(remitente && (remitente.nombre?.length > 1 && remitente.apellidos?.length > 1) || (remitente && /^[A-Za-z0-9]{4}-[A-Za-z0-9]{4}-[A-Za-z0-9]{4}$/.test(remitente.id))) ? <FormDirecciones usuario={remitente} setDireccion={setDireccionRemitente} direcciones={direccionesRemitente} /> : <form></form>}
                <form>
                    <label>Peso</label>
                    <input type="text" name="peso" onChange={(e)=>setPeso(e.target.value)}  placeholder="Peso" />
                </form>
                <div className="boton-tramitar-contenedor">
                    {(remitente && /^[A-Za-z0-9]{4}-[A-Za-z0-9]{4}-[A-Za-z0-9]{4}$/.test(remitente.id))?<button className="tramitar" onClick={submit}>Tramitar</button>:<button disabled>Tramitar</button>}
            
                </div>
                </div>
            <ToastContainer />
        </>
    )
}