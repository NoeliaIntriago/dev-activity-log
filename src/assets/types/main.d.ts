export type PdfData = {
  period: string[]
  activities: Activity[]
  extras: Extras
}

export type Extras = {
  date: string
  activities: Activity[]
}

export type Activity = {
  title: string
  description: string
}
