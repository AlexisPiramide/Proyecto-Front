import URL from "./const.js";

const login = async (correo, password) => {
    const data = await fetch(URL+"usuarios/login",{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({correo:correo,"contraseña":password})
    })
    if(data.ok){
        const json = await data.json();
        console.log(json);
        return json;
    }else{
        throw new Error('Usuario o contraseña incorrectos');
    }

};

const registro = async (datosFormulario) => {
    const data = await fetch(URL+"usuarios/registro",{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        
        body: JSON.stringify({
            nombre: datosFormulario.nombre,
            apellidos: datosFormulario.apellidos,
            alias: datosFormulario.alias,
            correo: datosFormulario.correo,
            "contraseña": datosFormulario.password,
            telefono: datosFormulario.telefono
        })
    })
    if(data.ok){
        const json = await data.json();
        return json;
    }else{
        throw new Error('Error al registrar usuario, ¿estas seguro de que el correo no esta en uso?');
    }
}

const comprobarUsuario = async (id) => {
    try{
        const data = await fetch(URL+`usuarios/${id}`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        if(data.ok){
            const json = await data.json();
            return json;
        }
    }catch(error){
        console.error("No existe:", error);
        return null;
    }
}

const comprobarDatos = async (nombre, apellidos, telefono, correo) => {
    const data = await fetch(URL+"usuarios/existe",{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            nombre: nombre,
            apellidos: apellidos,
            telefono: telefono,
            correo: correo
        })
    })
    if(data.ok){
        const json = await data.json();
        return json;
    }else{
        throw new Error('Error al comprobar datos');
    }
}

export {login,registro,comprobarUsuario,comprobarDatos};