import {
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLString,
    GraphQLBoolean,
    GraphQLList,
    GraphQLID
} from "graphql";

import Task from "../models/Task";
import { obtenerUsuarios } from "../services/apiExterna";

// Tipo de tarea
const TipoTarea = new GraphQLObjectType({
    name: "Tarea",
    fields: () => ({
        id: { type: GraphQLID },
        titulo: { type: GraphQLString },
        descripcion: { type: GraphQLString },
        completada: { type: GraphQLBoolean }
    })
});

// Tipo usuario externo
const TipoUsuario = new GraphQLObjectType({
    name: "Usuario",
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        email: { type: GraphQLString }
    })
});

// Consultas
const Consulta = new GraphQLObjectType({
    name: "Consulta",
    fields: {

        tareas: {
            type: new GraphQLList(TipoTarea),

            async resolve() {
                return await Task.find();
            }
        },

        usuarios: {
            type: new GraphQLList(TipoUsuario),

            async resolve() {
                return await obtenerUsuarios();
            }
        }
    }
});

// Mutaciones
const Mutacion = new GraphQLObjectType({
    name: "Mutacion",

    fields: {

        agregarTarea: {

            type: TipoTarea,

            args: {
                titulo: { type: GraphQLString },
                descripcion: { type: GraphQLString }
            },

            async resolve(parent, args) {

                const tarea = new Task({
                    titulo: args.titulo,
                    descripcion: args.descripcion,
                    completada: false
                });

                return await tarea.save();
            }
        },

        eliminarTarea: {

            type: TipoTarea,

            args: {
                id: { type: GraphQLID }
            },

            async resolve(parent, args) {

                return await Task.findByIdAndDelete(args.id);
            }
        },

        actualizarTarea: {

            type: TipoTarea,

            args: {
                id: { type: GraphQLID },
                titulo: { type: GraphQLString },
                descripcion: { type: GraphQLString },
                completada: { type: GraphQLBoolean }
            },

            async resolve(parent, args) {

                return await Task.findByIdAndUpdate(
                    args.id,
                    {
                        titulo: args.titulo,
                        descripcion: args.descripcion,
                        completada: args.completada
                    },
                    { new: true }
                );
            }
        }
    }
});

// Exportar schema
export default new GraphQLSchema({
    query: Consulta,
    mutation: Mutacion
});