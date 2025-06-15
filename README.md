# Dev Activity Log 🧾

![version](https://img.shields.io/badge/version-1.0.0-blue.svg)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
![vercel](https://img.shields.io/badge/deploy-vercel-brightgreen)

**Dev Activity Log** es una aplicación web construida con Vue 3 + TypeScript que permite registrar actividades realizadas durante periodos específicos y generar reportes en PDF listos para firmar. Es ideal para desarrolladores, docentes o cualquier persona que necesite documentar sus actividades de forma clara, visual y estructurada.

## ✨ Funcionalidades

- ✅ Registro de **actividades generales** durante un periodo (como quincenas).
- 📅 Registro de **actividades específicas por fecha** (feriados, fines de semana).
- 📎 Adjuntar imágenes como **anexos** desde el portapapeles o archivos locales.
- 👀 Previsualización de imágenes con opción de eliminación.
- 📄 Generación de un **reporte PDF** con:
  - Agrupación por fechas.
  - Diseño limpio y márgenes personalizados.
  - Espacio final para firma manual.
  - Marca de derecho de creación de contenido en el pie de página.
- 🔄 Botón para volver al inicio desde cualquier parte de la aplicación.
- 📀 Almacenamiento local de los datos ingresados para evitar la pérdida de información.
- 🔢 Ajuste automático de imágenes grandes para evitar inserciones de páginas adicionales en el PDF.
- 💾 Todo el proceso funciona **100% en el frontend** (sin backend).

## 🛠️ Tecnologías

- [Vue 3](https://vuejs.org/)
- [Vite](https://vitejs.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [PrimeVue](https://primevue.org/)
- [pdfmake](https://pdfmake.github.io/docs/)

## 📦 Instalación local

```bash
pnpm install
```

## 🔧 Desarrollo

```bash
pnpm dev
```

## 🧪 Lint y Build

```bash
pnpm lint
pnpm build
```

## 🔄 Releases automáticos

Este proyecto usa [semantic-release](https://semantic-release.gitbook.io/) para:

- Generar automáticamente el archivo CHANGELOG.md
- Crear nuevos releases en GitHub
- Versionar el código según los tipos de commits (feat:, fix:, etc.)

Para más información, consulta el archivo [CHANGELOG.md](/CHANGELOG.md).

## 📁 Estructura parcial del proyecto

```css
src/
├── components/
│   ├── ActivityForm.vue
│   └── report/
│       ├── AnnexUploader.vue
│       ├── GeneralPeriodSection.vue
│       ├── MetadataInputSection.vue
│       ├── PdfGeneratorSection.vue
│       ├── ReportSummary.vue
│       └── SpecificDatesSection.vue
├── composables/
│   ├── useLocalStorageSync.ts
│   └── useClipboardImagePaste.ts
├── utils/
│   ├── fileHandler.ts
│   └── pdf/
│       ├── generateDefinition.vue
│       └── pdfLayoutConstants.vue
└── App.vue
```

## 🌐 Despliegue

La app está desplegada en Vercel y se actualiza automáticamente con cada `push` a la rama `master`.

## 📸 Capturas de pantalla

### Formulario de actividades

![Formulario_Actividades](https://github.com/user-attachments/assets/5c339661-28db-4b3c-9a0d-f62dac8c4435)

### Vista previa de imágenes

![Vista_Previa_Imagenes](https://github.com/user-attachments/assets/6b4ae44d-99c3-4e9f-975d-b6a5e4d1d2fc)

### PDF generado con espacio de firma

_Nota: Las siguientes imágenes son de contenido privado y han sido censuradas intencionalmente para proteger la información confidencial._

![Pdf_Actividades](https://github.com/user-attachments/assets/d1cd4636-e91c-414e-9037-3f45957dd160)

![Pdf_Anexos](https://github.com/user-attachments/assets/19830a78-220a-43ef-a341-42ed3f921eb1)

![Pdf_Firma](https://github.com/user-attachments/assets/252b5771-3cc4-45a1-a576-4ef1b9e56a80)
                               
## 📋 Changelog

Consulta las versiones publicadas en el [CHANGELOG.md](/CHANGELOG.md) o en la [sección de releases](https://github.com/NoeliaIntriago/dev-activity-log/releases).

## 📜 Licencia

[MIT](/LICENSE)

Proyecto desarrollado por [NoeliaIntriago](https://github.com/NoeliaIntriago) como herramienta personal para documentar tareas de desarrollo y generar reportes firmables. Ideal para portafolios, evaluaciones académicas y laborales.
