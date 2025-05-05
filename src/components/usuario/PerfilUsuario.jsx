import { useEffect, useState } from "react";
import { useOutletContext } from "react-router";
import { getDireccionesUsuario } from "../../services/direcciones.services";
import { getPaquetesUsuario } from "../../services/paquetes.services";
import ModalDirecciones from "./../modales/modalDirecciones";
import BotonDireccion from "../objetos/BotonDireccion";

export default function PerfilUsuario() {
    const [usuario, setUsuario] = useOutletContext();
    const [direcciones, setDirecciones] = useState([]);
    const [pedidos, setPedidos] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedDireccion, setSelectedDireccion] = useState(null);

    const fetchPedidos = async () => {
        const data = await getPaquetesUsuario(usuario.usuario.id);
        setPedidos(data);
    };

    const fetchDirecciones = async () => {
        const data = await getDireccionesUsuario(usuario.usuario.id);
        setDirecciones(data);
    };

    useEffect(() => {
        fetchPedidos();
        fetchDirecciones();
    }, []);

    const handleAddDireccion = () => {
        setSelectedDireccion({
            calle: '',
            ciudad: '',
            estado: '',
            codigoPostal: ''
        });
        setModalVisible(true);
    };
    

    const handleSaveDireccion = (newDireccion) => {
        setDirecciones([...direcciones, newDireccion]); 
        setModalVisible(false);
    };

    const handleCloseModal = () => {
        setModalVisible(false);
    };

    return (
        <div className="perfil-usuario">
            <h1>Bienvenido de vuelta {usuario.nombre} {usuario.apellidos}</h1>
            <div className="uno">
                <form className="formulario-perfil">
                    <h2>Modificar datos de usuario</h2>
                    <label htmlFor="nombre">Nombre</label>
                    <input type="text" id="nombre" name="nombre" defaultValue={usuario.nombre} required />
                    <label htmlFor="apellidos">Apellidos</label>
                    <input type="text" id="apellidos" name="apellidos" defaultValue={usuario.apellidos} required />
                    <label htmlFor="correo">Correo</label>
                    <input type="email" id="correo" name="correo" defaultValue={usuario.correo} required />
                    <label htmlFor="telefono">Teléfono</label>
                    <input type="tel" id="telefono" name="telefono" defaultValue={usuario.telefono} required />
                    <button type="submit">Modificar</button>
                </form>
                <button className="cambiar-contrasena">Cambiar contraseña</button>
            </div>

            <div className="dos">
                <div className="direcciones">
                    <div className="actuales">
                    {
                        direcciones.map((direccion, index) => (
                            <BotonDireccion key={index} direccion={direccion} onClick={() => { setSelectedDireccion(direccion); setModalVisible(true);}}/>
                        ))
                    }
                    </div>
                    <button className="btn-añadir-direccion" onClick={handleAddDireccion}>Añadir dirección</button>
                </div>

                <div className="pedidos">
                    <div className="actuales">
                        {
                            pedidos.map((pedido, index) => (
                                <button key={index} className="pedido-guardado" onClick={() => {setSelectedPedido(pedido); setPedidoModalVisible(true);}}>
                                    Pedido {pedido.id} - {pedido.fecha} - {pedido.total}€
                                </button>
                            ))
                        }
                    </div>
                </div>
            </div>

            {modalVisible && (
                <ModalDirecciones direction={selectedDireccion} onSave={handleSaveDireccion} onClose={handleCloseModal}/>
            )}
        </div>
    );
}
