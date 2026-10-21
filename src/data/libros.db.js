/**  
 * Base de Datos en Memoria: Catalogo de Libros (Arreglo JavaScript Nativo)  
 * -----------------------------------------------------------------------------  
 * En este ejercicio pedagogico no utilizamos un motor de base de datos externo.  
 * Los libros se almacenan en un arreglo mutable en memoria RAM exportado  
 * mediante ECMAScript Modules (ESM).  
 */  
  
export let libros = [  
  { id: 1, titulo: "Cien anos de soledad", autor: "Gabriel Garcia Marquez", genero: "Realismo magico", anio: 1967 },  
  { id: 2, titulo: "El principito", autor: "Antoine de Saint-Exupery", genero: "Fabula", anio: 1943 },  
  { id: 3, titulo: "Don Quijote de la Mancha", autor: "Miguel de Cervantes", genero: "Novela", anio: 1605 },  
  { id: 4, titulo: "1984", autor: "George Orwell", genero: "Distopia", anio: 1949 }  
];  
  
export function reiniciarLibros() {  
  libros.length = 0;  
  libros.push(  
    { id: 1, titulo: "Cien anos de soledad", autor: "Gabriel Garcia Marquez", genero: "Realismo magico", anio: 1967 },  
    { id: 2, titulo: "El principito", autor: "Antoine de Saint-Exupery", genero: "Fabula", anio: 1943 },  
    { id: 3, titulo: "Don Quijote de la Mancha", autor: "Miguel de Cervantes", genero: "Novela", anio: 1605 },  
    { id: 4, titulo: "1984", autor: "George Orwell", genero: "Distopia", anio: 1949 }  
  );  
  return libros;  
}  
