import mongoose from "mongoose";

// Esquema de tareas
const TaskSchema = new mongoose.Schema({
    titulo: String,
    descripcion: String,
    completada: Boolean
});

// Exportar modelo
const Task = mongoose.model("Task", TaskSchema);

export default Task;