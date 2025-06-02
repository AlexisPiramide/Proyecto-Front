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
    return response.json();
};

export {getTraking, postTraking};


 