import URL from "./const"

async function getPedidosUsuario(id) {
    
    const usuario = JSON.parse(localStorage.getItem("usuario"));
    const headers = {
        'Content-Type': 'application/json',
    };
    
    headers['Authorization'] = 'Bearer ' + usuario.token;
    const data = await fetch(URL+`/pedidos/${id}`, {
        method: 'GET',
        headers: headers,
    })

    if (!data.ok) {
        throw new Error("Pedidos no encontrados");
    }
    return data.json();
}


export {getPedidosUsuario}