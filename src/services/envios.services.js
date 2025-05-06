

const traking = async (id) => {
    const response = await fetch(`http://localhost:3000/api/envios/${id}`, {
        method: "GET",
        headers: {
        "Content-Type": "application/json",
        },
    });
    return response.json();
};








export default traking;