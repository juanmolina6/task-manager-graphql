import dotenv from "dotenv";
dotenv.config();

import express from "express";
import { graphqlHTTP } from "express-graphql";
import mongoose from "mongoose";
import cors from "cors";

import schema from "./schema/typeDefs";
import resolvers from "./schema/resolvers";

// Crear servidor Express
const app = express();

// Habilitar CORS
app.use(cors());

// Conexión MongoDB
mongoose.connect(process.env.MONGO_URI as string)
.then(() => console.log("MongoDB conectado"))
.catch((err) => console.log(err));

// Configuración GraphQL
app.use("/graphql", graphqlHTTP({
    schema,
    rootValue: resolvers,
    graphiql: true
}));

// Página principal
app.get("/", (req, res) => {

    res.send(`

    <html>

    <head>

        <title>API Gestión de Tareas</title>

        <style>

            body{
                background: linear-gradient(135deg, #1e3c72, #2a5298);
                font-family: Arial;
                color: white;
                text-align: center;
                padding-top: 80px;
            }

            .contenedor{
                background: rgba(255,255,255,0.1);
                width: 700px;
                margin: auto;
                padding: 40px;
                border-radius: 20px;
                box-shadow: 0px 0px 20px rgba(0,0,0,0.4);
            }

            h1{
                font-size: 45px;
            }

            p{
                font-size: 20px;
            }

            .tecnologias{
                margin-top: 30px;
            }

            .tecnologias span{
                background: white;
                color: #1e3c72;
                padding: 10px 20px;
                margin: 5px;
                border-radius: 10px;
                display: inline-block;
                font-weight: bold;
            }

            a{
                display: inline-block;
                margin-top: 30px;
                background: #00c853;
                color: white;
                padding: 15px 30px;
                text-decoration: none;
                border-radius: 10px;
                font-size: 18px;
                font-weight: bold;
            }

            a:hover{
                background: #00e676;
            }

        </style>

    </head>

    <body>

        <div class="contenedor">

            <h1>API Gestión de Tareas</h1>

            <p>
                Proyecto desarrollado con Node.js,
                TypeScript, GraphQL, MongoDB,
                Docker y Axios.
            </p>

            <div class="tecnologias">

                <span>Node.js</span>
                <span>TypeScript</span>
                <span>GraphQL</span>
                <span>MongoDB</span>
                <span>Docker</span>
                <span>Axios</span>

            </div>

            <a href="/graphql">
                Ir a GraphQL
            </a>

        </div>

    </body>

    </html>

    `);

});

// Puerto servidor
const PORT = process.env.PORT || 4000;

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en puerto ${PORT}`);
});