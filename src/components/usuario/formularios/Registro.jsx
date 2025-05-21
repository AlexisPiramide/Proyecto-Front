import { useState } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import InputFormulario from "./InputFormulario";
import "./../../../styles/toast.css"
import { registro } from "../../../services/usuarios.services";
import { useNavigate } from "react-router";
export default function Registro({setUsuario}) {
    const navigate= useNavigate();
    const [next, setNext] = useState(0);
    const [datosFormulario, setDatosFormulario] = useState({
        nombre: "",
        apellidos: "",
        correo: "",
        telefono: "",
        password: "",
        password2: ""
    });
    const [errores, setErrores] = useState({});

    const handleInputChange = (e) => {
        setDatosFormulario({
            ...datosFormulario,
            [e.target.name]: e.target.value
        });
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

    const validarPaso = () => {
        let erroresTemp = {};
        
        if (next === 0) {
            if (!datosFormulario.nombre.trim()) {
                erroresTemp.nombre = "El nombre es obligatorio.";
                mostrarError(erroresTemp.nombre);
            }
            if (!datosFormulario.apellidos.trim()) {
                erroresTemp.apellidos = "Los apellidos son obligatorios.";
                mostrarError(erroresTemp.apellidos);
            }
        }

        if (next === 1) {
            if (!/\S+@\S+\.\S+/.test(datosFormulario.correo)) {
                erroresTemp.correo = "Correo no válido.";
                mostrarError(erroresTemp.correo);
            }
            if (!/^\d{9,15}$/.test(datosFormulario.telefono)) {
                erroresTemp.telefono = "Número de teléfono inválido.";
                mostrarError(erroresTemp.telefono);
            }
        }

        if (next === 2) {
            if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}/.test(datosFormulario.password)) {
                erroresTemp.password = "La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula y un carácter especial.";
                mostrarError(erroresTemp.password);
            }
            if (datosFormulario.password !== datosFormulario.password2) {
                erroresTemp.password2 = "Las contraseñas no coinciden.";
                mostrarError(erroresTemp.password2);
            }
        }

        setErrores(erroresTemp);
        return Object.keys(erroresTemp).length === 0;
    };

    const handleNext = () => {
        if (validarPaso()) setNext(next + 1);
    };

    const submitRegistro =async (e) => {
        e.preventDefault(); 
        if (validarPaso()) { 
            try {
                const result = await registro(datosFormulario);
                setUsuario(result);
                localStorage.setItem("usuario", JSON.stringify(result));
                navigate("/");
            } catch (error) {
                console.error("Error en el login:", error);
                if (error?.response?.data?.mensaje) {
                    mostrarError(error.response.data.mensaje);
                } else {
                    mostrarError("Error al registrarse. Por favor, inténtalo de nuevo.");
                }
            
            }

        } 
    };

    return (
        <form className="registro">
           
            <h2>Registro: </h2>
            
            {next === 0 && (
                <div className="form-</div>usuario-div">
                    <InputFormulario type="text" name="nombre" value={datosFormulario.nombre} onChange={handleInputChange} />
                    <InputFormulario type="text" name="apellidos" value={datosFormulario.apellidos} onChange={handleInputChange} />
                </div>
            )}

            {next === 1 && (
                <div className="form-usuario-data">
                    <InputFormulario type="email" name="correo" value={datosFormulario.correo} onChange={handleInputChange} />
                    <InputFormulario type="text" name="telefono" value={datosFormulario.telefono} onChange={handleInputChange} />
                </div>
            )}

            {next === 2 && (
                <div className="form-usuario-registro-contraseñas">
                    <InputFormulario type="password" name="password"  value={datosFormulario.password} onChange={handleInputChange} />
                    <InputFormulario type="password" name="password2"  value={datosFormulario.password2} onChange={handleInputChange} />
                </div>
            )}
            <div className="botones">
                {(next !== 0)?<button type="button" className="eightbit-btn eightbit-btn--proceed" onClick={() => setNext(next - 1)}><img src="./volver-light.svg" /></button>:<button className="eightbit-btn eightbit-btn--reset" disabled><img src="./volver-light.svg" /></button>}
                {(next !== 2)?<button type="button" className="eightbit-btn eightbit-btn--proceed" onClick={handleNext}><img src="./segir-light.svg"/></button>:<button className="eightbit-btn eightbit-btn--reset" disabled><img src="./segir-light.svg" /></button>}
            </div>
            {next === 2 && <button type="submit" className="eightbit-btn" onClick={(e)=>submitRegistro(e)}>Registrarse</button>}
           
        </form>
    );
}
