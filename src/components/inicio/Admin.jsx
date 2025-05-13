import { useState } from "react";
import "../../styles/admin.css"
export default function Admin() {
    const navigate = useNavigate();

    const direccionar = (ruta) =>{
        navigate(ruta);
    }

    return (
        <div className="div-admin">
            <div className="zona-crear" onClick={() => direccionar("/nuevo")}>
                <img></img>
                <h2>Crear Paquete</h2>
            </div>
            <div className="zona-escaner" onClick={() => direccionar("/escaner")}>
                <img></img>
                <h2>Escaner</h2>
            </div>
        </div>
    );
}