
export default function Dimension({ dimension, setDimension, selectedDimension }) {
    
    const selecionar = () => {
        setDimension(dimension);
    };

    return (
        <div className={`dimension ${selectedDimension?.id === dimension.id ? 'selected' : ''}`} onClick={selecionar}>
            <h2>{dimension.nombre}</h2>
            <img src={`${dimension.nombre.toLowerCase()}.svg`} alt={dimension.nombre} />
            <p>Tamaño: {dimension.ancho} x {dimension.alto} x {dimension.largo} cm</p>
            <p>Hasta {dimension.peso}kg</p>
        </div>
    );
}
