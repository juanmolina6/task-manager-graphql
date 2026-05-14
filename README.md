# API de Gestión de Tareas

La aplicación permite gestionar tareas mediante una API GraphQL e integrar el consumo de una API externa utilizando Axios.

---

# 🚀 Tecnologías utilizadas

- Node.js
- TypeScript
- Express
- GraphQL
- MongoDB
- Docker
- Axios
- Jest
- Nodemon

---

# 📌 Funcionalidades del sistema

- Crear tareas
- Consultar tareas
- Actualizar tareas
- Eliminar tareas
- Consumir API externa con Axios
- Realizar pruebas automáticas con Jest
- Conexión a MongoDB mediante Docker

---

# 📂 Estructura del proyecto

```bash
src/
│
├── models/
│   └── Task.ts
│
├── schema/
│   ├── typeDefs.ts
│   └── resolvers.ts
│
├── services/
│   └── apiExterna.ts
│
├── tests/
│   └── tarea.test.ts
│
└── index.ts

1️⃣ Clonar el repositorio
git clone https://github.com/juanmolina6/task-manager-graphql.git

2️⃣ Entrar al proyecto
cd task-manager-graphql

3️⃣ Instalar dependencias
npm install

📁 Variables de entorno
Crear un archivo llamado .env en la raíz del proyecto con el siguiente contenido:
PORT=4000
MONGO_URI=mongodb://localhost:27017/tasksdb

🐳 Configuración de MongoDB con Docker
Ejecutar MongoDB
docker compose up -d

Verificar contenedor
docker ps

▶️ Ejecutar el proyecto
Modo desarrollo
npm run dev

El servidor se ejecutará en:
http://localhost:4000

🌐 GraphQL
La interfaz GraphQL estará disponible en:
http://localhost:4000/graphql

📊 Ejemplos de consultas GraphQL
🔹 Obtener tareas
{
  tareas {
    id
    titulo
    descripcion
    completada
  }
}

🔹 Crear tarea
mutation {
  agregarTarea(
    titulo: "Nueva tarea"
    descripcion: "Ejemplo GraphQL"
  ) {
    id
    titulo
    descripcion
    completada
  }
}

🔹 Actualizar tarea
mutation {
  actualizarTarea(
    id: "ID_AQUI"
    titulo: "Proyecto terminado"
    descripcion: "CRUD completo"
    completada: true
  ) {
    titulo
    descripcion
    completada
  }
}

🔹 Eliminar tarea
mutation {
  eliminarTarea(
    id: "ID_AQUI"
  ) {
    id
  }
}

🔹 Consumir API externa con Axios
{
  usuarios {
    id
    name
    email
  }
}

🧪 Pruebas del proyecto
Ejecutar pruebas automáticas:
npm test
