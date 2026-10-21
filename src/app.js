import express from "express";  
import { logger } from "./middlewares/logger.js";  
  
const app = express();  
const PORT = process.env.PORT || 3000;  
  
app.use(express.json());  
app.use(logger);  
  
app.get("/", (req, res) => {  
  res.status(200).json({  
    mensaje: "Bienvenido a la API de Biblioteca protegida con express-rate-limit (Campuslands)"  
  });  
});  
  
app.listen(PORT, () => {  
  console.log(`Servidor de Biblioteca iniciado en http://localhost:${PORT}`);  
});  
  
export default app;  
