//const URL = "http://localhost:8080/";
const URL = "https://back.alexis.daw.cpifppiramide.com/";

export const MIN_NAME_LENGTH = 3;
export const ID_PATTERN = /^[A-Za-z0-9]{4}-[A-Za-z0-9]{4}-[A-Za-z0-9]{4}$/;
export const POSTAL_CODE_LENGTH = 5;
export const MIN_ADDRESS_NUMBER_LENGTH = 1;
export const PATERN_CORREO = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const sucursales = [
    { id: 1, nombre: "Sucursal Álava", latitud: 42.8467, longitud: -2.6716 },
    { id: 2, nombre: "Sucursal Albacete", latitud: 38.9943, longitud: -1.8585 },
    { id: 3, nombre: "Sucursal Alicante", latitud: 38.3452, longitud: -0.4810 },
    { id: 4, nombre: "Sucursal Almería", latitud: 36.8340, longitud: -2.4637 },
    { id: 5, nombre: "Sucursal Asturias", latitud: 43.3619, longitud: -5.8494 },
    { id: 6, nombre: "Sucursal Ávila", latitud: 40.6565, longitud: -4.6818 },
    { id: 7, nombre: "Sucursal Badajoz", latitud: 38.8794, longitud: -6.9707 },
    { id: 8, nombre: "Sucursal Barcelona", latitud: 41.3874, longitud: 2.1686 },
    { id: 9, nombre: "Sucursal Burgos", latitud: 42.3439, longitud: -3.6969 },
    { id: 10, nombre: "Sucursal Cáceres", latitud: 39.4752, longitud: -6.3723 },
    { id: 11, nombre: "Sucursal Cádiz", latitud: 36.5271, longitud: -6.2886 },
    { id: 12, nombre: "Sucursal Cantabria", latitud: 43.4623, longitud: -3.8099 },
    { id: 13, nombre: "Sucursal Castellón", latitud: 39.9864, longitud: -0.0513 },
    { id: 14, nombre: "Sucursal Ciudad Real", latitud: 38.9861, longitud: -3.9272 },
    { id: 15, nombre: "Sucursal Córdoba", latitud: 37.8882, longitud: -4.7794 },
    { id: 16, nombre: "Sucursal A Coruña", latitud: 43.3623, longitud: -8.4115 },
    { id: 17, nombre: "Sucursal Cuenca", latitud: 40.0704, longitud: -2.1374 },
    { id: 18, nombre: "Sucursal Girona", latitud: 41.9794, longitud: 2.8214 },
    { id: 19, nombre: "Sucursal Granada", latitud: 37.1773, longitud: -3.5986 },
    { id: 20, nombre: "Sucursal Guadalajara", latitud: 40.6333, longitud: -3.1669 },
    { id: 21, nombre: "Sucursal Guipúzcoa", latitud: 43.3128, longitud: -1.9787 },
    { id: 22, nombre: "Sucursal Huelva", latitud: 37.2614, longitud: -6.9447 },
    { id: 23, nombre: "Sucursal Huesca", latitud: 42.1401, longitud: -0.4089 },
    { id: 24, nombre: "Sucursal Jaén", latitud: 37.7796, longitud: -3.7849 },
    { id: 25, nombre: "Sucursal León", latitud: 42.5987, longitud: -5.5671 },
    { id: 26, nombre: "Sucursal Lleida", latitud: 41.6176, longitud: 0.6200 },
    { id: 27, nombre: "Sucursal Lugo", latitud: 43.0121, longitud: -7.5559 },
    { id: 28, nombre: "Sucursal Madrid", latitud: 40.4165, longitud: -3.70256 },
    { id: 29, nombre: "Sucursal Málaga", latitud: 36.7213, longitud: -4.4214 },
    { id: 30, nombre: "Sucursal Murcia", latitud: 37.9847, longitud: -1.1280 },
    { id: 31, nombre: "Sucursal Navarra", latitud: 42.8125, longitud: -1.6458 },
    { id: 32, nombre: "Sucursal Ourense", latitud: 42.3358, longitud: -7.8639 },
    { id: 33, nombre: "Sucursal Palencia", latitud: 42.0095, longitud: -4.5241 },
    { id: 34, nombre: "Sucursal Las Palmas", latitud: 28.1235, longitud: -15.4363 },
    { id: 35, nombre: "Sucursal Pontevedra", latitud: 42.4333, longitud: -8.6333 },
    { id: 36, nombre: "Sucursal La Rioja", latitud: 42.4627, longitud: -2.4449 },
    { id: 37, nombre: "Sucursal Salamanca", latitud: 40.9701, longitud: -5.6635 },
    { id: 38, nombre: "Sucursal Santa Cruz de Tenerife", latitud: 28.4636, longitud: -16.2518 },
    { id: 39, nombre: "Sucursal Segovia", latitud: 40.9429, longitud: -4.1088 },
    { id: 40, nombre: "Sucursal Sevilla", latitud: 37.3886, longitud: -5.9823 },
    { id: 41, nombre: "Sucursal Soria", latitud: 41.7667, longitud: -2.4667 },
    { id: 42, nombre: "Sucursal Tarragona", latitud: 41.1189, longitud: 1.2445 },
    { id: 43, nombre: "Sucursal Teruel", latitud: 40.3456, longitud: -1.1065 },
    { id: 44, nombre: "Sucursal Toledo", latitud: 39.8628, longitud: -4.0273 },
    { id: 45, nombre: "Sucursal Valencia", latitud: 39.4699, longitud: -0.3763 },
    { id: 46, nombre: "Sucursal Valladolid", latitud: 41.6523, longitud: -4.7245 },
    { id: 47, nombre: "Sucursal Vizcaya", latitud: 43.2630, longitud: -2.9349 },
    { id: 48, nombre: "Sucursal Zamora", latitud: 41.5033, longitud: -5.7446 },
    { id: 49, nombre: "Sucursal Zaragoza", latitud: 41.6488, longitud: -0.8891 },
    { id: 50, nombre: "Sucursal Ceuta", latitud: 35.8894, longitud: -5.3198 },
    { id: 51, nombre: "Sucursal Melilla", latitud: 35.2923, longitud: -2.9381 },
    { id: 52, nombre: "Sucursal Baleares", latitud: 39.5696, longitud: 2.6502 }
];

export default URL;