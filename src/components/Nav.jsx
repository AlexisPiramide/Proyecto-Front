import { Link, useNavigate } from "react-router";
import "../styles/Nav.css";

export default function Nav({usuario,setUsuario}) {
    const navigate = useNavigate();
    
    return (
        <nav>
            <img className="logo-nav"src="./logo.png" alt="Logo" onClick={() => navigate("/")}/> 
            
            <div className="nav-links">
               
                <Link to="/">Home</Link>
                <Link to="/escaner">Escaner sin validacion usuario</Link>
                {usuario && usuario.sucursal && <Link to="/escaner">Escaner con validacion usuario</Link>}
                <Link to="/nuevo">Nuevo envio</Link>
            </div>

            <div className="nav-user">
                <Link to="/usuario">Usuarios</Link>
            </div>
        </nav>
    );
}