import URL from "./const.js";

const getDimensiones = async () => {

    const result = await fetch(URL+'api/dimensiones')
    const dimensiones = await result.json();

    return dimensiones;
}


export {getDimensiones};