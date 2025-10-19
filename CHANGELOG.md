# Changelog

Todas las versiones siguen el formato [SemVer](https://semver.org/lang/es/) y el estándar de [Conventional Commits](https://www.conventionalcommits.org/).

## [1.0.0] - 2025-06-08

### 🚀 Funcionalidad principal

- Registro de actividades generales por quincena (título + descripción).
- Registro de actividades específicas por fecha (feriados, fines de semana).
- Adjuntar imágenes como anexos desde el portapapeles o archivos locales.
- Vista previa de anexos con opción de eliminación.
- Generación de PDF con:
  - Agrupación por fechas.
  - Formato legible y márgenes personalizados.
  - Espacio para firma al final.
- Validaciones básicas (título obligatorio, no guardar actividades vacías).

## [1.0.1] - 2025-06-15

### ✨ Mejoras sobre 1.0.0

- Pie de página con crédito de autoría en los PDF, alineado con el estilo del documento.
- Persistencia local de datos (local storage) para evitar pérdidas de información entre sesiones.
- Redimensionamiento automático de anexos: las imágenes grandes se ajustan para prevenir saltos de página inesperados.
- Limpieza rápida de la app: nuevo botón para borrar toda la información guardada de forma segura.
- Navegación mejorada: botón “Volver al inicio” disponible desde cualquier vista.ión.
