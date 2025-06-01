import type { PdfData } from '@/assets/types/main'
import moment from 'moment'
import type { TDocumentDefinitions } from 'pdfmake/interfaces'

export function generarPdfDefinition(data: PdfData): TDocumentDefinitions {
  console.log('generarPdfDefinition', data)

  const docDefinition = {
    content: [
      {
        text: 'Reporte de Entrega de Actividades de Desarrollo de Software',
        tocItem: false,
        style: 'header',
        alignment: 'center',
        margin: [0, 0, 0, 20],
      },
      {
        text: `Nombre del responsable: ${data.owner}`,
        tocItem: false,
        style: 'subheader',
        alignment: 'left',
      },
      {
        text: 'Este reporte detalle las actividades de programación realizadas.',
        alignment: 'left',
        tocItem: false,
      },
      {
        text: 'Actividades Realizadas',
        tocItem: false,
        style: 'subheader',
        alignment: 'left',
        margin: [0, 10, 0, 5],
      },
      {
        style: 'tableStyle',
        tocItem: false,
        table: {
          widths: ['*', 'auto', 'auto'],
          headerRows: 1,
          body: [...buildTableBody(data)],
        },
        layout: 'lightHorizontalLines',
      },
      {
        text: 'Anexos',
        tocItem: false,
        style: 'subheader',
        alignment: 'left',
        pageBreak: 'before',
        margin: [0, 10, 0, 5],
      },
      ...(data.annexes.length > 0
        ? data.annexes.map((base64) => ({
            image: base64,
            width: 400,
            alignment: 'center',
            tocItem: false,
            margin: [0, 10, 0, 10],
          }))
        : [
            {
              text: 'No se han adjuntado anexos.',
              alignment: 'center',
              tocItem: false,
            },
          ]),
      {
        text: `${data.owner}`,
        alignment: 'center',
        italics: true,
        margin: [0, 300, 0, 0],
      },
      {
        text: `RUC: ${data.ruc}`,
        alignment: 'center',
        italics: true,
        margin: [0, 5, 0, 0],
      },
      {
        text: `Fecha de generación: ${moment().format('DD/MM/YYYY')}`,
        alignment: 'center',
        italics: true,
        margin: [0, 5, 0, 0],
      },
    ],
    styles: {
      header: {
        fontSize: 24,
        bold: true,
        margin: [0, 0, 0, 10],
      },
      subheader: {
        fontSize: 13,
        bold: true,
        margin: [0, 10, 0, 5],
      },
      tableStyle: {
        margin: [0, 5, 0, 15],
      },
      tableHeader: {
        fontSize: 11,
        bold: true,
        fillColor: '#eeeeee',
        margin: [4, 2, 4, 2],
      },
      tableCell: {
        fontSize: 10,
        margin: [4, 2, 4, 2],
      },
      tableCellBold: {
        fontSize: 10,
        bold: true,
        margin: [4, 2, 4, 2],
      },
    },
  }

  return docDefinition
}

const buildTableBody = (data: PdfData) => {
  const body = []

  // Header row
  body.push([
    { text: 'Fecha', style: 'tableHeader' },
    { text: 'Actividad', style: 'tableHeader' },
    { text: 'Descripción', style: 'tableHeader' },
  ])

  // Data rows
  data.activities.forEach((activity, idx) => {
    if (idx === 0) {
      body.push([
        {
          text: `${moment(data.period[0]).format('DD/MM/YYYY')} ~ ${moment(data.period[1]).format('DD/MM/YYYY')}`,
          rowSpan: data.activities.length,
          style: 'tableCellBold',
        },
        { text: activity.title, style: 'tableCellBold' },
        { text: activity.description, style: 'tableCell' },
      ])
      return
    }
    body.push([
      { text: '', style: 'tableCellBold' },
      { text: activity.title, style: 'tableCellBold' },
      { text: activity.description, style: 'tableCell' },
    ])
  })

  data.extras.forEach((extra) => {
    extra.activities.forEach((actividad, idx) => {
      if (idx === 0) {
        body.push([
          { text: extra.date, rowSpan: extra.activities.length, style: 'tableCellBold' },
          { text: actividad.title, style: 'tableCellBold' },
          { text: actividad.description, style: 'tableCell' },
        ])
      } else {
        body.push([
          {}, // celda vacía por rowspan
          { text: actividad.title, style: 'tableCellBold' },
          { text: actividad.description, style: 'tableCell' },
        ])
      }
    })
  })

  return body
}
