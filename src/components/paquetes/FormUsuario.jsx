import { useState } from "react"
import { comprobarUsuario, comprobarDatos } from "../../services/usuarios.services"
import { getDireccionesUsuario } from "../../services/direcciones.services"
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import "./../../styles/toast.css"

import { MIN_NAME_LENGTH, ID_PATTERN, PATERN_CORREO } from "../../services/const";

export default function FormularioUsuario({ setDatosUsuario, setDirecciones, tipo }) {
    const [idUsuario, setIdUsuario] = useState("")
    const [usarId, setUsarId] = useState(false)
    const [isDestinatario, setIsDestinatario] = useState(tipo === "destinatario")
    const [mostrarBotonComprobar, setMostrarBotonComprobar] = useState(false)

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
        const updatedForm = { ...datosForm, [name]: value }

        setDatosForm(updatedForm)
        setDatosUsuario(prev => ({ ...prev, [name]: value }))

        const nombreValido = updatedForm.nombre.length > MIN_NAME_LENGTH
        const apellidosValido = updatedForm.apellidos.length > MIN_NAME_LENGTH
        const correoValido = updatedForm.correo && PATERN_CORREO.test(updatedForm.correo)
        const telefonoValido = updatedForm.telefono.length === 9

        if ((nombreValido && apellidosValido) && (correoValido || telefonoValido)) {
            setMostrarBotonComprobar(true)
        } else {
            setMostrarBotonComprobar(false)
        }
    }

    const usarUsuarioPorId = async (id) => {
        setIdUsuario(id)
        setDatosUsuario(prev => ({ ...prev, id }))
        return await comprobarUsuarioExistente(id)
    }

    const validacion = async () => {
        const nombreValido = datosForm.nombre.length > MIN_NAME_LENGTH
        const apellidosValido = datosForm.apellidos.length > MIN_NAME_LENGTH
        const correoValido = datosForm.correo && PATERN_CORREO.test(datosForm.correo)
        const telefonoValido = datosForm.telefono.length === 9

        if ((nombreValido && apellidosValido) && (correoValido || telefonoValido)) {
            const response = await comprobarDatos(datosForm)
            if (response && response.existe && response.existe.id) {
                mostrarResultado("Se ha encontrado un usuario que coincide", true)
                alternarUsoId()
                await usarUsuarioPorId(response.existe.id)
                return true
            } else {
                mostrarResultado("No se ha encontrado ninguna coincidencia", false)
                return false
            }
        }
    }

    const alternarUsoId = () => {
        setUsarId(prev => !prev)
        setDatosUsuario({})
        setIdUsuario("")
    }

    return (
        <form className={`form-${tipo}`} onSubmit={(e) => e.preventDefault()}>
            <h2>{isDestinatario ? "Destinatario" : "Remitente"}</h2>
            <button className="fixed-button" onClick={alternarUsoId}>
                {usarId ? "Sin Usuario" : "Usuario Existente"}
            </button>

            {mostrarBotonComprobar && (
                <button
                    type="button"
                    className="fixed-button-comprobar"
                    onClick={validacion}
                >
                    Comprobar Si Existe
                </button>
            )}

            {usarId ? (
                <div className="correo-hover-container">
                    <label>ID Usuario</label>
                    <input
                        value={idUsuario}
                        onChange={manejarCambioId}
                        placeholder="XXXX-XXXX-XXXX"
                    />
                    <p className="usuario-info">* Si ya tiene una cuenta creada</p>
                </div>
            ) : (
                <>
                    <label>Nombre*</label>
                    <input type="text" name="nombre" onChange={manejarCambio} required />

                    <label>Apellidos*</label>
                    <input type="text" name="apellidos" onChange={manejarCambio} required />

                    <div className="correo-hover-container">
                        <label>Correo*</label>
                        <input type="email" name="correo" onChange={manejarCambio} />
                        <p className="usuario-info"> Opcional </p>

                        <label>Teléfono</label>
                        <input type="text" name="telefono" onChange={manejarCambio} required />
                    </div>
                </>
            )}
        </form>
    )
}
