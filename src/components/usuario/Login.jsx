export default function Login() {

    return (
        <form className="login">
            <h2>Login: </h2>

            <div className="form-usuario-data">
                <label htmlFor="email">Email: </label>
                <input type="email" id="email" name="email" />
                <label htmlFor="password">Contraseña: </label>
                <input type="password" id="password" name="password" />
            </div>
            <button type="submit">Iniciar Sesion</button>
        </form>        
    )
}