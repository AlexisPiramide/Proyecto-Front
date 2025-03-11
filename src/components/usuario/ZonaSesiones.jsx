import { useOutletContext } from "react-router";
import Login from "./Login";
import Registro from "./Registro";
import PerfilUsuario from "./PerfilUsuario";
import "./../../styles/usuario.css"
import { useState } from "react";
export default function ZonaSesiones() {

    const [usuario,setUsuario] = useOutletContext();
    const [tipo,setTipo] = useState(false);

    return (
        <div className="zona-sesiones">
            {usuario ? <PerfilUsuario /> : (tipo ? <Registro /> : <Login />)}
            <button onClick={()=>setTipo(!tipo)}>{tipo?"Cambiar al Login":"Cambiar al registro"}</button>
        </div>
    )


}