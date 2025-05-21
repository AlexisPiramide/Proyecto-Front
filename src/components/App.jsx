import { Outlet } from "react-router-dom";
import Nav from "./Nav";
import { useState, useEffect } from "react";
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useLocation } from "react-router-dom";

export default function App() {
	const [usuario, setUsuario] = useState();
	const navigate = useNavigate();
	const location = useLocation();

	
	useEffect(() => {
		cambiarAdmin();
	}, [usuario, location.pathname]);

	const cambiarAdmin = () => {
		if (location.pathname === "/") {
			if(usuario?.usuario?.sucursal) {
				navigate("/admin", { replace: true });
			}else{

			}

		}
	}

	return (
		<>
			<Nav usuario={usuario} setUsuario={setUsuario} />
			<Outlet context={[usuario, setUsuario]} />
		</>
	);
}
