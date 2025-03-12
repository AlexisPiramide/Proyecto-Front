import { useOutletContext } from "react-router";
import Login from "./Login";
import Registro from "./Registro";
import PerfilUsuario from "./PerfilUsuario";
import "./../../styles/nuevo.css"
import { useState } from "react";
export default function ZonaSesiones() {

    const [usuario,setUsuario] = useOutletContext();
    const [tipo,setTipo] = useState(false);

    return (
        <div className="zona-sesiones">
            {usuario ? <PerfilUsuario /> : (tipo ? <Registro /> : <Login />)}
            <div className="diseño-embellecimiento">
                <img src="./delivery.jpg" alt="Logo"/>
                <div className="texto">
                    {(tipo) ? <h2>¿Ya tienes cuenta? Inicia Sesion</h2> : <h2>¿No tienes cuenta? Registrate Aqui</h2>}
                    <button onClick={()=>setTipo(!tipo)}>{tipo?"Cambiar al Login":"Cambiar al registro"}</button>
                </div>
             
            </div>
        </div>
    )


}