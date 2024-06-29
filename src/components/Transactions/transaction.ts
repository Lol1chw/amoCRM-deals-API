export type TransactionStatus = 'Первичный контакт' | 'Переговоры' | 'Принимают решение' | 'Согласование договора'

export interface Transaction {
  id: string
  title: string
  price: number
  status: TransactionStatus
  person_name: string
  created_at: number
}

// Stub before api queries and array filling
export const transactions: Transaction[] = [
  {
    id: '728ed52f',
    title: 'Разработка b2b системы',
    price: 1000,
    status: 'Первичный контакт',
    person_name: 'Иван Иванов',
    created_at: 1719630480,
  },
  {
    id: '489e1d42',
    title: 'Разработка интернет-магазина',
    price: 1250,
    status: 'Переговоры',
    person_name: 'Андрей Андреевич',
    created_at: 1719630480,
  },
]
