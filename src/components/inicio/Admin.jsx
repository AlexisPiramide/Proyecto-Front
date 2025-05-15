import "../../styles/admin.css"
import { useOutletContext } from "react-router-dom";
export default function Admin() {
    const [usuario, setUsuario] = useOutletContext();

    useEffect(() => {
        if (!usuario || !usuario.sucursal) {
            window.location.href = "/";
        }
    }, [usuario]);

    const navigate = useNavigate();

    const direccionar = (ruta) =>{
        navigate(ruta);
    }

    return (
        <div className="div-admin">
            <div className="zona-crear" onClick={() => direccionar("/nuevo")}>
                <img src="formulario.svg"></img>
                <h2>Crear Paquete</h2>
            </div>
            <div className="zona-escaner" onClick={() => direccionar("/escaner")}>
                <img src="escaner.svg"></img>
                <h2>Escaner</h2>
            </div>
        </div>
    );
}