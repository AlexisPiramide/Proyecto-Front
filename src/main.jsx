import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./components/App";
import "./styles/main.css"
import ZonaSesiones from "./components/usuario/ZonaSesiones";
import PaginaEnvio from "./components/envios/PaginaEnvio";

import 'react-toastify/dist/ReactToastify.css'
import Scanner from "./components/escaner/Scanner";
import CrearPaquete from "./components/paquetes/CrearPaquete";
import Admin from "./components/inicio/Admin";
import Inicio from "./components/inicio/Inicio.jsx";
import RegistroExterno from "./components/usuario/RegistroExterno";

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		children: [
			{ path: "", element: <Inicio /> },
			{ path: "usuario", element: <ZonaSesiones /> },
			{ path: "envio", element: <PaginaEnvio /> }
		],
	},
	{
		path: "/admin",
		element: <App />,
		children: [
			{ path: "", element: <Admin /> },
			{ path: "nuevo", element: <CrearPaquete /> },
			{ path: "escaner", element: <Scanner /> },
		],
	},
	{
		path: "/y&$1m9x41/registroExterno",
		element: <App />,
		children: [
			{ path: ":id", element: <RegistroExterno /> },
		],
	},
	{
		path: "*",
		element: <h1>404</h1>,
	},
]);

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);
