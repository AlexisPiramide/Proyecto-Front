import URL from "./const"

async function getPaquetesUsuario(id) {
    
    const usuario = JSON.parse(localStorage.getItem("usuario"));
    const headers = {
        'Content-Type': 'application/json',
    };
    
    headers['Authorization'] = 'Bearer ' + usuario.token;
    const data = await fetch(URL+`paquetes/paquetes/`, {
        method: 'post',
        headers: headers,
        body: JSON.stringify({id: id})
    })

    if (!data.ok) {
        throw new Error("Pedidos no encontrados");
    }
    return data.json();
}


async function postPaquete(datos){
    const data = await fetch(URL+'paquetes', {
        method: 'POST',
        body: JSON.stringify(datos)
    })

    if (!data.ok) {
        throw new Error("Error al crear el paquete");
    }
    return data.json();

}

export {getPaquetesUsuario,postPaquete}