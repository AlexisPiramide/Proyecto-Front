import { useState } from "react";

export default function InputFormulario({ type, name, onChange,value}) {

    const [colormode,setColormode] = useState("light");
    let imagen = name
    let placeholder = name

    if(name === "password"){
        imagen = "password";
        placeholder = "Contraseña";
    }

    if(name === "password2"){
        imagen = "password";
        placeholder = "Repite la contraseña";
    }

    if(name === "apellidos"){
        placeholder = "Apellidos";
    }

    placeholder = placeholder.charAt(0).toUpperCase() + placeholder.slice(1);
    return (
            <label className="label-sesiones">
                <img src={`/iconosFormularios/${imagen}-${colormode}.svg`} alt={name}/>
                <input type={type} name={name} placeholder={placeholder} value={value} onChange={(e)=>onChange(e)}/>
            </label>
    )
}