const mongoose = require("mongoose");

const TareaSchema = new mongoose.Schema({
    titulo: String,
    descripcion: String,
    completada: Boolean
});

module.exports = mongoose.model("Tarea", TareaSchema);