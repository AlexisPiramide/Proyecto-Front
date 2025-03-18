export default function FormDestinatario({ setDestinatario }) {
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setDestinatario(prev => ({ ...prev, [name]: value }));
    };

    return (
        <form className="form-destinatario">
            <label>Nombre</label>
            <input type="text" name="nombre" onChange={handleChange} required />
            
            <label>Apellidos</label>
            <input type="text" name="apellidos" onChange={handleChange} required />
        </form>
    );
}
