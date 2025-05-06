import { useMemo } from 'react';
import "./../../styles/tracking.css";
import { generateRainbowColors } from './../../utils/rainbowColors';
export default function Tracking({ datos }) {

    const rainbowColors = useMemo(() => generateRainbowColors(datos.length), [datos.length]);

    return (
        <div className="tracking">
            {datos.map((item, index) => {
                const isLeft = index % 2 === 0;
                const color = rainbowColors[index];

                return (
                    <div className="tracking-row" key={index} style={{ display: 'flex' }}>
                        <div className={isLeft ? "informacion izquierda" : "informacion derecha"}>
                            <div className="contenedor-datos" style={{ backgroundColor: color }}>
                                <h3 className="titulo">Tracking - {item.id}</h3>
                                <p className="comentario">{item.comentario}</p>
                                <p className="estado">{item.estado}</p>
                                <p className="fecha">{item.fecha}</p>
                                <p className="tracking" id="direccion">
                                    {item.direccion.calle} {item.direccion.numero}, {item.direccion.codigoPostal}, {item.direccion.localidad},
                                    {item.direccion.provincia}, {item.direccion.pais}
                                </p>
                            </div>
                        </div>
                        <div className="imagen-centro">
                            <img src="/imagenflecha.png" alt="Imagen" className="imagen-tracking" />
                        </div>
                        <div className={!isLeft ? "informacion izquierda" : "informacion derecha"} />
                    </div>
                );
            })}
        </div>
    );
}
