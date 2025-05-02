import React, { useState } from 'react';
import "./../../styles/modales/modal.css"
const ModalDirecciones = ({ direction, onSave, onClose }) => {

    return (
        <div className="modal">
            <div className="modal-content">
                <h2>Dirección</h2>
                <form>
                    <div>
                        <label>Calle:</label>
                        <input type="text" name="calle" value={formData.calle || '' + ' ' + formData.numero || ''} disabled/>
                    </div>
                    <div>
                        <label>Ciudad:</label>
                        <input type="text" name="ciudad" value={formData.localidad || ''} disabled/>
                    </div>
                    <div>
                        <label>Provincia:</label>
                        <input type="text" name="estado" value={formData.provincia || ''} disabled/>
                    </div>
                    <div>
                        <label>Código Postal:</label>
                        <input type="text" name="codigoPostal" value={formData.codigoPostal || ''} disabled/>
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