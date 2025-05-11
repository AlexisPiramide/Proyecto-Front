import { useState } from "react"
import { comprobarUsuario, comprobarDatos } from "../../services/usuarios.services"
import { getDireccionesUsuario } from "../../services/direcciones.services"
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import "./../../styles/toast.css"

import { MIN_NAME_LENGTH, ID_PATTERN } from "../../services/const";

export default function FormularioUsuario({ setDatosUsuario, setDirecciones, tipo }) {
    const [idUsuario, setIdUsuario] = useState("")
    const [usarId, setUsarId] = useState(false)
    const [isDestinatario, setIsDestinatario] = useState((tipo === "destinatario") ? true : false)

    const [datosForm, setDatosForm] = useState({
        nombre: "",
        apellidos: "",
        correo: "",
        telefono: "",
    });

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

    const mostrarResultado = (mensaje,estado) => {
        if (estado) {
            toast.success(mensaje, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                toastId: mensaje,
            })
        }else{
            toast.warning(mensaje, {
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
    }

    const comprobarUsuarioExistente = async (id) => {
        const existe = await comprobarUsuario(id)
        if (existe) {
            const direcciones = await getDireccionesUsuario(id)
            if (direcciones.length > 0) {
                setDirecciones(direcciones)
                return true
            } else {
                return false
            }
        } else {
            mostrarError("Usuario no encontrado")
            return false
        }
    }

    const manejarCambioId = async (e) => {
        const valor = e.target.value
        const valorFormateado = valor
            .replace(/[^A-Za-z0-9]/g, "")
            .match(/.{1,4}/g)
            ?.join("-")
            .substring(0, 14) || ""

        setIdUsuario(valorFormateado)

        const formatoValido = ID_PATTERN.test(valorFormateado)

        if (formatoValido) {
            const valido = await comprobarUsuarioExistente(valorFormateado)
            if (valido) {
                setDatosUsuario(prev => ({ ...prev, id: valorFormateado }))
            } else {
                setDatosUsuario({})
            }
        } else {
            setDatosUsuario({})
        }
    }

    const manejarCambio = (e) => {
        const { name, value } = e.target
        setDatosUsuario(prev => ({ ...prev, [name]: value }))
        setDatosForm(prev => ({ ...prev, [name]: value }))

        if (
            ((datosForm.nombre.length > MIN_NAME_LENGTH) && (datosForm.apellidos.length > MIN_NAME_LENGTH)) &&
            ((datosForm.correo && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(datosForm.correo)) || (datosForm.telefono.length === 9))
        ) {
            setMostrarBotonComprobar(true)
        } else {
            setMostrarBotonComprobar(false)
        }
    };

    const validacion = async () => {
        if (
            ((datosForm.nombre.length > MIN_NAME_LENGTH) && (datosForm.apellidos.length > MIN_NAME_LENGTH)) &&
            ((datosForm.correo && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(datosForm.correo)) || (datosForm.telefono.length === 9))
        ) {

            const response = await comprobarDatos(datosForm);

            if (response) {
                mostrarResultado("Se ha encontrado un usuario que coincide", true)
                alternarUsoId();
                setIdUsuario(response.id);
                if (existe) {
                    const direcciones = await getDireccionesUsuario(id)
                    if (direcciones.length > 0) {
                        setDirecciones(direcciones)
                        return true
                    } else {
                        return false
                    }
                } else {
                    mostrarResultado("No se ha encontrado niguna coincidencia", false)
                    return false
                }
            }

        }
    }

    const alternarUsoId = () => {
        setUsarId(!usarId)
        setDatosUsuario({})
        setIdUsuario("")
    }

    return (
        <form className={`form-${tipo}`} onSubmit={(e) => e.preventDefault()}>
            <h2>{(isDestinatario) ? "Destinatario" : "Remitente"}</h2>
            <button className="fixed-button" onClick={alternarUsoId}>{usarId ? "Sin Usuario" : "Usuario Existente"}</button>
            {mostrarBotonComprobar && (
                <button type="button" className="fixed-button-comprobar" onClick={() => validacion()}>Comprobar Si Existe</button>
            )}
            {usarId ? (
                <div className="correo-hover-container">
                    <label>ID Usuario</label>
                    <input value={idUsuario} onChange={manejarCambioId} placeholder="XXXX-XXXX-XXXX" />
                    <p className="usuario-info">* Si ya tiene una cuenta creada</p>
                </div>
            ) : (
                (isDestinatario) ? (
                    <>
                        <label>Nombre</label>
                        <input type="text" name="nombre" onChange={manejarCambio} required />
                        <label>Apellidos</label>
                        <input type="text" name="apellidos" onChange={manejarCambio} required />
                        <div className="correo-hover-container">
                            <label>Correo</label>
                            <input type="email" name="correo" onChange={manejarCambio} />
                            <p className="usuario-info"> O </p>
                            <label>Teléfono</label>
                            <input type="text" name="telefono" onChange={manejarCambio} required />
                        </div>
                    </>
                ) :
                    <>
                        <label>Nombre</label>
                        <input type="text" name="nombre" onChange={manejarCambio} required />
                        <label>Apellidos</label>
                        <input type="text" name="apellidos" onChange={manejarCambio} required />
                        <label>Correo</label>
                        <input type="email" name="correo" onChange={manejarCambio} required />
                        <label>Teléfono</label>
                        <input type="text" name="telefono" onChange={manejarCambio} required />
                    </>
            )}
        </form>
    )
}
