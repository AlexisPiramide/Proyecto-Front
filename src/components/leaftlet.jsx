import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

import {sucursales} from './../services/const';


export default function LeafletMap({ latitud, longitud }) {
    const position = [latitud || 40.4165, longitud || -3.70256];

    const redIcon = new L.Icon({
        iconUrl: './pin-sucursal.svg',
        iconSize: [50, 50],
        iconAnchor: [25, 50],
    });

    const DefaultIcon = L.icon({
        iconUrl: './pin-usuario.svg',
        iconSize: [50, 50],
        iconAnchor: [25, 50],
    });

    return (
        <MapContainer center={position} zoom={6} scrollWheelZoom={true} style={{ height: '100vh', width: '100%' }} >
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
