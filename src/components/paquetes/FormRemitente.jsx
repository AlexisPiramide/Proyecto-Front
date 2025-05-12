import { useState } from "react";
import { comprobarUsuario } from "../../services/usuarios.services";
import { getDireccionesUsuario } from "../../services/direcciones.services";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./../../styles/toast.css";
import { ID_PATTERN } from "../../services/const.js";

export default function FormRemitente({ setRemitente, setDireccionesRemitente }) {
    const [idUsuario, setIdUsuario] = useState("");
    const [useId, setUseId] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRemitente(prev => ({ ...prev, [name]: value }));
    };

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
        });
    };

    const comprobarUsuarioExistente = async (id) => {
        const existe = await comprobarUsuario(id);
        if (existe) {
            const direccionesRemitente = await getDireccionesUsuario(id);
            if (direccionesRemitente.length > 0) {
                setDireccionesRemitente(direccionesRemitente);
                return true;
            } else {
                return false;
            }
        } else {
            console.log("Usuario no encontrado");
            mostrarError("Usuario no encontrado");
            return false;
        }
    };

    const handleInputChange = async (e) => {
        const value = e.target.value;
        const formattedValue = value
            .replace(/[^A-Za-z0-9]/g, "")
            .match(/.{1,4}/g)
            ?.join("-")
            .substring(0, 14) || "";

        setIdUsuario(formattedValue);

        const isValidFormat = ID_PATTERN.test(formattedValue);

        if (isValidFormat) {
            const usuarioValido = await comprobarUsuarioExistente(formattedValue);
            if (usuarioValido) {
                setRemitente(prev => ({ ...prev, id: formattedValue }));
            } else {
                setRemitente({});
            }
        } else {
            setRemitente({});
        }
    };

    const handleButtonClick = () => {
        setUseId(!useId);
        setRemitente({});
        setIdUsuario("");
    };

    return (
        <form className="form-remitente" onSubmit={(e) => e.preventDefault()}>
            <h2>Datos del remitente</h2>
            <button className="fixed-button" onClick={handleButtonClick}>
                {(useId) ? "Sin Usuario" : "Usuario Existente"}
            </button>

            {
                useId ?
                    <>
                        <label>ID Usuario</label>
                        <input  value={idUsuario}  onChange={handleInputChange} placeholder="XXXX-XXXX-XXXX"/>
                    </>
                    :
                    <>
                        <label>Nombre</label>
                        <input type="text" name="nombre" onChange={handleChange} required />

                        <label>Apellidos</label>
                        <input type="text" name="apellidos" onChange={handleChange} required />

                        <label>Correo Remitente</label>
                        <input type="email" name="correo" onChange={handleChange} required />

                        <label>Telefono</label>
                        <input type="text" name="telefono" onChange={handleChange} required />
                    </>
            }
        </form>
    );
}
