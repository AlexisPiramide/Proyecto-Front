import { Outlet } from "react-router-dom";
import Nav from "./Nav";
import { useState,useEffect } from "react";
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useLocation } from "react-router-dom";
export default function App() {

	const [usuario, setUsuario] = useState();
	const navigate = useNavigate();
	const location = useLocation();

	useEffect(() => {
		if (location.pathname === "/" && isadmin()) {
			navigate("/admin", { replace: true });
		}
	}, [usuario, location.pathname]);

	const isadmin = () => {
		if (usuario && usuario.sucursal) {
			return true;
		} else {
			return false;
		}
	}

	return (
		<>
		<Nav usuario={usuario} setUsuario={setUsuario}/>
		<Outlet context={[usuario, setUsuario]}  />
		</>
	);
}