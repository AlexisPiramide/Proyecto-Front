import "./../styles/404.css"

export default function NotFoundPage() {
    return (
        <div className="not-found">
            <h1>Error 404 - Not Found</h1>
            <p>Lo sentimos, la página que estás buscando no existe o ha sido eliminada</p>
            <button onClick={() => window.location.href = '/'}>Volver al inicio</button>
        </div>
    );
}
