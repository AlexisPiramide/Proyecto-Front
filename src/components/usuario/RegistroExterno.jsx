import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { isExterno, registroExterno } from "../../services/usuarios.services";
import "./../../styles/registroexterno.css"
import { ToastContainer } from 'react-toastify';
export default function RegistroExterno() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [comprobacion, setComprobacion] = useState(undefined);
    const [contrasena, setContrasena] = useState("");
    const [repetirContrasena, setRepetirContrasena] = useState("");
    const [inputId, setInputId] = useState(id);

    useEffect(() => {
        comprobarRegistro();
    }, [id]);

    const comprobarRegistro = async () => {
        const result = await isExterno(id);

        if (result) {
            setComprobacion(true);
        } else {
            setComprobacion(false);
            mostrarError("El usuario no existe o ya se ha registrado, intentelo de nuevo");
        }
    }

    const handleRegistro = () => {
        if (!validarContrasena) {
            return;
        } else {
            const result = registrarUsuarioExterno();
            if (result) {
                navigate("/login");
            }else{
                mostrarError("Error al registrar el usuario");
            }
        }
    }

    const registrarUsuarioExterno = async () => {
        return await registroExterno(id, contrasena);
    }

    const validarContrasena = (contrasena,repetirContrasena) => {
        if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}/.test(contrasena)) {
            mostrarError("La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula y un carácter especial.");
            return false;
        }
        if (contrasena !== repetirContrasena) {
            mostrarError("Las contraseñas no coinciden.");
            return false
        }
        return true;
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
    }

    return (
        <>
            {comprobacion === undefined ? null : (
                comprobacion ?
                    <div className="registro-interno-formulario">
                        <h2>Registro Externo</h2>
                        <input type="password" placeholder="Contraseña" value={contrasena} onChange={(e) => setContrasena(e.target.value)} />
                        <input type="password" placeholder="Repetir Contraseña" value={repetirContrasena} onChange={(e) => setRepetirContrasena(e.target.value)} />
                        <button onClick={handleRegistro}>Registrar</button>
                        <ToastContainer />
                    </div>

                    :

                    <div className="registro-interno-error">
                        <h2> Este usuario no existe o ya esta registrado como un usuario regular</h2>
                        <p>Por favor, verifique el ID de registro o intente nuevamente.</p>
                        <button onClick={() => window.location.href = "/"}>Volver a la página de inicio</button>

                        <input type="text" placeholder="ID de registro" value={inputId} onChange={e => setInputId(e.target.value)} /><button onClick={() => navigate("/y&$1m9x41/registroExterno/" + id)}>Registrar nuevo usuario</button>

                        <p>Si ya tienes una cuenta, puedes iniciar sesión aquí:</p>
                        <button onClick={() => window.location.href = "/login"}>Iniciar sesión</button>
                    </div>

            )}
        </>
    );
};