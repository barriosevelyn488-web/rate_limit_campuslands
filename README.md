# express-ratelimit-biblioteca  
  
API REST de Biblioteca protegida con `express-rate-limit` (ESM).  

## autora
Evelyn Barrios
  
## Instalacion y uso  
  
npm install  
npm start  
  
Servidor en http://localhost:3000  
  
## Limites configurados  
  
| Limiter           | Ruta               | Limite    |  
|-------------------|--------------------|-----------|  
| apiLimiter        | /api/              | 5 req/min |  
| crearLibroLimiter | POST /api/libros   | 3 req/min |  
  
## Endpoints  
  
- GET  /               - Bienvenida  
- GET  /api/libros     - Listar catalogo (con info de rate limit)  
- GET  /api/libros/:id - Obtener libro  
- POST /api/libros     - Crear libro (titulo, autor, genero, anio)  
- PUT  /api/libros/:id - Actualizar libro  
- DELETE /api/libros/:id - Eliminar libro  
  
## Estructura  
  
src/  
├── app.js  
├── helperLimit.js  
├── data/libros.db.js  
├── middlewares/{rateLimiter, logger, validator, errorHandler}.js  
└── routes/libros.routes.js  
  
## Flujo de ramas  
  
main -> dev -> feature/rate-limiter, feature/validacion, feature/rutas-crud, feature/app-integracion  
