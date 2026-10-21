import { rateLimit } from 'express-rate-limit';  
  
// Definir y exportar el limitador de tasa como middleware reutilizable  
export const apiLimiter = rateLimit({  
  windowMs: 60 * 1000, // 1 minuto  
  max: 5, // 5 solicitudes por minuto  
  statusCode: 429,  
  standardHeaders: 'draft-7',  
  legacyHeaders: true,  
  message: {  
    exito: false,  
    error: 'Demasiadas solicitudes desde esta IP, por favor intenta de nuevo en un minuto.'  
  },  
});  
