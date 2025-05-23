import { useState, useEffect } from "react";

export default function useGeolocation() {
    const [location, setLocation] = useState({ lat: null, lon: null });
    const [address, setAddress] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const cached = sessionStorage.getItem("user_address");
        if (cached) {
            setAddress(JSON.parse(cached));
            return;
        }

        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const { latitude: lat, longitude: lon } = position.coords;
                    setLocation({ lat, lon });

                    try {
                        const res = await fetch(
                            `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`
                        );
                        const data = await res.json();
                        const addr = data.address;
                        const parsedAddress = {
                            calle: addr.road || "",
                            numero: addr.house_number || "",
                            codigoPostal: addr.postcode || "",
                            localidad: addr.city || addr.town || addr.village || "",
                            provincia: addr.state || "",
                        };
                        setAddress(parsedAddress);
                        sessionStorage.setItem("user_address", JSON.stringify(parsedAddress));
                    } catch {
                        setError("Error obteniendo la dirección.");
                    }
                },
                (err) => setError("Geolocation error: " + err.message)
            );
        } else {
            setError("Geolocalización no soportada.");
        }
    }, []);

    return { location, address, error };
}
