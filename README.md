# Dev Activity Log 🧾

![version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![license](https://img.shields.io/github/license/NoeliaIntriago/dev-activity-log)
![issues](https://img.shields.io/github/issues/NoeliaIntriago/dev-activity-log)
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
│       ├── GeneralActivitySection.vue
│       ├── MetadataInputSection.vue
│       ├── PdfGeneratorSection.vue
│       ├── PeriodSelector.vue
│       ├── ReportSummary.vue
│       └── SpecificDatesSection.vue
├── composables/
│   └── useClipboardImagePaste.ts
├── utils/
│   ├── fileHandler.ts
│   └── pdfGenerator.ts
└── App.vue
```

## 🌐 Despliegue

La app está desplegada en Vercel y se actualiza automáticamente con cada `push` a la rama `master`.

## 📸 Capturas de pantalla

### Formulario de actividades

### Vista previa de imágenes

### PDF generado con espacio de firma

## 📋 Changelog

Consulta las versiones publicadas en el [CHANGELOG.md](/CHANGELOG.md) o en la [sección de releases](https://github.com/NoeliaIntriago/dev-activity-log/releases).

## 📜 Licencia

[MIT](/LICENSE)

Proyecto desarrollado por [NoeliaIntriago](https://github.com/NoeliaIntriago) como herramienta personal para documentar tareas de desarrollo y generar reportes firmables. Ideal para portafolios, evaluaciones académicas y laborales.
