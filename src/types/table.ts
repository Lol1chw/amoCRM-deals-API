import type { VNode } from 'vue'

export interface FormattedLead {
  id: number
  title: string
  price: number
  status: LeadStatus
  person_name: string
  created_at: number
  contacts: {
    id: number
    person_name: string
    phone?: string
    email?: string
  }[]
}

export type LeadStatus = 'Первичный контакт' | 'Переговоры' | 'Принимают решение' | 'Согласование договора' | 'Успешно реализовано' | 'Закрыто и не реализовано'

export type ExpandedStateContent = string | number | VNode

export interface ExpandedState {
  content: () => ExpandedStateContent
  columnIndex: number
}
