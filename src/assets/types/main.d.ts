export type PdfData = {
  owner: string
  ruc: string
  period: string[]
  activities: Activity[]
  extras: Extras[]
  annexes: string[]
}

export type Extras = {
  date: string
  activities: Activity[]
}

export type Activity = {
  title: string
  description: string
}
