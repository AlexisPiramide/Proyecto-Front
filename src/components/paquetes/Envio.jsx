
export default function Envio({remitente,destinatario,direccion,dimension}){

    return (
        <>
            <h1>Resumen del envio</h1>
            <h2>Remitente</h2>
            <p>Nombre: {remitente.nombre}</p>
            <h2>Destinatario</h2>
            <p>Nombre: {destinatario.nombre}</p>
            <p>Dirección: {direccion.direccion}</p>
            <p>Código Postal: {direccion.codigopostal}</p>
            <h2>Dimensiones</h2>
            <p>Tamaño: {dimension.tamaño}</p>
            <p>Peso: {dimension.peso}</p>
        </>
    )
}