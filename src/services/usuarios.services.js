import URL from "./const.js";

const login = async (correo, password) => {
    const data = await fetch(URL + "usuarios/login", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ correo: correo, "contraseña": password })
    })
    if (data.ok) {
        const json = await data.json();
        return json;
    } else {
        throw new Error('Usuario o contraseña incorrectos');
    }

};

const registro = async (datosFormulario) => {
    const data = await fetch(URL + "usuarios/registro", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },

        body: JSON.stringify({
            nombre: datosFormulario.nombre,
            apellidos: datosFormulario.apellidos,
            alias: datosFormulario.alias,
            correo: datosFormulario.correo,
            contraseña: datosFormulario.password,
            telefono: datosFormulario.telefono
        })
    })
    if (data.ok) {
        const json = await data.json();
        return json;
    } else {
        throw new Error('Error al registrar usuario, ¿estas seguro de que el correo no esta en uso?');
    }
}

const comprobarUsuario = async (id) => {
    try {

        const token = JSON.parse(localStorage.getItem('usuario')).token;
        const header= {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
        const data = await fetch(URL + `usuarios/${id}`, {
            method: 'GET',
            headers: header

        })
        if (data.ok) {
            const json = await data.json();
            return json;
        }
    } catch (error) {
        console.error("No existe:", error);
        return null;
    }
}

const comprobarDatos = async (datos) => {
    try {
        const data = await fetch(URL + "usuarios/existe", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "nombre": datos.nombre,
                "apellidos": datos.apellidos,
                "telefono": datos.telefono,
                "correo": datos.correo
            })
        })
        if (data.ok) {
            const json = await data.json();
            return json;
        } else {
            throw data;
        }
    } catch (error) {
        if(error.status === 404){
            throw new Error('No existe el usuario');
        }else{
            throw new Error('Error al comprobar datos');
        }
    }
}

const registroExterno = async (id) => {
    const data = await fetch(URL + "usuarios/y&$1m9x41/registroExterno/" + { id }, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: id
        })
    })
    if (data.ok) {
        const json = await data.json();
        return json;
    } else {
        throw new Error('Error al registrar usuario externo');
    }
}

const modificarUsuario = async (datosFormulario) => {
    const token = JSON.parse(localStorage.getItem('usuario')).token;
    
    const header= {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    }
    console.log("datosFormulario", datosFormulario);
    const data = await fetch(URL + "usuarios/actualizar", {
        method: 'PUT',
        headers: header,
        body: JSON.stringify({"datos" : {
            nombre: datosFormulario.nombre,
            apellidos: datosFormulario.apellidos,
            contraseña: datosFormulario.password,
            telefono: datosFormulario.telefono
        }})
    });

    if (data.ok) {
        const json = await data.json();
        return json;
    } else {
        throw new Error('Error al modificar usuario');
    }

}

const isExterno = async (id) => {
    try {
        const data = await fetch(URL + "usuarios/isExterno/" + id, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (data.ok) {
        const json = await data.json();
        return json;
    } else {
        throw new Error('Error al comprobar si es externo');
    }
    } catch (error) {
        if(error.status === 404) {
            return false; // El usuario no existe
        }
    }
   
}

export { login, registro, comprobarUsuario, comprobarDatos, registroExterno,isExterno,modificarUsuario };