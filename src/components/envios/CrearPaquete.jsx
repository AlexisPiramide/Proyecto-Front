import { useEffect, useState } from "react";
import FormDestinatario from "./FormDestinatario";
import FormDirecciones from "./FormDirecciones";
import FormRemitente from "./FormRemitente";
import { getDimensiones } from "../../services/dimensiones.services";
import Dimension from "./Dimension";

import {postPaquete,calcularPrecio } from "../../services/paquetes.services";

import './../../styles/envios.css'
import { ToastContainer } from 'react-toastify';

export default function CrearPaquete(){

    const [dimension,setDimension] = useState();
    const [dimensiones, setDimensiones] = useState([]);

    const [remitente, setRemitente] = useState({});
    const [direccionRemitente, setDireccionRemitente] = useState();
    const [direccionesRemitente, setDireccionesRemitente] = useState([]);

    const [destinatario, setDestinatario] = useState({});
    const [direccionDestinatario, setDireccionDestinatario] = useState();
    const [direccionesDestinatario, setDireccionesDestinatario] = useState([]);

    const [peso, setPeso] = useState(0);
    const [precio, setPrecio] = useState(0);
    
    useEffect(() => {
        fetchDimensiones()
    },[]);


    useEffect(() => {
        obtenerPrecio();
    },[peso]);

    const fetchDimensiones = async () => {setDimensiones(await getDimensiones());};
    const submit = async () => {    
        const datos = {
            dimensiones: dimension?.id,
            remitente: /^[A-Za-z0-9]{4}-[A-Za-z0-9]{4}-[A-Za-z0-9]{4}$/.test(destinatario.id) ? destinatario.id : {nombre: destinatario.nombre, apellidos:destinatario.apellidos,correo: destinatario.correo, telefono: destinatario.telefono},
            direccion_remitente: {
                calle: direccionRemitente.calle,
                numero: direccionRemitente.numero,
                codigoPostal: direccionRemitente.codigoPostal,
                localidad: direccionRemitente.localidad,
                provincia: direccionRemitente.provincia,
                pais: direccionRemitente.pais
            },
            destinatario: /^[A-Za-z0-9]{4}-[A-Za-z0-9]{4}-[A-Za-z0-9]{4}$/.test(destinatario.id) ? destinatario.id : {nombre: destinatario.nombre, apellidos:destinatario.apellidos},
            direccion_destinatario: {
                calle: direccionDestinatario.calle,
                numero: direccionDestinatario.numero,
                codigoPostal: direccionDestinatario.codigoPostal,
                localidad: direccionDestinatario.localidad,
                provincia: direccionDestinatario.provincia,
                pais: direccionDestinatario.pais
            },
            peso: peso
        };
        console.log(datos,"datos peticion")
        const result = await postPaquete(datos)
        console.log(result,"resultado peticion")

    }

    const obtenerPrecio = async() => {
        const preciodb = await calcularPrecio(dimension.id, peso);
        setPrecio(preciodb)
    }

    return(
        <>
            <div className="dimensiones">
                {dimensiones.map(d => (<Dimension key={d.id} dimension={d} setDimension={setDimension} selectedDimension={dimension}/>))} 
            </div>
            <div className="forms-envio">
                {(dimension && dimension.nombre != null)?<FormDestinatario setDestinatario={setDestinatario} setDireccionesDestinatario={setDireccionesDestinatario}/>:<form></form>}
                {(destinatario && (destinatario.nombre?.length > 1 && destinatario.apellidos?.length > 1) || (destinatario && /^[A-Za-z0-9]{4}-[A-Za-z0-9]{4}-[A-Za-z0-9]{4}$/.test(destinatario.id))) ? <FormDirecciones usuario={destinatario} setDireccion={setDireccionDestinatario} direcciones={direccionesDestinatario} /> : <form></form>}
                {(direccionDestinatario && direccionDestinatario.codigoPostal?.length === 5 && direccionDestinatario.numero?.length > 0) ? <FormRemitente setRemitente={setRemitente} setDireccionesRemitente={setDireccionesRemitente} /> : <form></form>}
                
                {(remitente && (remitente.nombre?.length > 1 && remitente.apellidos?.length > 1) || (remitente && /^[A-Za-z0-9]{4}-[A-Za-z0-9]{4}-[A-Za-z0-9]{4}$/.test(remitente.id))) ? <FormDirecciones usuario={remitente} setDireccion={setDireccionRemitente} direcciones={direccionesRemitente} /> : <form></form>}
                <form>
                    <label>Peso</label><input type="text" name="peso" onChange={(e)=>setPeso(e.target.value)}  placeholder="Peso" />
                    <label>Precio</label><input type="text" name="precio" value={precio} disabled placeholder="Precio" />
                </form>
                <div className="boton-tramitar-contenedor">
                    {(remitente && /^[A-Za-z0-9]{4}-[A-Za-z0-9]{4}-[A-Za-z0-9]{4}$/.test(remitente.id))?<button className="tramitar" onClick={submit}>Tramitar</button>:<button disabled>Tramitar</button>}
                </div>
            </div>
            <ToastContainer />
        </>
    )
}