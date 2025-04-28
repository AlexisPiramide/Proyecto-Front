import React, { useState } from 'react';
import InputFormulario from "./InputFormulario";
import { toast } from 'react-toastify';
import "./../../../styles/toast.css"
import 'react-toastify/dist/ReactToastify.css';
import { login } from '../../../services/usuarios.services';
export default function Login({setUsuario}) {

    const [datosFormulario, setDatosFormulario] = useState({
        correo: "",
        password: ""
    });

    const handleInputChange = (e) => {
        setDatosFormulario({
            ...datosFormulario,
            [e.target.name]: e.target.value
        });
    };

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

    const validarPaso = () => {
        let erroresTemp = {};
        let esValido = true;
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(datosFormulario.correo)) {
            erroresTemp.correo = "Correo no válido.";
            esValido = false;
        }

        if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}/.test(datosFormulario.password)) {
            erroresTemp.password = "La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula y un carácter especial.";
            esValido = false;
        }

        Object.values(erroresTemp).forEach(mostrarError);

        return esValido;
    };

    const submitLogin = async (e) => {
        e.preventDefault(); 
        if (validarPaso()) { 
            const result = await login(datosFormulario.correo, datosFormulario.password);
            setUsuario(result);
            localStorage.setItem("usuario", JSON.stringify(result));
        } 
    }

    return (
        <form className="login" onSubmit={(e) =>submitLogin(e)}>
            <h2>Login: </h2>

            <div className="form-usuario-data">
                <InputFormulario type="correo" name="correo" value={datosFormulario.correo} onChange={handleInputChange} />
                <InputFormulario type="password" name="password" value={datosFormulario.password} onChange={handleInputChange} />
            </div>
            <button type="submit"  className="eightbit-btn" onSubmit={(e) =>submitLogin(e)}>Iniciar Sesión</button>
        </form>
    );
}
