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

const postTraking = async (id, usuario, tipo, address) => {
    const token = localStorage.getItem("usuario").token;

    const response = await fetch(URL + "envios/tracking/" + usuario, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ id: id, tipo: tipo, direccion: address }),
    });

    let responseText;
    try {
        responseText = await response.text(); // Use text to see full raw response
        const responseData = JSON.parse(responseText);

        if (!response.ok) {
            console.error("Server error response:", responseData);
            throw new Error(responseData.message || responseData.error || "Unknown error");
        }

        return responseData;
    } catch (parseError) {
        console.error("Failed to parse response:", responseText);
        throw new Error("Respuesta del servidor no válida o inesperada");
    }
};



export {getTraking, postTraking};


 