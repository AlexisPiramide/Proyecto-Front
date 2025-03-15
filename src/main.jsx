import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./components/App";
import "./styles/main.css"
import ZonaSesiones from "./components/usuario/ZonaSesiones";
import ZonaEscaner from "./components/escaner/ZonaEscaner";
import Home from "./components/inicio/home";
import 'react-toastify/dist/ReactToastify.css'
const router = createBrowserRouter([
  {
		path: "/",
		element: <App />,
		children: [
		{ path: "", element: <Home/> },
		{ path: "usuario", element: <ZonaSesiones/> },
		{ path: "escaner", element: <ZonaEscaner/> },
		],
	},
	{
		path: "/admin",
		element: <h1>hola admin</h1>,
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