import { useEffect, useState } from "react";
import { useOutletContext } from "react-router"
import { getDireccionesUsuario } from "../../services/direcciones.services";
import { getPedidosUsuario } from "../../services/pedidos.services";

export default function PerfilUsuario() {

    const [usuario,setUsuario] = useOutletContext();
    const [direcciones,setDirecciones] = useState([{nombre:"Casa",direccion:"Calle de la piruleta",ciudad:"Madrid",provincia:"Madrid",codigo_postal:"28000"}]);
    const [pedidos,setPedidos] = useState([{id:1,fecha:"12/12/2021",productos:[{nombre:"Producto 1"},{nombre:"Producto 2"}],total:20}]);

    const fetchPedidos = async () => {
        const data = await getPedidosUsuario(usuario.id);
        setPedidos(data);
    }

    const fetchDirecciones = async () => {
        const data = await getDireccionesUsuario(usuario.id);
        setPedidos(data);
    }


    useEffect(() => {
        fetchPedidos();
        fetchDirecciones();
    }, []);


    return (
        <div>
            <h1>Bienvenido de vuelta {usuario.nombre } {usuario.apellidos}</h1>
            <form>

            </form>

            <div >
                {
                    direcciones.map((direccion,index) => {
                        return (
                            <div key={index} className="direccion">
                                <h3>{direccion.nombre}</h3>
                                <p>{direccion.direccion}</p>
                                <p>{direccion.ciudad}</p>
                                <p>{direccion.provincia}</p>
                                <p>{direccion.codigo_postal}</p>
                            </div>
                        )
                })
            }

                <button>Añadir dirección</button>
            </div>
            <div className="pedidos">
                {
                    pedidos.map((pedido,index) => {
                        return (
                            <div key={index} className="pedido">
                                <h3>Pedido {pedido.id}</h3>
                                <p>{pedido.fecha}</p>
                                <p>{pedido.productos.map(producto => producto.nombre).join(", ")}</p>
                                <p>{pedido.total}€</p>
                            </div>
                        )
                    })

                }
            </div>
           

        </div>
    )
}