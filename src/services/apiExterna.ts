import axios from "axios";

// Servicio API externa
export const obtenerUsuarios = async () => {

    const response = await axios.get(
        "https://jsonplaceholder.typicode.com/users"
    );

    return response.data;
};