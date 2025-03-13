import { useOutletContext } from "react-router"

export default function PerfilUsuario() {

    const [usuario,setUsuario] = useOutletContext();

    return (
        <div>
            <h1>Bienvenido de vuelta {usuario.nombre} {usuario.apellidos}</h1>
        </div>
    )
}