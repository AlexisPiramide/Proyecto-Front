import URL from "./const"
const getTraking = async (id) => {
    const response = await fetch(URL+"envios/tracking/"+id, {
        method: "GET",
        headers: {
        "Content-Type": "application/json",
        },
    });
    return response.json();
};

const postTraking = async (id,usuario, tipo,address) => {
    const response = await fetch(URL+"envios/tracking/"+usuario, {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify({id:id, tipo:tipo, direccion:address}),
    });

    if (!response.ok) {
        throw new Error(`Error: ${errorData.message || "Unknown error"}`);
    }
    if (response.status === 404) {
        throw new Error("No se ha encontrado el paquete con ese código.");
    }
    if (response.status === 400) {
        throw new Error("Error al escanear el código. Inténtalo de nuevo.");
    }
    return response.json();
};

export {getTraking, postTraking};


 