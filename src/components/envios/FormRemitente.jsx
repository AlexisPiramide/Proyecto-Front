import { useState } from "react";

export default function FormRemitente({ setRemitente }) {
    const [idUsuario, setIdUsuario] = useState("");

    const handleInputChange = (e) => {
        const value = e.target.value;
        const formattedValue = value
            .replace(/[^A-Za-z0-9]/g, "") // Remove non-alphanumeric characters
            .match(/.{1,4}/g) // Split into groups of 4
            ?.join("-") // Join with dashes
            .substring(0, 14) || ""; // Limit to 14 characters (XXXX-XXXX-XXXX)
        setIdUsuario(formattedValue);
        setRemitente(formattedValue); // Update parent state
    };

    return (
        <form className="form-remitente">
            <label>ID Usuario</label>
            <input
                value={idUsuario}
                onChange={handleInputChange}
                placeholder="XXXX-XXXX-XXXX"
            />
        </form>
    );
}