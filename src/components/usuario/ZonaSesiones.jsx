import { useOutletContext } from "react-router";
import Login from "./Login";
import Registro from "./Registro";
import PerfilUsuario from "./PerfilUsuario";
import "./../../styles/zonausuarios.css"
import { useState } from "react";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
export default function ZonaSesiones() {

    const [usuario,setUsuario] = useOutletContext();
    const [tipo,setTipo] = useState(false);

    return (
        <>
        {!usuario ?
            <div className="zona-sesiones">
                <div className="div-formulario">
                    <div className="embellezedor"><img src="./public/cerrar.svg"/><img src="./public/minimizar.svg"/></div>
                {usuario ? "" : (tipo ? <Registro /> : <Login />)}
                </div>
                <div className="diseño-embellecimiento">
                    <img src="./delivery.jpg" alt="Logo"/>
                    <div className="texto">
                        {(tipo) ? <h2>¿Ya tienes cuenta? Inicia Sesion</h2> : <h2>¿No tienes cuenta? Registrate Aqui</h2>}
                        <button className="eightbit-btn" onClick={()=>setTipo(!tipo)}>{tipo?"Cambiar al Login":"Cambiar al registro"}</button>
                    </div>
                
                </div>
                <ToastContainer />
            </div>:<PerfilUsuario usuario={usuario} setUsuario={setUsuario}/>
            }
        </>
    )

}