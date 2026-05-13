const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLBoolean,
    GraphQLList,
    GraphQLSchema,
    GraphQLID
} = require("graphql");

const Tarea = require("../models/Task");
const { obtenerUsuarios } = require("../services/apiExterna");

const TipoTarea = new GraphQLObjectType({
    name: "Tarea",
    fields: () => ({
        id: { type: GraphQLID },
        titulo: { type: GraphQLString },
        descripcion: { type: GraphQLString },
        completada: { type: GraphQLBoolean }
    })
});
const TipoUsuario = new GraphQLObjectType({
    name: "Usuario",
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        email: { type: GraphQLString }
    })
});
const ConsultaPrincipal = new GraphQLObjectType({
    name: "ConsultaPrincipal",
    fields: {

        tareas: {
            type: new GraphQLList(TipoTarea),
            async resolve() {
                return await Tarea.find();
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

                const tarea = new Tarea({
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

                return await Tarea.findByIdAndDelete(args.id);

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

        return await Tarea.findByIdAndUpdate(
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
module.exports = new GraphQLSchema({
    query: ConsultaPrincipal,
    mutation: Mutacion
});