import { Outlet } from "react-router-dom";
import Nav from "./Nav";
import { useState } from "react";

export default function App() {

	const [usuario, setUsuario] = useState(null);

	return (
		<>
		<Nav usuario={usuario} setUsuario={setUsuario}/>
		<Outlet context={[usuario, setUsuario]}  />
		</>
	);
}