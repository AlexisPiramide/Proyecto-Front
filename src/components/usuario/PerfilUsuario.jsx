import { useEffect, useState } from "react";
import { useOutletContext } from "react-router";
import { getDireccionesUsuario, postDireccion, obtenerLocalidadProvincia, eliminarDireccion } from "../../services/direcciones.services";
import { getPaquete, getPaquetesUsuario } from "../../services/paquetes.services";
import { ToastContainer, toast } from "react-toastify";

import { getDimensiones } from "../../services/dimensiones.services";

import "./../../styles/perfil.css"
import { useNavigate } from "react-router-dom";

export default function PerfilUsuario() {
    const navigate = useNavigate();

    const [usuario, setUsuario] = useOutletContext();
    const [direcciones, setDirecciones] = useState([]);
    const [pedidos, setPedidos] = useState([]);

    const [dimensiones, setDimensiones] = useState([]);

    const [codigoPostal, setCodigoPostal] = useState("");

    const fetchDimensiones = async () => {
        const data = await getDimensiones(usuario.usuario.id);
        console.log(data);
        setDimensiones(data);
    }


    useEffect(() => {
        if (codigoPostal.length === 5) {
            obtenerLocalidadProvincia(codigoPostal).then((resultado) => {
                if (resultado) {
                    setNuevaDireccion({ ...nuevaDireccion, localidad: resultado.localidad, provincia: resultado.provincia });
                }
            });
        }
    }, [codigoPostal]);

    const [nuevaDireccion, setNuevaDireccion] = useState({
        calle: "",
        numero: "",
        codigoPostal: "",
        localidad: "",
        provincia: "",
        pais: "España",
        es_temporal: false
    });

    const [tipo, setTipo] = useState(false);
    const [nueva, setNueva] = useState(true);

    const [historialPaquetes, setHistorialPaquetes] = useState([]);
    useEffect(() => {
        const historial = JSON.parse(localStorage.getItem("historial"));
        if (historial) {
            setHistorialPaquetes(historial);
        }
    }, []);

    const fetchPedidos = async () => {
        const data = await getPaquetesUsuario(usuario.usuario.id);
        console.log(data);
        setPedidos(data);
    };

    const fetchDirecciones = async () => {
        const data = await getDireccionesUsuario(usuario.usuario.id);
        setDirecciones(data);
    };

    const submitDireccion = async (e) => {
        e.preventDefault();
        if (nuevaDireccion.calle && nuevaDireccion.numero && nuevaDireccion.codigoPostal) {
            const data = await postDireccion(nuevaDireccion);

            if (data) {
                const direccionesActualizadas = await getDireccionesUsuario(usuario.usuario.id);
                setDirecciones(direccionesActualizadas);
                mostrarResultado("Dirección guardada", true);
                setNueva(true);
            } else {
                mostrarError("Error al guardar la dirección");
            }

        } else {
            mostrarError("Rellena todos los campos");
        }
    }

    const eliminar = async (e, direccion) => {
        e.preventDefault();

        try {
            const result = eliminarDireccion(direccion.id);
            if (result) {
                const direccionesActualizadas = await getDireccionesUsuario(usuario.usuario.id);
                setDirecciones(direccionesActualizadas);
                setTipo(false);
                mostrarResultado("Dirección guardada", true);
            }
        } catch (error) {
            mostrarError("Error al eliminar la dirección");
        }
    }

    useEffect(() => {
        fetchPedidos();
        fetchDirecciones();
        fetchDimensiones();
    }, []);

    const mostrarError = (mensaje) => {
        toast.error(mensaje, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            toastId: mensaje,
        })
    }

    const mostrarResultado = (mensaje, estado) => {
        const tipoToast = estado ? toast.success : toast.warning;
        tipoToast(mensaje, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            toastId: mensaje,
        })
    }

    const handlePedidoMirar = async(pedidoId) => {
        console.log(pedidoId);
        const paquete = await getPaquete(pedidoId);
        console.log(paquete);
        if (paquete) {
            const historialActualizado = [...historialPaquetes, paquete.id];
            setHistorialPaquetes(historialActualizado);
            localStorage.setItem("historial", JSON.stringify(historialActualizado));
            // Only pass serializable data (e.g., the paquete id or a plain object)
            navigate('/envio', { state: { paquete: paquete } });
        } else {
            mostrarError("Error al obtener el paquete");
        }
    }


    const telefonoFormateado = (telefono) => {
        if (telefono) {
            const telefonoSinEspacios = telefono.replace(/\s+/g, '');
            return telefonoSinEspacios.replace(/(\d{3})(\d{2})(\d{2})(\d{2})/, '$1 $2 $3 $4');
        }
        return '';
    }

    return (
        <div className="perfil-usuario">
            <aside>
                <div className="aside-contenido">
                    <img src="avatar.png" />
                    <h1>{usuario.usuario.nombre} {usuario.usuario.apellidos}</h1>
                    <p>{usuario.usuario.correo}</p>
                    <p>+34 {telefonoFormateado(usuario.usuario.telefono)} </p>
                </div>

                <div className="botones-aside">
                    <button className={"aside-direccion " + (!tipo ? "seleccionada" : "")} onClick={() => { setTipo(false) }} >Direcciones</button>
                    <button className={"aside-direccion " + (tipo ? "seleccionada" : "")} onClick={() => { setTipo(true) }}>Pedidos</button>
                </div>
            </aside>
            <main>
                {tipo ? <h2>Pedidos</h2> : <h2>Direcciones</h2>}
                <div className="contenido">
                    {tipo ? (
                        pedidos.length !== 0 ? (
                            pedidos.map((pedido, index) => (
                                <div key={index} className="pedido">
                                    {(pedido.destinatario.nombre == usuario.nombre) ?
                                        <>
                                            <h3>Destinatario: {pedido.destinatario.nombre} </h3>
                                            <h3>Remitente: {pedido.remitente.nombre}</h3>
                                        </>
                                        :
                                        <>
                                            <h3>Remitente: {pedido.remitente.nombre} </h3>
                                            <h3>Destinatario: {pedido.destinatario.nombre}</h3>
                                        </>
                                    }
                                    <p>{dimensiones.find(d => d.id === pedido.dimensiones)?.nombre} | {pedido.peso} KG</p>
                                    <p>Destino: {pedido.direccion_destinatario.calle} {pedido.direccion_destinatario.numero}</p>
                                    <p>{pedido.direccion_destinatario.codigoPostal} {pedido.direccion_destinatario.localidad}, {pedido.direccion_destinatario.provincia}</p>
                                    <button onClick={() => handlePedidoMirar(pedido.id)}>Ver detalles</button>
                                </div>
                            ))
                        ) : (
                            <div className="sin-pedidos">
                                <h3>No tienes pedidos</h3>
                            </div>
                        )
                    ) : (
                        <>

                            {nueva ? (
                                <>
                                    <button className="boton-nueva-direccion" onClick={() => { setNueva(false) }}>Añadir Direccion</button>
                                    {direcciones && direcciones.map((direccion, index) => (
                                        <div key={index} className="direccion" onClick={() => { }}>
                                            <h3>Direccion: {direccion.calle}, {direccion.numero}</h3>
                                            <p>Codigo Postal: {direccion.codigoPostal}</p>
                                            <p> {direccion.localidad} {direccion.provincia}, {direccion.pais}</p>
                                            {/*<button className="boton-eliminar" onClick={(e) => { eliminar(e, direccion) }}>Eliminar</button>*/}
                                        </div>
                                    ))}
                                </>)
                                :
                                (
                                    <>
                                        <button className="boton-nueva-direccion" onClick={() => { setNueva(true) }}>Ver Direcciones</button>
                                        <form className="sin-direcciones">
                                            <div className="pack">
                                                <label htmlFor="calle">Calle</label>
                                                <input type="text" id="calle" name="calle" onChange={(e) => { setNuevaDireccion({ ...nuevaDireccion, [e.target.name]: e.target.value }) }} />
                                            </div>
                                            <div className="pack">
                                                <label htmlFor="numero">Número</label>
                                                <input type="text" id="numero" name="numero" onChange={(e) => { setNuevaDireccion({ ...nuevaDireccion, [e.target.name]: e.target.value }) }} />
                                            </div>
                                            <div className="pack">
                                                <label htmlFor="codigoPostal">Código Postal</label>
                                                <input type="text" id="codigoPostal" name="codigoPostal" value={nuevaDireccion.codigoPostal} onChange={(e) => { setNuevaDireccion({ ...nuevaDireccion, [e.target.name]: e.target.value }), setCodigoPostal(e.target.value) }} />
                                            </div>
                                            <div className="pack">
                                                <label htmlFor="localidad">Localidad</label>
                                                <input type="text" id="localidad" name="localidad" value={nuevaDireccion.localidad} onChange={(e) => { setNuevaDireccion({ ...nuevaDireccion, [e.target.name]: e.target.value }) }} readOnly />
                                            </div>
                                            <div className="pack">
                                                <label htmlFor="provincia">Provincia</label>
                                                <input type="text" id="provincia" name="provincia" value={nuevaDireccion.provincia} onChange={(e) => { setNuevaDireccion({ ...nuevaDireccion, [e.target.name]: e.target.value }) }} readOnly />
                                            </div>

                                            <button onClick={(e) => submitDireccion(e)}>Añadir dirección</button>
                                        </form>
                                    </>
                                )
                            }
                        </>
                    )}
                </div>
            </main>
            <ToastContainer />
        </div>
    );
}
