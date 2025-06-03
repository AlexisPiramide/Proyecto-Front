import { useMemo } from 'react';
import { generateRainbowColors } from './../../utils/rainbowColors';

export default function Tracking({ datos }) {

    const rainbowColors = useMemo(() => generateRainbowColors(datos.length), [datos.length]);

    return (
        <div className="tracking">
            {datos && datos.map((item, index) => {
                const color = rainbowColors[index];
                const fecha = new Date(item.fecha).toLocaleString();
                
                return (
                    <div className="contenedor-datos" style={{ borderBottom: `2px solid ${color}` }}>
                        <h3 className="titulo" style={{ borderBottom: `1px solid ${color}` }}>Tracking - {item.id}</h3>
                        <p className="estado" style={{ borderBottom: `1px solid ${color}` }}>{item.estado}</p>
                        <p className="fecha" style={{ borderBottom: `1px solid ${color}` }}>{fecha}</p>
                        <p className="direccion-tracking" id="direccion-tracking" style={{ borderBottom: `1px solid ${color}` }}>
                            {item.direccion.calle} {item.direccion.numero}, {item.direccion.codigoPostal}, {item.direccion.localidad},
                            {item.direccion.provincia}, {item.direccion.pais}
                        </p>
                        
                    </div>
                );
            })}
        </div>
    );
}
