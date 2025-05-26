import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';


export default function LeafletMap({ latitud, longitud }) {
    const position = [latitud || 40.4165, longitud || -3.70256];
    const sucursales = [
        { id: 1, nombre: "Sucursal Madrid", latitud: 40.4165, longitud: -3.70256 },
        { id: 2, nombre: "Sucursal Barcelona", latitud: 41.3874, longitud: 2.1686 },
        { id: 3, nombre: "Sucursal Mallorca", latitud: 39.5696, longitud: 2.6502 },
    ];

    const redIcon = new L.Icon({
        iconUrl: './icono-sucursal.svg',
        iconSize: [50, 81],
    });

    const DefaultIcon = L.icon({
        iconUrl: './pin-svgrepo-com.svg',
        iconSize: [50, 81],
    });

    return (
        <MapContainer center={position} zoom={6} scrollWheelZoom={false} style={{ height: '100vh', width: '100%' }} >
            <TileLayer attribution='&copy; OpenStreetMap contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker position={position} icon={DefaultIcon}>
                <Popup>
                    Tu ubicación actual <br />
                </Popup>
            </Marker>

            {sucursales.map(sucursal => (
                <Marker key={sucursal.id} position={[sucursal.latitud, sucursal.longitud]} icon={redIcon}>
                    <Popup>
                        {sucursal.nombre}
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
}
