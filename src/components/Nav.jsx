import { useNavigate } from "react-router";
import { Link } from 'react-router-dom';
import "./../styles/navbar.css";
import { useEffect } from "react";
import { postTraking } from "../services/envios.services";

export default function Nav({ usuario, setUsuario }) {
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem("usuario");
        setUsuario(null);
    };

    useEffect(() => {
        if(!usuario) getLocalStorage();
    }, []);

    const getLocalStorage = () => {
        const stored = localStorage.getItem("usuario");
        if (!stored) return;

        try {
            const parsed = JSON.parse(stored);
            if (parsed?.usuario && !usuario) {
                setUsuario(parsed);
            }
        } catch (err) {
            console.error("Error parsing localStorage:", err);
        }
    };

    const navigateAdmin = () => {
        window.location.href = "https://sucursal.alexis.daw.cpifppiramide.com/";
    }

    const currentUser = usuario?.usuario;
    
    const envio = async() => {
        const usuario = localStorage.getItem("usuario").usuario.id;
        const { location, address, error } = useGeolocation();
        try {
            const result = await postTraking("rkOPRGhfGfO28dw", usuario, 1, address);
            console.log("Tracking enviado:", result);
        } catch (error) {
            console.error("Error al enviar el tracking:", error);
            alert("Error al enviar el tracking: " + error.message);
        }
       
        
    }

    return (
        <nav>
            <img className="logo-nav" src="/logo.png" alt="Logo" onClick={() => navigate("/")} />

            <div className="nav-links">
                {currentUser?.sucursal ? <Link to="/admin">Inicio</Link> : <Link to="/">Inicio</Link>}
                {currentUser?.sucursal && <Link className="no_movil" to="/admin/escaner">Escaner</Link>}
                {currentUser?.sucursal && <Link className="no_movil" to="/admin/nuevo">Nuevo envio</Link>}
                {currentUser?.sucursal &&  <button className="no_movil" onClick={navigateAdmin}>Administración</button>}

                <button onClick={() => envio()}>Test Envio</button>
            </div>

            <div className="nav-user">
                {!currentUser ? (
                    <Link to="/usuario">Usuarios</Link>
                ) : !currentUser?.sucursal ? (
                    <Link to="/usuario">{currentUser?.nombre}, {currentUser?.apellidos}</Link>
                ) : (
                    <h2>{currentUser?.nombre}, {currentUser?.apellidos}</h2>
                )}

                {currentUser && (
                    <button onClick={logout} aria-label="Cerrar sesión">
                        <img src="/cerrarSesion.svg" alt="Cerrar sesión" />
                    </button>
                )}
            </div>
        </nav>
    );
}
