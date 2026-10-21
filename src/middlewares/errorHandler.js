/**  
 * Middleware Global de Manejo de Errores (4 parametros)  
 * -----------------------------------------------------  
 * Captura cualquier error no controlado y responde en formato JSON uniforme.  
 */  
export function errorHandler(err, req, res, next) {  
  console.error("Error:", err.message);  
  res.status(err.status || 500).json({  
    exito: false,  
    error: err.message || "Error interno del servidor de biblioteca."  
  });  
}  
