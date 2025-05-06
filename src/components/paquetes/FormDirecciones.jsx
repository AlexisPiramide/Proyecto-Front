import { useEffect, useState } from "react";
import { obtenerLocalidadProvincia } from "./../../services/direcciones.services";

export default function FormDirecciones({ usuario, setDireccion,direcciones }) {
    const [codigoPostal, setCodigoPostal] = useState("");
    const [localidad, setLocalidad] = useState("");
    const [provincia, setProvincia] = useState("");
    const [calle, setCalle] = useState("");
    const [numero, setNumero] = useState("");
    const [nuevaDireccion, setNuevaDireccion] = useState(false);
    useEffect(() => {
        clearForm("");
        setDireccion({ cp: "", localidad: "", provincia: "", calle: "", numero: "" });
    }, [usuario]);

    useEffect(() => {
        if (codigoPostal.length === 5) {
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

    const clearForm = () => {
        setCodigoPostal("");
        setLocalidad("");
        setProvincia("");
        setCalle("");
        setNumero("");
    };

    const handleButtonClick = () => {
        setNuevaDireccion(!nuevaDireccion);
        clearForm({});
        setDireccion({ cp: "", localidad: "", provincia: "", calle: "", numero: "" });
    };


    return (
        <form className="form-direcciones" onSubmit={(e) => e.preventDefault()}>
              <h2>Dirección de envío</h2>
              { direcciones &&direcciones.length > 0 ?
               <button className="fixed-button" onClick={handleButtonClick}>
                    {(nuevaDireccion) ? "Direccion Exitente" : "Nueva Direccion" }
                </button>: <></>
              }
           

            {direcciones.length > 0 && !nuevaDireccion ? 
            direcciones.map((direccion, index) => (
                <button key={index} type="button" onClick={() => {
                    setCodigoPostal(direccion.codigoPostal);
                    setLocalidad(direccion.localidad);
                    setProvincia(direccion.provincia);
                    setCalle(direccion.calle);
                    setNumero(direccion.numero);
                }}>
                   {direccion.calle} - {direccion.numero} | {direccion.localidad} - {direccion.provincia} 
                </button>
            )):
            <>
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
            </>
            }
            
           
        </form>
    );
}
