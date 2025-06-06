import "../../styles/admin.css"
import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useOutletContext } from "react-router-dom";
export default function Admin() {
    const [usuario, setUsuario] = useOutletContext();

    useEffect(() => {
        if (!usuario || !usuario.usuario.sucursal) {
            window.location.href = "/";
        }
    }, [usuario]);

    const navigate = useNavigate();

    const direccionar = (ruta) =>{
        navigate(ruta);
    }

    return (
        <div className="div-admin">
            <div className="zona-crear" onClick={() => direccionar("/admin/nuevo")}>
                <img src="/formulario.svg"></img>
                <h2>Crear Paquete</h2>
            </div>
            <div className="zona-escaner" onClick={() => direccionar("/admin/escaner")}>
                <img src="/escaner.svg"></img>
                <h2>Escaner</h2>
            </div>
        </div>
    );
}