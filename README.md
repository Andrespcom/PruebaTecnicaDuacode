# Duacode Angular CRUD

Esta es mi propuesta para la prueba técnica de Duacode, hecha con Angular y TailwindCSS.

## Funcionalidades

- Muestra un listado de usuarios desde [ReqRes API](https://reqres.in)
- Puedes ver el detalle de cada usuario
- Crear nuevos usuarios (con validaciones)
- Editarlos o eliminarlos
- Buscar por nombre en tiempo real
- Ordenar los usuarios por nombre
- Navegar por páginas (6 por página)
- Cargar más usuarios con un botón si lo necesitas
- Es responsive y tiene animaciones suaves
- Muestra confirmaciones visuales al guardar o eliminar

## Tests

Incluí algunos tests básicos para comprobar que todo se renderiza y responde como debe.

**Nota importante**:  
La API de ReqRes no guarda los datos realmente (solo simula que sí), así que:
- Algunos tests pueden fallar si dependen de que los datos persistan. (fallan)
- Aun así, he probado toda la app a mano y funciona correctamente.

## Funcionamiento

```bash
git clone https://github.com/Andrespcom/PruebaTecnicaDuacode.git
cd duacode-angular-crud
npm install
ng serve