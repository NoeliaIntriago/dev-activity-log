export type PdfData = {
  owner: string
  period: string[]
  activities: Activity[]
  extras: Extras[]
  annexes: File[]
}

export type Extras = {
  date: string
  activities: Activity[]
}

export type Activity = {
  title: string
  description: string
}
