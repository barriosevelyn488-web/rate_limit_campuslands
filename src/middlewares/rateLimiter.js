/**  
 * Configuracion del Middleware express-rate-limit (rateLimiter)  
 * ---------------------------------------------------------------------------  
 * Este modulo centraliza los limitadores de tasa de solicitudes (Rate Limiters)  
 * para proteger nuestra API REST de Libros contra ataques de Denegacion  
 * de Servicio (DoS), fuerza bruta y abuso de peticiones por direccion IP.  
 */  
  
import { rateLimit } from "express-rate-limit";  
  
/**  
 * 1. Limitador General para la API (/api/)  
 * Permite un maximo de 5 solicitudes por minuto por direccion IP.  
 * Al hacer la solicitud #6 dentro del mismo minuto, devuelve HTTP 429.  
 */  
export const apiLimiter = rateLimit({  
  windowMs: 60 * 1000, // 1 minuto (60 segundos * 1000 milisegundos)  
  limit: 5, // Maximo 5 solicitudes (tokens) por ventana de 1 minuto  
  statusCode: 429, // Codigo HTTP 429: Too Many Requests  
  standardHeaders: "draft-7", // Agrega cabecera estandar RateLimit (IETF draft-7)  
  legacyHeaders: true, // Agrega X-RateLimit-Limit, X-RateLimit-Remaining y X-RateLimit-Reset  
  message: {  
    exito: false,  
    status: 429,  
    error: "Demasiadas solicitudes desde esta IP, por favor intenta de nuevo en un minuto.",  
    detalle: "Has agotado tus 5 tokens disponibles en la ventana actual de 60 segundos."  
  }  
});  
  
/**  
 * 2. Limitador Estricto para Registro de Libros (POST /api/libros)  
 * Protege especificamente la ruta de escritura permitiendo maximo 3 registros por minuto.  
 */  
export const crearLibroLimiter = rateLimit({  
  windowMs: 60 * 1000, // 1 minuto  
  limit: 3, // Maximo 3 creaciones por minuto por IP  
  statusCode: 429,  
  standardHeaders: "draft-7",  
  legacyHeaders: true,  
  message: {  
    exito: false,  
    status: 429,  
    error: "Limite de registro alcanzado: Solo puedes agregar 3 libros por minuto.",  
    detalle: "Espera a que se reinicie la ventana de tiempo antes de enviar otro POST."  
  }  
});  
