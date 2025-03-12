import { useEffect } from "react";
import "./../../styles/toast.css"

export default function ErrorModalUsuario({ message, onClose }) {
    
    useEffect(() => {
        const timer = setTimeout(onClose, 3000);
        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div className="toast">
            <p>{message}</p>
            <button onClick={onClose}>✖</button>
        </div>
    );
}
