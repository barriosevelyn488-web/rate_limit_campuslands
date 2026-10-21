/**  
 * Middleware de Validacion de Libros  
 * ---------------------------------------  
 * Verifica que el cuerpo de la peticion (req.body) en POST y PUT contenga  
 * los campos obligatorios: titulo, autor, genero y anio.  
 */  
  
export function validarLibro(req, res, next) {  
  if (!req.body || typeof req.body !== "object") {  
    return res.status(400).json({  
      exito: false,  
      error: "Se requiere enviar un cuerpo JSON valido en la solicitud."  
    });  
  }  
  
  const { titulo, autor, genero, anio } = req.body;  
  
  if (!titulo || typeof titulo !== "string" || titulo.trim().length === 0) {  
    return res.status(400).json({  
      exito: false,  
      error: "El campo 'titulo' del libro es obligatorio."  
    });  
  }  
  
  if (!autor || typeof autor !== "string" || autor.trim().length === 0) {  
    return res.status(400).json({  
      exito: false,  
      error: "El campo 'autor' es obligatorio."  
    });  
  }  
  
  if (!genero || typeof genero !== "string" || genero.trim().length === 0) {  
    return res.status(400).json({  
      exito: false,  
      error: "El campo 'genero' es obligatorio (ej: Novela, Fabula, Poesia)."  
    });  
  }  
  
  const anioNum = Number(anio);  
  if (anio === undefined || anio === null || isNaN(anioNum) || anioNum < 0) {  
    return res.status(400).json({  
      exito: false,  
      error: "El campo 'anio' debe ser un numero valido mayor o igual a 0."  
    });  
  }  
  
  // Si todos los datos son validos, continuamos al controlador  
  next();  
}  
