import { useMemo } from 'react';
import { generateRainbowColors } from './../../utils/rainbowColors';

export default function Tracking({ datos }) {

    const rainbowColors = useMemo(() => generateRainbowColors(datos.length), [datos.length]);

    return (
        <div className="tracking">
            {datos && datos.map((item, index) => {
                const color = rainbowColors[index];

                // Convert item.fecha (timestamp) to a readable date
                const fecha = new Date(item.fecha).toLocaleString();

                return (
                    <div className="contenedor-datos" style={{ border: `5px solid ${color}` }}>
                        <h3 className="titulo">Tracking - {item.id}</h3>
                        <p className="estado">{item.estado}</p>
                        <p className="fecha">{fecha}</p>
                        {/**
                                <p className="tracking" id="direccion">
                                    {item.direccion.calle} {item.direccion.numero}, {item.direccion.codigoPostal}, {item.direccion.localidad},
                                    {item.direccion.provincia}, {item.direccion.pais}
                                </p>
                            */}
                    </div>
                );
            })}
        </div>
    );
}
