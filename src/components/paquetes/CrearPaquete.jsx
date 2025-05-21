import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import FormDirecciones from "./FormDirecciones";
import FormularioUsuario from "./FormUsuario";
import Dimension from "./Dimension";

import { getDimensiones } from "../../services/dimensiones.services";

import { postPaquete, calcularPrecio } from "../../services/paquetes.services";
import { MIN_NAME_LENGTH, ID_PATTERN, POSTAL_CODE_LENGTH, MIN_ADDRESS_NUMBER_LENGTH,PATERN_CORREO } from "../../services/const";

import { imprimir } from "../../utils/imprimirPaquete";

import "./../../styles/paquetes.css";

export default function CrearPaquete() {

    const [usuario, setUsuario] = useOutletContext();

    useEffect(() => {
        if (!usuario || !usuario.usuario.sucursal) {
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

    
    const obtenerPrecio = async () => {
        const preciodb = await calcularPrecio(dimension.nombre, peso);
        setPrecio(preciodb)
    }

    const fetchDimensiones = async () => { setDimensiones(await getDimensiones()); };
    const handleSubmit = async () => {
        const datos = {
            dimensiones: dimension?.id,
            remitente: ID_PATTERN.test(remitente.id) ? remitente.id : { nombre: remitente.nombre, apellidos: remitente.apellidos, correo: remitente.correo, telefono: remitente.telefono },
            direccion_remitente: {
                id: direccionRemitente.id,
                calle: direccionRemitente.calle,
                numero: direccionRemitente.numero,
                codigoPostal: direccionRemitente.codigoPostal,
                localidad: direccionRemitente.localidad,
                provincia: direccionRemitente.provincia,
                pais: direccionRemitente.pais
            },
            destinatario: ID_PATTERN.test(destinatario.id) ? destinatario.id : { nombre: destinatario.nombre, apellidos: destinatario.apellidos },
            direccion_destinatario: {
                id: direccionDestinatario.id,
                calle: direccionDestinatario.calle,
                numero: direccionDestinatario.numero,
                codigoPostal: direccionDestinatario.codigoPostal,
                localidad: direccionDestinatario.localidad,
                provincia: direccionDestinatario.provincia,
                pais: direccionDestinatario.pais
            },
            peso: peso
        };
        console.log(datos, "datos paquete");
        const result = await postPaquete(datos);
        console.log(result, "resultado peticion");
       
        if (result) {
            console.log("imprimir");
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
                {(dimension && dimension.nombre != null) ? <FormularioUsuario setDatosUsuario={setDestinatario} setDirecciones={setDireccionesDestinatario} tipo={"destinatario"}/> : <form></form>}
                {(destinatario && (destinatario.nombre?.length >= MIN_NAME_LENGTH && destinatario.apellidos?.length >= MIN_NAME_LENGTH && PATERN_CORREO.test(destinatario.correo)) || (destinatario && ID_PATTERN.test(destinatario.id))) ? <FormDirecciones usuario={destinatario} setDireccion={setDireccionDestinatario} direcciones={direccionesDestinatario} /> : <form></form>}
                {(direccionDestinatario && direccionDestinatario.codigoPostal?.length === POSTAL_CODE_LENGTH && direccionDestinatario.numero?.length >= MIN_ADDRESS_NUMBER_LENGTH) ? <FormularioUsuario setDatosUsuario={setRemitente} setDirecciones={setDireccionesRemitente} /> : <form></form>}

                {(remitente && (remitente.nombre?.length >= MIN_NAME_LENGTH && remitente.apellidos?.length >= MIN_NAME_LENGTH && PATERN_CORREO.test(destinatario.correo)) || (remitente && ID_PATTERN.test(remitente.id))) ? <FormDirecciones usuario={remitente} tipo={"remitente"} setDireccion={setDireccionRemitente} direcciones={direccionesRemitente} /> : <form></form>}
                <form>
                    <label>Peso</label><input type="text" name="peso" onChange={(e) => setPeso(e.target.value)} placeholder="Peso" />
                    <label>Precio</label><input type="text" name="precio" value={precio} disabled placeholder="Precio" />
                </form>
                <div className="boton-tramitar-contenedor">
                    {(remitente && ID_PATTERN.test(remitente.id)) ? <button className="tramitar" onClick={handleSubmit}>Tramitar</button> : <button disabled>Tramitar</button>}
                </div>
            </div>
            <ToastContainer />
        </>
    )
}