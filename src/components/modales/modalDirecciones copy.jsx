import React, { useState } from 'react';
import "./../../styles/modales/modal.css"
const ModalDirecciones = ({ direction, onClose }) => {

    const [formData, setFormData] = useState(direction)
    const [editable, setEditable] = useState(false);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
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
                </div>
            </div>
        </div>
    );
};

export default ModalDirecciones;