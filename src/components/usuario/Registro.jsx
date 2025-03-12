import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

export default function Registro() {
    const [next, setNext] = useState(0);
    const [datosFormulario, setDatosFormulario] = useState({
        nombre: "",
        apellidos: "",
        email: "",
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
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
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
            if (!/\S+@\S+\.\S+/.test(datosFormulario.email)) {
                erroresTemp.email = "Correo no válido.";
                mostrarError(erroresTemp.email);
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

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validarPaso()) {
            console.log("Form submitted successfully");
        } else {
            console.log("Form has errors");
        }
    };

    return (
        <form className="registro" onSubmit={handleSubmit}>
            <h2>Registro: </h2>
            
            {next === 0 && (
                <div className="form-usuario-div">
                    <label htmlFor="nombre">Nombre:</label>
                    <input onChange={handleInputChange} type="text" id="nombre" name="nombre" value={datosFormulario.nombre} />

                    <label htmlFor="apellidos">Apellidos:</label>
                    <input onChange={handleInputChange} type="text" id="apellidos" name="apellidos" value={datosFormulario.apellidos} />
                </div>
            )}

            {next === 1 && (
                <div className="form-usuario-data">
                    <label htmlFor="email">Email:</label>
                    <input onChange={handleInputChange} type="email" id="email" name="email" value={datosFormulario.email} />

                    <label htmlFor="telefono">Teléfono:</label>
                    <input onChange={handleInputChange} type="tel" id="telefono" name="telefono" value={datosFormulario.telefono} />
                </div>
            )}

            {next === 2 && (
                <div className="form-usuario-registro-contraseñas">
                    <label htmlFor="password">Contraseña:</label>
                    <input onChange={handleInputChange} type="password" id="password" name="password" value={datosFormulario.password} />

                    <label htmlFor="password2">Repite la contraseña:</label>
                    <input onChange={handleInputChange} type="password" id="password2" name="password2" value={datosFormulario.password2} />
                </div>
            )}
            <div>
                {next !== 0 && <button type="button" onClick={() => setNext(next - 1)}>Atrás</button>}
                {next !== 2 && <button type="button" onClick={handleNext}>Siguiente</button>}
            </div>
            {next === 2 && <button type="submit" onClick={handleSubmit}>Registrarse</button>}
           

            <ToastContainer />
        </form>
    );
}
