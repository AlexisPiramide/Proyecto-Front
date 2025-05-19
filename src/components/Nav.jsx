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

    const setUsuarioLocalStorage = () => {

        const usuario = {
  "id": "Q7XZ-3B9L-PD4K",
  "nombre": "Alexis",
  "apellidos": "Torres Climente",
  "correo": "220240@fppiramide.com",
  "contraseña": "$2a$12$DoopKGMWaCdGrXB1CMX5iOIXAqvb3pLPMbw4jI3HeT58H2vV2eCsu",
  "telefono": "639040769",
  "puesto": "Gerente",
  "sucursal": {
    "id": 1,
    "nombre": "CPIFP Piramide",
    "id_direccion": 1,
    "telefono": "666666666",
    "direccion": {
      "id": 1,
      "calle": "Carretera de Cuarte",
      "numero": "0",
      "codigo_postal": "22071",
      "localidad": "Huesca",
      "provincia": "Huesca",
      "pais": "España",
      "es_temporal": false
    }
  },
  "es_externo": false,
  "es_admin": true
}
        localStorage.setItem("usuario", JSON.stringify(usuario));
    }

    const navigate = useNavigate();

    return (
        <nav>
            <img className="logo-nav" src="./logo.png" alt="Logo" onClick={() => navigate("/")} />

            <div className="nav-links">
                {usuario?.sucursal ? <Link  to="/admin">Inicio</Link> : <Link to="/">Inicio</Link>}
                {usuario?.sucursal && <Link className="no_movil" to="/admin/escaner">Escaner</Link>}
                {usuario?.sucursal && <Link className="no_movil" to="/admin/nuevo">Nuevo envio</Link>}
                {!usuario?.sucursal && <Link className="no_movil" to="/escaner">Escaner pruebas</Link>}
                
            </div>
            <button className="usuario-pruebas" onClick={() => setUsuarioLocalStorage()}>Usuario Pruebas</button>
            <div className="nav-user">
                {!usuario ? <Link to="/usuario">Usuarios</Link> : <h2>{usuario?.nombre},{usuario?.apellidos}</h2>}
                {usuario && <button onClick={logout} aria-label="Cerrar sesión"><img src="cerrarSesion.svg" alt="Cerrar sesión" /></button>}
            </div>

        </nav>
    );
}
