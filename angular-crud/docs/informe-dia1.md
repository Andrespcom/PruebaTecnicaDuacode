# Informe Día 1 - Prueba Técnica Angular

## Tiempo dedicado
- ~2h 30min reales (incluyendo TODO el setup, pruebas y organización).

## Recursos utilizados
- Angular CLI con componentes standalone.
- TailwindCSS para estilos.
- API pública: https://reqres.in/
- VSCode + terminal integrada.

## Estructura montada
- Proyecto Angular configurado con routing y estilos.
- Componentes iniciales:
  - `UserListComponent` (listado de usuarios)
  - `UserDetailComponent` (detalle de usuario)
- Servicios:
  - `UserService` conectado a API externa.
- Interfaz `User` definida.
- TailwindCSS instalado y funcionando.

## Problemas encontrados
- Error al usar `*ngIf` por falta de `CommonModule` en componentes standalone.
- Confusión inicial por no tener `AppModule`, pero confirmado uso de arquitectura moderna.
- Instalación de Tailwind en carpeta incorrecta inicialmente, luego corregido.

## Siguiente paso
- Crear `UserFormComponent` con validaciones.
- Añadir rutas (`user/:id`, `create`, `edit/:id`).
- Finalizar CRUD: editar, eliminar, crear.
- Aplicar diseño visual final con Tailwind.