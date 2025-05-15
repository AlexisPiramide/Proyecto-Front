import { Link, useNavigate } from "react-router";
import "../styles/nav.css";

export default function Nav({usuario,setUsuario}) {
    
    const navigate = useNavigate();

    return (
        <nav>
            <img className="logo-nav" src="./logo.png" alt="Logo" onClick={() => navigate("/")}/> 
            
            <div className="nav-links">
                <Link to="/">Inicio</Link>
                {usuario && <button onClick={()=>setUsuario(null)}><img src="cerrarSesion.svg"></img></button>}
                {usuario && usuario.sucursal && <Link to="/admin">Inicio</Link>}
                {usuario && usuario.sucursal && <Link to="/escaner">Escaner</Link>}
                {usuario && usuario.sucursal && <Link to="/nuevo">Nuevo envio</Link>}
                {usuario && !usuario.sucursal && <Link to="/usuario">Inicio</Link>}
            </div>
        
            <div className="nav-user">
                <Link to="/usuario">Usuarios</Link>
            </div>
        </nav>
    );
}