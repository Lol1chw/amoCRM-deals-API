import { h, ref } from 'vue'

import type { ColumnDef } from '@tanstack/vue-table'
import User from '@/components/User/User.vue'
import { getDateByUnix } from '@/lib/getTime'
import { Badge } from '@/components/ui/badge'
import type { FormattedLead, LeadStatus } from '@/types/table'

const headerClassName = 'font-bold text-foreground'

export const defaultColumns: ColumnDef<FormattedLead>[] = [
  {
    accessorKey: 'title',
    header: () => h('div', { class: headerClassName }, 'Название'),
  },
  {
    accessorKey: 'status',
    header: () => h('div', { class: headerClassName }, 'Статус'),
    cell: ({ row }) => {
      const status = row.getValue('status') as LeadStatus
      const statusColorMap: { [key in LeadStatus]: string } = {
        'Первичный контакт': '#99ccff',
        'Переговоры': '#ffff99',
        'Принимают решение': '#ffcc66',
        'Согласование договора': '#ffcccc',
        'Успешно реализовано': '#CCFF66',
        'Закрыто и не реализовано': '#D5D8DB',
      }

      return h(Badge, {
        class: `text-black font-medium`,
        style: `background-color: ${statusColorMap[status]}`,
        // Use the functional value because slot
      }, () => row.getValue('status'))
    },
  },
  {
    accessorKey: 'price',
    header: () => h('div', { class: headerClassName }, 'Бюджет'),
    cell: ({ row }) => {
      const price = Number.parseFloat(row.getValue('price'))
      const formatted = new Intl.NumberFormat('ru-RU', {
        style: 'currency',
        currency: 'RUB',
      }).format(price)

      return h('div', { class: 'font-medium' }, formatted)
    },
  },
  {
    accessorKey: 'person_name',
    header: () => h('div', { class: headerClassName }, 'Ответственный'),
    cell: ({ row }) => {
      return h(User, {
        name: row.getValue('person_name'),
      })
    },
  },
  {
    accessorKey: 'created_at',
    header: () => h('div', { class: headerClassName }, 'Дата создания'),
    cell: ({ row }) => {
      const formattedDate = getDateByUnix(row.getValue('created_at'))
      return h('div', formattedDate)
    },
  },
]

export const data = ref<FormattedLead[]>([])
