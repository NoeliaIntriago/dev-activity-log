import type { PdfData } from '@/assets/types/main'

export function generarPdfDefinition(data: PdfData, name: string): object {
  const docDefinition = {
    content: [
      {
        text: 'Reporte de Entrega de Actividades de Desarrollo de Software',
        style: 'header',
        alignment: 'center',
      },
      {
        text: `Nombre del Responsable: ${name}`,
        style: 'subheader',
      },

      { text: 'Actividades Realizadas', style: 'sectionHeader' },
    ],
  }

  return docDefinition
}
