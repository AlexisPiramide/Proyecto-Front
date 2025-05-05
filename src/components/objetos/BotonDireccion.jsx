import "./../../styles/extras/botonDireccion.css"

export default function BotonDireccion({ direccion, onClick }) {

    const handleClick = () => {
        onClick(direccion);
    };

    return (
        <div className="direccion-boton" onClick={handleClick}>
            <p>{direccion.calle} {direccion.numero}</p>
            <p>{direccion.ciudad}, {direccion.provincia}</p>
            <p>{direccion.codigoPostal}</p>
        </div>
    );
}
