import { Link, useNavigate } from "react-router";
import "../styles/Nav.css";

export default function Nav({usuario,setUsuario}) {
    const navigate = useNavigate();
    
    return (
        <nav>
            <img className="logo-nav"src="./vite.svg" alt="Logo" onClick={() => navigate("/")}/> 
            
            <div className="nav-links">
               
                <Link to="/">Home</Link>
                <Link to="/escaner">Home</Link>
                <Link to="/">Home</Link>
                <Link to="/">Home</Link>
                <Link to="/">Home</Link>
            </div>

            <div className="nav-user">
                <Link to="/usuario">Usuarios</Link>
            </div>
        </nav>
    );
}