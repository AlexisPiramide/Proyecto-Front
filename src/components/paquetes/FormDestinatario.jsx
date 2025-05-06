import { useState } from "react";
import { comprobarUsuario } from "../../services/usuarios.services";
import { getDireccionesUsuario } from "../../services/direcciones.services";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import "./../../styles/toast.css"
export default function FormDestinatario({ setDestinatario, setDireccionesDestinatario }) {
    const [idUsuario, setIdUsuario] = useState("");
    const [useId, setUseId] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDestinatario(prev => ({ ...prev, [name]: value }));
    };

    const comprobarUsuarioExistente = async (id) => {
        const existe = await comprobarUsuario(id);
        if (existe) {
            const direccionesDestinatario = await getDireccionesUsuario(id);
            if (direccionesDestinatario.length > 0) {
                setDireccionesDestinatario(direccionesDestinatario);
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

        // Comprobamos solo si el ID tiene el formato 'XXXX-XXXX-XXXX'
        const isValidFormat = /^[A-Za-z0-9]{4}-[A-Za-z0-9]{4}-[A-Za-z0-9]{4}$/.test(formattedValue);

        if (isValidFormat) {
            const usuarioValido = await comprobarUsuarioExistente(formattedValue);
            if (usuarioValido) {
                setDestinatario(prev => ({ ...prev, id: formattedValue }));
            } else {
                setDestinatario({});

            }
        } else {
            setDestinatario({});
        }
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
    

    const handleButtonClick = () => {
        setUseId(!useId);
        setDestinatario({});
        setIdUsuario("");
    };

    return (
        <form className="form-destinatario" onSubmit={(e) => e.preventDefault()}>
            <h2>Datos del destinatario</h2>
            <button className="fixed-button" onClick={handleButtonClick}>
                {(useId) ? "Sin Usuario" : "Usuario Existente"}
            </button>
            {
                useId ?
                    <div className="correo-hover-container">
                        <label>ID Usuario</label>
                        <input
                            value={idUsuario}
                            onChange={handleInputChange}
                            placeholder="XXXX-XXXX-XXXX"
                        />
                        <p className="usuario-info">* Si ya tiene una cuenta creada</p>
                    </div> :
                    <>
                        <label>Nombre</label>
                        <input type="text" name="nombre" onChange={handleChange} required />
                        
                        <label>Apellidos</label>
                        <input type="text" name="apellidos" onChange={handleChange} required />
        
                        <div className="correo-hover-container">
                            <label>Correo Destinatario*</label>
                            <input type="email" name="correo" onChange={handleChange} />
                            <p className="correo-info">* Solo si desea notificar al destinatario del envio</p>
                        </div>
                    </>
            }
        </form>
    );
}
