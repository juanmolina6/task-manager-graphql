import mongoose from "mongoose";

// Esquema de tareas
const TaskSchema = new mongoose.Schema({

    titulo: String,
    descripcion: String,
    completada: Boolean

});

// Modelo Task
const Task = mongoose.model("Task", TaskSchema);

// Exportar modelo
export default Task;