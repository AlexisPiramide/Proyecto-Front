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
    const token = localStorage.getItem("usuario").token;
    const response = await fetch(URL+"envios/tracking/"+usuario, {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({id:id, tipo:tipo, direccion:address}),
    });
    

    if (!response.ok) {
        const errorData = await response.json();
        console.log("Error al enviar el tracking:", errorData);
        throw new Error("Error al enviar el tracking: " + (errorData.message || response.statusText));
    }

    return response.json();
};

export {getTraking, postTraking};


 