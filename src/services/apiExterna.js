const axios = require("axios");

async function obtenerUsuarios() {

    try {

        const respuesta = await axios.get(
            "https://jsonplaceholder.typicode.com/users"
        );

        return respuesta.data;

    } catch (error) {

        console.log(error);

    }
}

module.exports = {
    obtenerUsuarios
};