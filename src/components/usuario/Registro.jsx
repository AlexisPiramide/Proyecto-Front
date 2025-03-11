export default function Registro() {
    
    return (
        <form className="registro">
            <h2>Registro: </h2>
            <div className="form-usuario-div">
                <label htmlFor="nombre">Nombre: </label>
                <input type="text" id="nombre" name="nombre" />
                <label htmlFor="apellidos">Apellidos: </label>
                <input type="text" id="apellidos" name="apellidos" />
            </div>
            <div className="form-usuario-data">
                <label htmlFor="email">Email: </label>
                <input type="email" id="email" name="email" />
                <label htmlFor="telefono">Teléfono: </label>
                <input type="tel" id="telefono" name="telefono" />
            </div>

            <div className="form-usuario-registro-contraseñas">
                <label htmlFor="password">Contraseña: </label>
                <input type="password" id="password" name="password" />
                <label htmlFor="password2">Repite la contraseña: </label>
                <input type="password" id="password2" name="password2" />
            </div>
            <button type="submit">Registrar</button>
        </form>        
    );

}