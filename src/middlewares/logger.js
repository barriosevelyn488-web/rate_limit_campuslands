/**  
 * Middleware de Auditoria (Logger)  
 * --------------------------------  
 * Registra en consola el metodo HTTP, la ruta y la marca de tiempo de cada peticion.  
 */  
export function logger(req, res, next) {  
  const ahora = new Date().toISOString();  
  console.log(`[${ahora}] ${req.method} ${req.originalUrl}`);  
  next();  
}  
