import { useEffect, useState } from "react";
import {obtenerLocalidadProvincia} from "./../../services/direcciones.services";

export default function FormDirecciones({ setDireccion }) {
    const [codigoPostal, setCodigoPostal] = useState("");
    const [localidad, setLocalidad] = useState("");
    const [provincia, setProvincia] = useState("");
    const [calle, setCalle] = useState("");
    const [numero, setNumero] = useState("");

    useEffect(() => {
      
        if (codigoPostal.length === 5){
            obtenerLocalidadProvincia(codigoPostal).then((resultado) => {
                if (resultado) {
                    setLocalidad(resultado.localidad);
                    setProvincia(resultado.provincia);
                } else {
                    setLocalidad("");
                    setProvincia("");
                }
            });
        } else {
            setLocalidad("");
            setProvincia("");
        }
    }, [codigoPostal]);

    useEffect(() => {
        setDireccion({ codigoPostal, localidad, provincia, calle, numero });
    }, [codigoPostal, localidad, provincia, calle, numero, setDireccion]);

    return (
        <form className="form-direcciones">
            <label>Codigo Postal</label>
            <input type="text" name="cp" value={codigoPostal} onChange={(e) => setCodigoPostal(e.target.value)} />
            <label>Comunidad Autonoma</label>
            <input type="text" name="provincia" value={provincia} onChange={(e) => setProvincia(e.target.value)} disabled />
            <label>Localidad</label>
            <input type="text" name="localidad" value={localidad} onChange={(e) => setLocalidad(e.target.value)} disabled />
            <label>Calle</label>
            <input type="text" name="calle" value={calle} onChange={(e) => setCalle(e.target.value)} />
            <label>Numero</label>
            <input type="text" name="numero" value={numero} onChange={(e) => setNumero(e.target.value)} />
        </form>
    );
}
