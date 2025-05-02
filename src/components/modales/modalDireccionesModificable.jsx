import React, { useState } from 'react';
import "./../../styles/modales/modal.css"

import {updateDireccion} from '../../services/direcciones.services';
const ModalDirecciones = ({ direction, onClose }) => {

    const [direccionForm, setDireccionForm] = useState(direction)
    const [editable, setEditable] = useState(false);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setDireccionForm({ ...formData, [name]: value });
    };

    const postDireccion = async () => {
        const result = await updateDireccion(direccionForm.id, direccionForm);
        if (result) {
            console.log("Dirección actualizada:", result);
            setDireccionForm(result);
        } else {
            console.error("Error al actualizar la dirección");
        }
    };
    
    return (
        <div className="modal">
            <div className="modal-content">
                <h2>Dirección</h2>
                <form>
                    <div>
                        <label>Calle:</label>
                        <input type="text" name="calle" value={formData.calle || '' + ' ' + formData.numero || ''} onChange={handleChange} disabled={!editable} />
                    </div>
                    <div>
                        <label>Ciudad:</label>
                        <input type="text" name="ciudad" value={formData.localidad || ''} onChange={handleChange} disabled={!editable} />
                    </div>
                    <div>
                        <label>Provincia:</label>
                        <input type="text" name="estado" value={formData.provincia || ''} onChange={handleChange} disabled={!editable} />
                    </div>
                    <div>
                        <label>Código Postal:</label>
                        <input type="text" name="codigoPostal" value={formData.codigoPostal || ''} onChange={handleChange} disabled={!editable} />
                    </div>
                </form>
                <div className="modal-actions">
                    <button onClick={onClose}>Cerrar</button>
                    {editable ? <button onClick={() => {setEditable(false); postDireccion()}}>Guardar</button> : <button onClick={() => { setEditable(true); }}>Editar</button>}
                </div>
            </div>
        </div>
    );
};

export default ModalDirecciones;