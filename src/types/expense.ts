export interface FormData {
  merchant: string
  amount: string
  category: string
  notes: string
}

export interface ReceiptData {
  name: string
  date: string
  description: string
  total_amount: number
  item: string
  raw_response: {
    name: string
    date_of_transaction: string
    description: string
    item: string
    total_amount: string
  }
  product: string | null
  category: string | null
}

export interface FileUploadResponse {
  success: boolean
  data?: ReceiptData
  error?: string
}

export const CATEGORY_OPTIONS = [
  'Advertising',
  'Car & Truck Expenses',
  'Commissions & Fees',
  'Contract Labor',
  'Home Office',
  'Insurance',
  'Meals',
  'Office Supplies',
  'Professional Services',
  'Rent',
  'Software & Subscriptions',
  'Travel',
  'Utilities',
  'Other',
] as const

export type Category = typeof CATEGORY_OPTIONS[number] 