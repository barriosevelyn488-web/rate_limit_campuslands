import { Router } from "express";  
import { libros } from "../data/libros.db.js";  
import { validarLibro } from "../middlewares/validator.js";  
import { crearLibroLimiter } from "../middlewares/rateLimiter.js";  
  
/**  
 * Enrutador Modular de Libros (express.Router)  
 * -------------------------------------------------  
 * Gestiona los 5 endpoints CRUD operando sobre el arreglo en memoria.  
 * Se monta en src/app.js bajo el prefijo "/api/libros", protegido  
 * por el middleware apiLimiter (5 solicitudes por minuto por IP).  
 */  
const router = Router();  
  
// 1. [GET] /api/libros - Listar todos los libros del arreglo  
router.get("/", (req, res) => {  
  res.status(200).json({  
    exito: true,  
    total: libros.length,  
    rateLimitInfo: req.rateLimit  
      ? {  
          limiteVentana: req.rateLimit.limit,  
          usados: req.rateLimit.current,  
          tokensRestantes: req.rateLimit.remaining  
        }  
      : undefined,  
    datos: libros  
  });  
});  
  
// 2. [GET] /api/libros/:id - Buscar un libro por su ID  
router.get("/:id", (req, res) => {  
  const idBuscado = parseInt(req.params.id, 10);  
  
  if (isNaN(idBuscado)) {  
    return res.status(400).json({  
      exito: false,  
      error: "El parametro ID debe ser un numero entero valido."  
    });  
  }  
  
  const libroEncontrado = libros.find((l) => l.id === idBuscado);  
  
  if (!libroEncontrado) {  
    return res.status(404).json({  
      exito: false,  
      error: `No se encontro ningun libro con el ID ${idBuscado}.`  
    });  
  }  
  
  res.status(200).json({  
    exito: true,  
    mensaje: "Libro encontrado exitosamente.",  
    libro: libroEncontrado  
  });  
});  
  
// 3. [POST] /api/libros - Crear un nuevo libro en el arreglo  
router.post("/", crearLibroLimiter, validarLibro, (req, res) => {  
  const { titulo, autor, genero, anio } = req.body;  
  
  const nuevoId =  
    libros.length > 0  
      ? Math.max(...libros.map((l) => l.id)) + 1  
      : 1;  
  
  const nuevoLibro = {  
    id: nuevoId,  
    titulo: titulo.trim(),  
    autor: autor.trim(),  
    genero: genero.trim(),  
    anio: Number(anio)  
  };  
  
  libros.push(nuevoLibro);  
  
  res.status(201).json({  
    exito: true,  
    mensaje: "Libro agregado exitosamente al catalogo en memoria.",  
    libro: nuevoLibro  
  });  
});  
  
// 4. [PUT] /api/libros/:id - Actualizar un libro existente  
router.put("/:id", validarLibro, (req, res) => {  
  const idBuscado = parseInt(req.params.id, 10);  
  
  if (isNaN(idBuscado)) {  
    return res.status(400).json({  
      exito: false,  
      error: "El parametro ID debe ser un numero entero valido."  
    });  
  }  
  
  const indice = libros.findIndex((l) => l.id === idBuscado);  
  
  if (indice === -1) {  
    return res.status(404).json({  
      exito: false,  
      error: `No se puede actualizar: No existe libro con ID ${idBuscado}.`  
    });  
  }  
  
  const { titulo, autor, genero, anio } = req.body;  
  
  libros[indice] = {  
    id: idBuscado,  
    titulo: titulo.trim(),  
    autor: autor.trim(),  
    genero: genero.trim(),  
    anio: Number(anio)  
  };  
  
  res.status(200).json({  
    exito: true,  
    mensaje: `Libro con ID ${idBuscado} actualizado correctamente.`,  
    libro: libros[indice]  
  });  
});  
  
// 5. [DELETE] /api/libros/:id - Eliminar un libro del arreglo  
router.delete("/:id", (req, res) => {  
  const idBuscado = parseInt(req.params.id, 10);  
  
  if (isNaN(idBuscado)) {  
    return res.status(400).json({  
      exito: false,  
      error: "El parametro ID debe ser un numero entero valido."  
    });  
  }  
  
  const indice = libros.findIndex((l) => l.id === idBuscado);  
  
  if (indice === -1) {  
    return res.status(404).json({  
      exito: false,  
      error: `No se puede eliminar: No existe libro con ID ${idBuscado}.`  
    });  
  }  
  
  const [libroEliminado] = libros.splice(indice, 1);  
  
  res.status(200).json({  
    exito: true,  
    mensaje: `Libro con ID ${idBuscado} eliminado del catalogo.`,  
    libro: libroEliminado  
  });  
});  
  
export default router;  
