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



export default getTraking;