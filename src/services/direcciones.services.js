async function direccionesUsuario(id) {
        const usuario = JSON.parse(localStorage.getItem("usuario"));
        const headers = {
            'Content-Type': 'application/json',
        };
        
        headers['Authorization'] = 'Bearer ' + usuario.token;
        const data = await fetch(URL+`/direcciones/${id}`, {
            method: 'GET',
            headers: headers,
            body: JSON.stringify({'datosCambiar':body})
        })

        if (!data.ok) {
            throw new Error("Direcciones no encontradas");
        }
        return data.json();
}

async function obtenerLocalidadProvincia(codigoPostal) {
    try {
        let response = await fetch(`https://api.zippopotam.us/ES/${codigoPostal}`);
        
        if (!response.ok) {
            throw new Error("Código postal no encontrado");
        }

        let data = await response.json();
        let localidad = data.places[0]["place name"];
        let provincia = data.places[0]["state"];
        
        console.log(`Localidad: ${localidad}, Provincia: ${provincia}`);
        return { localidad, provincia };
    } catch (error) {
        console.error("Error:", error.message);
        return null;
    }
}

export {obtenerLocalidadProvincia,direccionesUsuario};