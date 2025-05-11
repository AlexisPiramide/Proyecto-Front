import "./../../styles/extras/botonPedido.css"

export default function BotonPedido({ pedido, onClick }) {

    const handleClick = () => {
        onClick(pedido);
    };

    const whoAreYou = () => {
        const usuarioLS = localStorage.getItem("usuario");
        if (usuarioLS.nombre === pedido.destinatario.nombre && usuarioLS.apellidos === pedido.destinatario.apellidos) {
            return "Remitente: "+ pedido.remitente.nombre + " " + pedido.remitente.apellidos;
        } else if (usuarioLS.nombre === pedido.remitente.nombre && usuarioLS.apellidos === pedido.remitente.apellidos) {
            return "Destinatario: "+ pedido.destinatario.nombre + " " + pedido.destinatario.apellidos;
        }
    };

    return (
        <div className="direccion-boton" onClick={handleClick}>
            <p>{pedido.id}</p>
            <p>{pedido.direccion.calle}, {pedido.direccion.numero} {pedido.direccion.localidad}</p>
            <p>{whoAreYou()}</p>
        </div>
    );
}
