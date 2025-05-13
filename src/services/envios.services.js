import URL from "./const"
const getTraking = async (id) => {
    const response = await fetch(URL+id, {
        method: "GET",
        headers: {
        "Content-Type": "application/json",
        },
    });
    return response.json();
};

const postTraking = async (id,usuario, tipo) => {
    const response = await fetch(URL+usuario, {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify({id:id, tipo:tipo}),
    });
    return response.json();
};

export {postTraking};
export default getTraking;


 