/**  
 * Servidor Principal Express con Middleware express-rate-limit (ESM)  
 * ------------------------------------------------------------------  
 * Aplicacion educativa de Campuslands que protege una API REST de Libros  
 * almacenados en un arreglo en memoria utilizando express-rate-limit como middleware.  
 */  
  
import express from "express";  
import { logger } from "./middlewares/logger.js";  
import { apiLimiter } from "./middlewares/rateLimiter.js";  
import { errorHandler } from "./middlewares/errorHandler.js";  
import librosRouter from "./routes/libros.routes.js";  
  
// 1. Instanciar la aplicacion Express  
const app = express();  
const PORT = process.env.PORT || 3000;  
  
// 2. Middlewares Globales de Parseo y Auditoria  
app.use(express.json());  
app.use(logger);  
  
// 3. Ruta Publica de Bienvenida (sin limite estricto de API)  
app.get("/", (req, res) => {  
  res.status(200).json({  
    mensaje: "Bienvenido a la API de Biblioteca protegida con express-rate-limit (Campuslands)",  
    seguridad: "Middleware express-rate-limit activo en /api/ (Max. 5 peticiones por minuto por IP)",  
    almacenamiento: "Arreglo de libros en memoria RAM (sin base de datos externa)",  
    endpoints: {  
      listar_libros: "GET /api/libros",  
      buscar_por_id: "GET /api/libros/:id",  
      crear_libro: "POST /api/libros",  
      actualizar_libro: "PUT /api/libros/:id",  
      eliminar_libro: "DELETE /api/libros/:id"  
    }  
  });  
});  
  
// 4. Aplicar el middleware de Rate Limit a todas las rutas que comiencen con '/api/'  
app.use("/api/", apiLimiter);  
  
// 5. Montar el Enrutador Modular de Libros  
app.use("/api/libros", librosRouter);  
  
// 6. Middleware para Rutas Inexistentes (404 Not Found)  
app.use((req, res) => {  
  res.status(404).json({  
    exito: false,  
    error: `La ruta '${req.method} ${req.originalUrl}' no existe en el servidor de biblioteca.`  
  });  
});  
  
// 7. Middleware Global de Manejo de Errores (4 parametros)  
app.use(errorHandler);  
  
// 8. Iniciar el servidor HTTP si no estamos en modo test  
if (process.env.NODE_ENV !== "test") {  
  app.listen(PORT, () => {  
    console.log(`\n=============================================================`);  
    console.log(`Servidor de Biblioteca iniciado en http://localhost:${PORT}`);  
    console.log(`Rate Limit activo en /api/libros (Max: 5 req / min)`);  
    console.log(`=============================================================\n`);  
  });  
}  
  
export default app;  
