import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./components/App";
import "./styles/main.css"
import ZonaSesiones from "./components/usuario/ZonaSesiones";
import PaginaEnvio from "./components/envios/PaginaEnvio";
import Home from "./components/inicio/Home";
import 'react-toastify/dist/ReactToastify.css'
import Scanner from "./components/escaner/Scanner";
import CrearPaquete from "./components/envios/CrearPaquete";
const router = createBrowserRouter([
  {
		path: "/",
		element: <App />,
		children: [
		{ path: "", element: <Home/> },
		{ path: "usuario", element: <ZonaSesiones/> },
		{ path: "escaner", element: <Scanner/> },
		{ path: "nuevo", element: <CrearPaquete/>},
		{ path: "envio", element: <PaginaEnvio/> }
		],
	},
	{
		path: "/admin",
		element: <App />,
		children: [
			{path: "/nuevo", element: <h1>Añadir Empleado</h1>},
			{path: "/sucursal", element: <h1>Empleados</h1>},
		],
	},
	{
		path: "/y&$1m9x41/registroExterno/",
		element: <App />,
		children: [
			{path: "", element: <h1>Registro Externo</h1>},
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