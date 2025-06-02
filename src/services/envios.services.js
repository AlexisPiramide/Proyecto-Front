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
    const errorData = await response.json();
    if (errorData.error) {
        throw new Error(errorData.error);
    }
    return response.json();
};

export {getTraking, postTraking};


 