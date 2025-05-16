import { useEffect, useState } from "react";
import FormDestinatario from "./FormDestinatario";
import FormDirecciones from "./FormDirecciones";
import FormRemitente from "./FormRemitente";
import { getDimensiones } from "../../services/dimensiones.services";
import { comprobarDatos } from "../../services/usuarios.services";
import Dimension from "./Dimension";
import { imprimir } from "./../../utils/imprimirPaquete.jsx";
import { postPaquete, calcularPrecio } from "../../services/paquetes.services";
import { useOutletContext } from "react-router-dom";
import { MIN_NAME_LENGTH, ID_PATTERN, POSTAL_CODE_LENGTH, MIN_ADDRESS_NUMBER_LENGTH } from "../../services/const";

import './../../styles/paquetes.css'
import { ToastContainer } from 'react-toastify';

export default function CrearPaquete() {

    const [usuario, setUsuario] = useOutletContext();

    useEffect(() => {
        if (!usuario || !usuario.sucursal) {
            window.location.href = "/";
        }
    }, [usuario]);

    const [dimension, setDimension] = useState();
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
    }, []);

    useEffect(() => {
        obtenerPrecio();
    }, [peso]);

    useEffect(() => {
        comprobar(destinatario);
    }, [destinatario]);

    useEffect(() => {
        comprobar(remitente);
    }, [remitente]);

    const comprobar = async (usuario) => {
        if (usuario.nombre && usuario.apellidos && (usuario.telefono || usuario.correo)) {
            return result = await comprobarDatos(usuario.nombre, usuario.apellidos, usuario.telefono, usuario.correo);
        }
    }
    
    const obtenerPrecio = async () => {
        const preciodb = await calcularPrecio(dimension.id, peso);
        setPrecio(preciodb)
    }

    const fetchDimensiones = async () => { setDimensiones(await getDimensiones()); };
    const handleSubmit = async () => {
        const datos = {
            dimensiones: dimension?.id,
            remitente: ID_PATTERN.test(destinatario.id) ? destinatario.id : { nombre: destinatario.nombre, apellidos: destinatario.apellidos, correo: destinatario.correo, telefono: destinatario.telefono },
            direccion_remitente: {
                calle: direccionRemitente.calle,
                numero: direccionRemitente.numero,
                codigoPostal: direccionRemitente.codigoPostal,
                localidad: direccionRemitente.localidad,
                provincia: direccionRemitente.provincia,
                pais: direccionRemitente.pais
            },
            destinatario: ID_PATTERN.test(destinatario.id) ? destinatario.id : { nombre: destinatario.nombre, apellidos: destinatario.apellidos },
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
        const result = await postPaquete(datos);
        console.log(result, "resultado peticion");
        if (result) {
            imprimir(result);
        } else {
            mostrarError("Error al crear el paquete, revise los datos introducidos.");
        }
    }

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
        <>
            <div className="dimensiones">
                {dimensiones.map(d => (<Dimension key={d.id} dimension={d} setDimension={setDimension} selectedDimension={dimension} />))}
            </div>
            <div className="forms-envio">
                {(dimension && dimension.nombre != null) ? <FormDestinatario setDestinatario={setDestinatario} setDireccionesDestinatario={setDireccionesDestinatario} /> : <form></form>}
                {(destinatario && (destinatario.nombre?.length >= MIN_NAME_LENGTH && destinatario.apellidos?.length >= MIN_NAME_LENGTH) || (destinatario && ID_PATTERN.test(destinatario.id))) ? <FormDirecciones usuario={destinatario} setDireccion={setDireccionDestinatario} direcciones={direccionesDestinatario} /> : <form></form>}
                {(direccionDestinatario && direccionDestinatario.codigoPostal?.length === POSTAL_CODE_LENGTH && direccionDestinatario.numero?.length >= MIN_ADDRESS_NUMBER_LENGTH) ? <FormRemitente setRemitente={setRemitente} setDireccionesRemitente={setDireccionesRemitente} /> : <form></form>}

                {(remitente && (remitente.nombre?.length >= MIN_NAME_LENGTH && remitente.apellidos?.length >= MIN_NAME_LENGTH) || (remitente && ID_PATTERN.test(remitente.id))) ? <FormDirecciones usuario={remitente} setDireccion={setDireccionRemitente} direcciones={direccionesRemitente} /> : <form></form>}
                
                {(direccionRemitente && direccionRemitente.codigoPostal?.length === POSTAL_CODE_LENGTH && direccionRemitente.numero?.length >= MIN_ADDRESS_NUMBER_LENGTH) ? 
                <form>
                    <label>Peso</label><input type="text" name="peso" onChange={(e) => setPeso(e.target.value)} placeholder="Peso" />
                    <label>Precio</label><input type="text" name="precio" value={precio} disabled placeholder="Precio" />
                </form>
                :
                <form></form> 
                }
                
                <div className="boton-tramitar-contenedor">
                    {(remitente && ID_PATTERN.test(remitente.id)) ? <button className="tramitar" onClick={handleSubmit}>Tramitar</button> : <button className="tramitar" disabled>Tramitar</button>}
                </div>
            </div>
            <ToastContainer />
        </>
    )
}