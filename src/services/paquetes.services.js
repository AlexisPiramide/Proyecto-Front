import URL from "./const"

async function getPaquetesUsuario(id) {
    
    const usuario = JSON.parse(localStorage.getItem("usuario"));
    const headers = {'Content-Type': 'application/json'};
    
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


async function getPaquete(id) {
    const usuario = JSON.parse(localStorage.getItem("usuario"));
    const headers = {'Authorization': 'Bearer ' + usuario.token};

    const response = await fetch(URL + `paquetes/${id}`, {
        method: 'GET',
        headers: headers,
    });

    if (!response.ok) {
        throw new Error("Paquete no encontrado");
    }
    return response.json();
}

async function generateBarcode(id) {
    const usuario = JSON.parse(localStorage.getItem("usuario"));
    const headers = {'Authorization': 'Bearer ' + usuario.token};

    const response = await fetch(URL + `paquetes/gencode/${id}`, {
        method: 'GET',
        headers: headers,
    });

    if (!response.ok) {
        throw new Error("Error al generar el código de barras");
    }
    return response.blob(); // Return the barcode as a blob
}

async function calcularPrecio(tamaño, peso) {
    const response = await fetch(URL + `paquetes/precio/${tamaño}/${peso}`, {
        method: 'GET',
        headers: headers,
    });

    if (!response.ok) {
        throw new Error("Error al calcular el precio");
    }
    return response.json();
}

export { getPaquetesUsuario, postPaquete, getPaquete, generateBarcode, calcularPrecio};