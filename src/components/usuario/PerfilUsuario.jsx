import { useEffect, useState } from "react";
import { useOutletContext } from "react-router";
import { getDireccionesUsuario, postDireccion, obtenerLocalidadProvincia, eliminarDireccion } from "../../services/direcciones.services";
import { modificarUsuario } from "../../services/usuarios.services";
import { getPaquete, getPaquetesUsuario } from "../../services/paquetes.services";
import { ToastContainer, toast } from "react-toastify";
import { getDimensiones } from "../../services/dimensiones.services";
import "./../../styles/perfil.css";
import { useNavigate } from "react-router-dom";

export default function PerfilUsuario() {
    const navigate = useNavigate();
    const [usuario, setUsuario] = useOutletContext();
    const [direcciones, setDirecciones] = useState([]);
    const [pedidos, setPedidos] = useState([]);
    const [dimensiones, setDimensiones] = useState([]);
    const [codigoPostal, setCodigoPostal] = useState("");
    const [nuevaDireccion, setNuevaDireccion] = useState({ calle: "", numero: "", codigoPostal: "", localidad: "", provincia: "", pais: "España", es_temporal: false });
    const [nueva, setNueva] = useState(true);
    const [historialPaquetes, setHistorialPaquetes] = useState([]);
    const [vistaSeleccionada, setVistaSeleccionada] = useState("direcciones");

    const [formInfo, setFormInfo] = useState({ nombre: "", apellidos: "", password: "", confirmPassword: "", telefono: "" });

    useEffect(() => {
        fetchPedidos();
        fetchDirecciones();
        fetchDimensiones();
        const historial = JSON.parse(localStorage.getItem("historial"));
        if (historial) setHistorialPaquetes(historial);
    }, []);

    const fetchDimensiones = async () => {
        const data = await getDimensiones(usuario.usuario.id);
        setDimensiones(data);
    };

    const fetchPedidos = async () => {
        const data = await getPaquetesUsuario(usuario.usuario.id);
        setPedidos(data);
    };

    const fetchDirecciones = async () => {
        const data = await getDireccionesUsuario(usuario.usuario.id);
        setDirecciones(data);
    };

    useEffect(() => {
        if (codigoPostal.length === 5) {
            obtenerLocalidadProvincia(codigoPostal).then((resultado) => {
                if (resultado) {
                    setNuevaDireccion({ ...nuevaDireccion, localidad: resultado.localidad, provincia: resultado.provincia });
                }
            });
        }
    }, [codigoPostal]);

    useEffect(() => {
        const isMobile = window.innerWidth <= 768; // Puedes ajustar el ancho según el diseño
        if (isMobile) {
            setVistaSeleccionada("paquetes");
        }
    }, []);

    const [esMovil, setEsMovil] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setEsMovil(window.innerWidth <= 768);
        };
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);



    const mostrarError = (mensaje) => {
        toast.error(mensaje, { position: "top-right", autoClose: 3000, hideProgressBar: true, closeOnClick: true, pauseOnHover: true, draggable: true, toastId: mensaje });
    };

    const mostrarResultado = (mensaje, estado) => {
        const tipoToast = estado ? toast.success : toast.warning;
        tipoToast(mensaje, { position: "top-right", autoClose: 3000, hideProgressBar: true, closeOnClick: true, pauseOnHover: true, draggable: true, toastId: mensaje });
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
    };

    const eliminar = async (e, direccion) => {
        e.preventDefault();
        try {
            const result = await eliminarDireccion(direccion.id);
            if (result) {
                const direccionesActualizadas = await getDireccionesUsuario(usuario.usuario.id);
                setDirecciones(direccionesActualizadas);
                mostrarResultado("Dirección eliminada", true);
            }
        } catch (error) {
            mostrarError("Error al eliminar la dirección");
        }
    };

    const handlePedidoMirar = async (pedidoId) => {
        const paquete = await getPaquete(pedidoId);
        if (paquete) {
            const historialActualizado = [...historialPaquetes, paquete.id];
            setHistorialPaquetes(historialActualizado);
            localStorage.setItem("historial", JSON.stringify(historialActualizado));
            navigate('/envio', { state: { paquete: paquete } });
        } else {
            mostrarError("Error al obtener el paquete");
        }
    };

    const telefonoFormateado = (telefono) => {
        if (telefono) {
            const telefonoSinEspacios = telefono.replace(/\s+/g, '');
            return telefonoSinEspacios.replace(/(\d{3})(\d{2})(\d{2})(\d{2})/, '$1 $2 $3 $4');
        } else {
            return 'XXX-XX-XX-XX';
        }
    };

    const handleInfoChange = (e) => {
        setFormInfo({ ...formInfo, [e.target.name]: e.target.value });
    };

    const validarInformacion = () => {
        const trimmedInfo = {
            nombre: formInfo.nombre.trim(),
            apellidos: formInfo.apellidos.trim(),
            telefono: formInfo.telefono.trim(),
            password: formInfo.password.trim(),
        };

        const isChanged =
            (trimmedInfo.nombre && trimmedInfo.nombre !== usuario.usuario.nombre) ||
            (trimmedInfo.apellidos && trimmedInfo.apellidos !== usuario.usuario.apellidos) ||
            (trimmedInfo.telefono && trimmedInfo.telefono !== usuario.usuario.telefono) ||
            (trimmedInfo.password);

        if (!isChanged) {
            mostrarError("Debe modificar al menos un campo antes de guardar.");
            return false;
        }

        if (trimmedInfo.nombre && trimmedInfo.nombre.length < 2) {
            mostrarError("El nombre es demasiado corto");
            return false;
        }

        if (trimmedInfo.apellidos && trimmedInfo.apellidos.length < 2) {
            mostrarError("Los apellidos son demasiado cortos");
            return false;
        }

        if (trimmedInfo.telefono && !/^\d{9,15}$/.test(trimmedInfo.telefono)) {
            mostrarError("Número de teléfono inválido");
            return false;
        }

        if (trimmedInfo.password) {
            if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}/.test(trimmedInfo.password)) {
                mostrarError("La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula y un carácter especial.");
                return false;
            }
            if (formInfo.password !== formInfo.confirmPassword) {
                mostrarError("Las contraseñas no coinciden");
                return false;
            }
        }

        return true;
    };



    const handleGuardarCambios = async (e) => {
        e.preventDefault();

        if (validarInformacion()) {

            const result = await modificarUsuario(formInfo);
            if (!result) {
                mostrarError("Error al guardar los cambios");
                return;
            }
            else {
                mostrarResultado("Cambios guardados correctamente", true);
                setUsuario(result);
                localStorage.setItem("usuario", JSON.stringify(result));
                navigate("/usuario");
            }

        }
    };

    return (
        <div className="perfil-usuario">
            <aside>
                <div className="aside-contenido">
                    <img src="/avatar.png" />
                    <h1>{usuario.usuario.nombre} {usuario.usuario.apellidos}</h1>
                    <p>{usuario.usuario.correo}</p>
                    <p>+34 {telefonoFormateado(usuario.usuario.telefono)}</p>
                </div>
                {!esMovil && (
                    <div className="botones-aside">
                        <button className={"aside-direccion " + (vistaSeleccionada === "direcciones" ? "seleccionada" : "")} onClick={() => setVistaSeleccionada("direcciones")}>Direcciones</button>
                        <button className={"aside-direccion " + (vistaSeleccionada === "paquetes" ? "seleccionada" : "")} onClick={() => setVistaSeleccionada("paquetes")}>Paquetes</button>
                        <button className={"aside-direccion " + (vistaSeleccionada === "informacion" ? "seleccionada" : "")} onClick={() => setVistaSeleccionada("informacion")}>Cambiar información</button>
                    </div>
                )}
            </aside>
            <main>
                {vistaSeleccionada === "direcciones" && (
                    <>
                        <h2>Direcciones</h2>
                        <div className="contenido">
                            {nueva ? (
                                <>
                                    <button className="boton-nueva-direccion" onClick={() => setNueva(false)}>Añadir Direccion</button>
                                    {direcciones.map((direccion, index) => (
                                        <div key={index} className="direccion">
                                            <h3>Dirección: {direccion.calle}, {direccion.numero}</h3>
                                            <p>Código Postal: {direccion.codigoPostal}</p>
                                            <p>{direccion.localidad} {direccion.provincia}, {direccion.pais}</p>
                                            <button onClick={(e) => eliminar(e, direccion)}>Eliminar</button>
                                        </div>
                                    ))}
                                </>
                            ) : (
                                <>
                                    <button className="boton-nueva-direccion" onClick={() => setNueva(true)}>Ver Direcciones</button>
                                    <form className="sin-direcciones">
                                        <div className="pack"><label htmlFor="calle">Calle</label><input type="text" id="calle" name="calle" onChange={(e) => setNuevaDireccion({ ...nuevaDireccion, [e.target.name]: e.target.value })} /></div>
                                        <div className="pack"><label htmlFor="numero">Número</label><input type="text" id="numero" name="numero" onChange={(e) => setNuevaDireccion({ ...nuevaDireccion, [e.target.name]: e.target.value })} /></div>
                                        <div className="pack"><label htmlFor="codigoPostal">Código Postal</label><input type="text" id="codigoPostal" name="codigoPostal" value={nuevaDireccion.codigoPostal} onChange={(e) => { setNuevaDireccion({ ...nuevaDireccion, [e.target.name]: e.target.value }); setCodigoPostal(e.target.value); }} /></div>
                                        <div className="pack"><label htmlFor="localidad">Localidad</label><input type="text" id="localidad" name="localidad" value={nuevaDireccion.localidad} readOnly /></div>
                                        <div className="pack"><label htmlFor="provincia">Provincia</label><input type="text" id="provincia" name="provincia" value={nuevaDireccion.provincia} readOnly /></div>
                                        <button onClick={(e) => submitDireccion(e)}>Añadir dirección</button>
                                    </form>
                                </>
                            )}
                        </div>
                    </>
                )}
                {vistaSeleccionada === "paquetes" && (
                    <>
                        <h2>Paquetes</h2>
                        <div className="contenido">
                            {pedidos.length > 0 ? (
                                pedidos.map((pedido, index) => (
                                    <div key={index} className="pedido">
                                        {(pedido.destinatario.nombre === usuario.nombre) ? (
                                            <>
                                                <h3>Destinatario: {pedido.destinatario.nombre}</h3>
                                                <h3>Remitente: {pedido.remitente.nombre}</h3>
                                            </>
                                        ) : (
                                            <>
                                                <h3>Remitente: {pedido.remitente.nombre}</h3>
                                                <h3>Destinatario: {pedido.destinatario.nombre}</h3>
                                            </>
                                        )}
                                        <p>{dimensiones.find(d => d.id === pedido.dimensiones)?.nombre} | {pedido.peso} KG</p>
                                        <p>Destino: {pedido.direccion_destinatario.calle} {pedido.direccion_destinatario.numero}</p>
                                        <p>{pedido.direccion_destinatario.codigoPostal} {pedido.direccion_destinatario.localidad}, {pedido.direccion_destinatario.provincia}</p>
                                        <button onClick={() => handlePedidoMirar(pedido.id)}>Ver detalles</button>
                                    </div>
                                ))
                            ) : (
                                <div className="sin-pedidos"><h3>No tienes ningun paquete</h3></div>
                            )}
                        </div>
                    </>
                )}
                {vistaSeleccionada === "informacion" && (
                    <>
                        <form className="formulario-informacion">
                            <div className="pack -datos">
                                <h2>Cambiar Datos</h2>
                                <label htmlFor="nombre">Nuevo Nombre</label><input type="text" id="nombre" name="nombre" placeholder="Nuevo nombre" value={formInfo.nombre} onChange={handleInfoChange} />
                                <label htmlFor="apellidos">Nuevos Apellidos</label><input type="text" id="apellidos" name="apellidos" placeholder="Nuevos apellidos" value={formInfo.apellidos} onChange={handleInfoChange} />
                            </div>
                            <div className="pack contraseña">
                                <h2>Cambiar Contraseña</h2>
                                <label htmlFor="password">Nueva Contraseña</label><input type="password" id="password" name="password" placeholder="Nueva contraseña" value={formInfo.password} onChange={handleInfoChange} />
                                <label htmlFor="confirmPassword">Confirmar Contraseña</label><input type="password" id="confirmPassword" name="confirmPassword" placeholder="Confirmar contraseña" value={formInfo.confirmPassword} onChange={handleInfoChange} />
                            </div>
                            <div className="pack telefono">
                                <h2>Cambiar Telefono</h2>
                                <label htmlFor="telefono">Nuevo Teléfono</label><input type="text" id="telefono" name="telefono" placeholder="Nuevo teléfono" value={formInfo.telefono} onChange={handleInfoChange} />
                            </div>
                        </form>
                        <button className="submit-button" type="submit" onClick={handleGuardarCambios}>Guardar Cambios</button>
                    </>
                )}
            </main>
            <ToastContainer />
        </div>
    )
}
