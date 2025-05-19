import { useNavigate } from "react-router";
import { Link } from 'react-router-dom';

import "./../styles/navbar.css";
import { useEffect } from "react";

export default function Nav({ usuario, setUsuario }) {

    const logout = () => {
        localStorage.removeItem("usuario");
        setUsuario(null);
    }

    useEffect(() => {
        getLocalStorage();
    }, []);

    const getLocalStorage = () => {
        const usuariolocal = JSON.parse(localStorage.getItem("usuario"));
        if (usuariolocal && !usuario) {
            setUsuario(usuariolocal);
        }
    };

    const navigate = useNavigate();

    return (
        <nav>
            <img className="logo-nav" src="./logo.png" alt="Logo" onClick={() => navigate("/")} />

            <div className="nav-links">
                {usuario?.sucursal ? <Link  to="/admin">Inicio</Link> : <Link to="/">Inicio</Link>}
                {usuario?.sucursal && <Link className="no_movil" to="/admin/escaner">Escaner</Link>}
                {usuario?.sucursal && <Link className="no_movil" to="/admin/nuevo">Nuevo envio</Link>}
            </div>

            <div className="nav-user">
                {console.log(usuario)}
                {!usuario ? <Link to="/usuario">Usuarios</Link> : <h2 className="no_movil">{usuario?.nombre},{usuario?.apellidos}</h2>}
                {usuario && <button onClick={logout} aria-label="Cerrar sesión"><img src="cerrarSesion.svg" alt="Cerrar sesión" /></button>}
            </div>

        </nav>
    );
}
