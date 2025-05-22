import "./../../styles/extras/botonDireccion.css"

export default function BotonDireccion({ direccion, onClick }) {

    const handleClick = () => {
        onClick(direccion);
    };

    return (
        <div className="direccion-boton" onClick={handleClick}>
            <p>Calle: {direccion.calle} {direccion.numero}</p>
            <p>{direccion.localidad}, {direccion.provincia}, {direccion.pais}</p>
            <p>CP: {direccion.codigoPostal}</p>
        </div>
    );
}
