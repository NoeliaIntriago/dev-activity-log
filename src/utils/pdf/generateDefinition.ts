import type { PdfData } from '@/assets/types/main'
import * as constants from './pdfLayoutConstants'
import type { TDocumentDefinitions } from 'pdfmake/interfaces'
import { constructNow, format } from 'date-fns'

export function generarPdfDefinition(data: PdfData): TDocumentDefinitions {
  return {
    footer: function (currentPage, pageCount) {
      return {
        margin: [
          constants.FOOTER_MARGIN_LEFT,
          constants.FOOTER_MARGIN_TOP,
          constants.FOOTER_MARGIN_RIGHT,
          constants.FOOTER_MARGIN_BOTTOM,
        ],
        layout: 'noBorders',
        table: {
          widths: ['*', '*'],
          body: [
            [
              {
                stack: [
                  {
                    text: `© ${new Date().getFullYear()} Dev Activity Log • Documento generado por Noelia Intriago`,
                    fontSize: 8,
                    color: 'gray',
                  },
                  {
                    text: 'Tool provided by Nols',
                    fontSize: 6,
                    color: 'gray',
                    italics: true,
                    opacity: 0.5,
                    margin: [0, 2, 0, 0],
                  },
                ],
                alignment: 'left',
              },
              {
                text: `Página ${currentPage} de ${pageCount}`,
                alignment: 'right',
                fontSize: 8,
                color: 'gray',
              },
            ],
          ],
        },
      }
    },
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
        tocItem: false,
        alignment: 'left',
      },
      {
        text: 'Actividades Realizadas',
        tocItem: false,
        style: 'subheader',
        alignment: 'left',
        margin: [0, 20, 0, 5],
      },
      {
        style: 'tableStyle',
        table: {
          widths: constants.TABLE_WIDTHS,
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
      data.annexes.length > 0
        ? data.annexes.map((base64) => ({
            image: base64,
            fit: [constants.FIT_IMAGE_WIDTH, constants.FIT_IMAGE_HEIGHT],
            alignment: 'center',
            tocItem: false,
            margin: [
              constants.IMAGE_MARGIN_LEFT,
              constants.IMAGE_MARGIN_TOP,
              constants.IMAGE_MARGIN_RIGHT,
              constants.IMAGE_MARGIN_BOTTOM,
            ],
          }))
        : [
            {
              text: 'No se han adjuntado anexos.',
              tocItem: false,
              alignment: 'center',
            },
          ],
      {
        text: `${data.owner}`,
        tocItem: false,
        alignment: 'center',
        italics: true,
        style: 'normal',
        pageBreak: 'before',
        margin: [0, 300, 0, 0],
      },
      {
        text: `RUC: ${data.ruc}`,
        tocItem: false,
        alignment: 'center',
        italics: true,
        style: 'normal',
        margin: [0, 5, 0, 0],
      },
      {
        text: `Fecha de generación: ${format(constructNow(undefined), 'yyyy/MMM/dd')}`,
        tocItem: false,
        alignment: 'center',
        italics: true,
        style: 'normal',
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
        margin: [0, 20, 0, 5],
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
      normal: {
        fontSize: 10,
      },
    },
  }
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
          text: `${format(data.period[0], 'yyyy/MMM/dd')} ~ ${format(data.period[1], 'yyyy/MMM/dd')}`,
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
          {
            text: extra.date,
            rowSpan: extra.activities.length,
            style: 'tableCellBold',
          },
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
