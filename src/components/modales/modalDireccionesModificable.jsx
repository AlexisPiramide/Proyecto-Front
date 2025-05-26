import React, { useState } from 'react';
import "./../../styles/modales/modal.css"

import { updateDireccion, postDireccion } from '../../services/direcciones.services';
const ModalDirecciones = ({ direction, onClose,visualizador,post}) => {

    const [direccionForm, setDireccionForm] = useState(direction)
    const [editable, setEditable] = useState(post);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setDireccionForm({ ...formData, [name]: value });
    };

    const postD = async () => {
        const result = await post(direccionForm);
        if (result) {
            postDireccion(result);
        } else {
            console.error("Error al guardar la dirección");
        }
    }

    const updateD = async () => {
        const result = await updateDireccion(direccionForm.id, direccionForm);
        if (result) {
            setDireccionForm(result);
        } else {
            console.error("Error al actualizar la dirección");
        }
    };

    return (<div className="modal">
        <div className="modal-content">
            <h2>Dirección</h2>
            <form>
                <div className="row-2">
                    <label htmlFor="calle">Calle:</label>
                    <input id="calle" type="text" name="calle" value={formData.calle || ''} onChange={handleChange} disabled={!editable} />
                </div>
                <div className="row-2">
                    <label htmlFor="numero">Número:</label>
                    <input id="numero" type="text" name="numero" value={formData.numero || ''} onChange={handleChange} disabled={!editable} />
                </div>
                <div>
                    <label htmlFor="ciudad">Ciudad:</label>
                    <input id="ciudad" type="text" name="ciudad" value={formData.ciudad || ''} onChange={handleChange} disabled={!editable} />
                </div>
                <div>
                    <label htmlFor="provincia">Provincia:</label>
                    <input id="provincia" type="text" name="provincia" value={formData.provincia || ''} onChange={handleChange} disabled={!editable} />
                </div>
                <div>
                    <label htmlFor="codigoPostal">Código Postal:</label>
                    <input id="codigoPostal" type="text" name="codigoPostal" value={formData.codigoPostal || ''} onChange={handleChange} disabled={!editable} />
                </div>
            </form>
            <div className="modal-actions">
                <button onClick={onClose}>Cerrar</button>
                {!visualizador && editable && !post ? (<button onClick={() => { setEditable(false); updateD(); }}>Guardar</button>) : null}
                {!visualizador && !editable && !post ? (<button onClick={() => { setEditable(true); }}>Modificar</button>) : null}
                {!visualizador && post ? (<button onClick={() => { postD(); }}>Guardar</button>):<></>}
            </div>
        </div>
    </div>
    );
};

export default ModalDirecciones;