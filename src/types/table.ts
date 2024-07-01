export interface FormattedLead {
  id: number
  title: string
  price: number
  status: LeadStatus
  person_name: string
  created_at: number
}

export type LeadStatus = 'Первичный контакт' | 'Переговоры' | 'Принимают решение' | 'Согласование договора' | 'Успешно реализовано' | 'Закрыто и не реализовано'
