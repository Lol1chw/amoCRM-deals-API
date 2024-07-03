import { h, ref } from 'vue'
import { createColumnHelper } from '@tanstack/vue-table'
import { ChevronsUpDown, Mail, Phone } from 'lucide-vue-next'
import type { WritableComputedRef } from 'vue'
import type { Row } from '@tanstack/vue-table'
import User from '@/components/User/User.vue'
import { getDateByUnix } from '@/lib/getTime'
import { Badge } from '@/components/ui/badge'
import type { ExpandedStateContent, FormattedLead, LeadStatus } from '@/types/table'
import { Button } from '@/components/ui/button'
import CopyButton from '@/components/CopyButton/CopyButton.vue'

const headerClassName = 'font-bold text-foreground'

const columnHelper = createColumnHelper<FormattedLead>()

function renderExpanded(row: Row<FormattedLead>) {
  if (!row.getCanExpand()) {
    return ''
  }
  return h(Button, {
    'onClick': row.getToggleExpandedHandler(),
    'data-state': row.getIsExpanded() ? 'open' : 'closed',
    'size': 'icon',
    'variant': 'ghost',
  }, () => h(ChevronsUpDown, { class: 'h-4 w-4 shrink-0 opacity-50' }))
}

// Rendering expanded rows via render function to increase reusability of DataTable component
function renderExpandedCell(row: Row<FormattedLead>, { setExpandedRowByStateId }: Omit<DefaultColumnsProps, 'expandedContent'>) {
  if (row.original.contacts) {
    const rowID = Number.parseInt(row.id)
    for (const contact of row.original.contacts) {
      setExpandedRowByStateId(rowID, h('div', { class: 'flex items-center gap-2', style: { paddingLeft: `${row.depth * 2}rem` } }, [
        h(User, {
          name: contact.person_name,
        }),
        contact.phone && h(CopyButton, { tooltip: 'Copy phone', text: contact.phone }, { icon: () => h(Phone) }),
        contact.email && h(CopyButton, { tooltip: 'Copy email', text: contact.email }, { icon: () => h(Mail) }),
      ]), 0)
    }
  }
}

const statusColorMap: { [key in LeadStatus]: string } = {
  'Первичный контакт': '#99ccff',
  'Переговоры': '#ffff99',
  'Принимают решение': '#ffcc66',
  'Согласование договора': '#ffcccc',
  'Успешно реализовано': '#CCFF66',
  'Закрыто и не реализовано': '#D5D8DB',
}

interface DefaultColumnsProps {
  expandedContent: WritableComputedRef<any[]>
  setExpandedRowByStateId: (id: number, content: ExpandedStateContent, columnIndex: number) => void
}

export function defaultColumns({ setExpandedRowByStateId }: DefaultColumnsProps) {
  return [
    columnHelper.accessor('title', {
      header: () => h('div', { class: headerClassName }, 'Название'),
    }),
    columnHelper.accessor('status', {
      header: () => h('div', { class: headerClassName }, 'Статус'),
      cell: ({ getValue }) => {
        const status = getValue()

        return h(Badge, {
          class: 'text-black font-medium',
          style: `background-color: ${statusColorMap[status]}`,
        }, () => status)
      },
    }),
    columnHelper.accessor('price', {
      header: () => h('div', { class: headerClassName }, 'Бюджет'),
      cell: ({ getValue }) => {
        const formatted = new Intl.NumberFormat('ru-RU', {
          style: 'currency',
          currency: 'RUB',
        }).format(getValue())

        return h('div', { class: 'font-medium' }, formatted)
      },
    }),
    columnHelper.accessor('person_name', {
      header: () => h('div', { class: headerClassName }, 'Ответственный'),
      cell: ({ getValue }) => {
        return h(User, {
          name: getValue(),
        })
      },
    }),
    columnHelper.accessor('created_at', {
      header: () => h('div', { class: headerClassName }, 'Дата создания'),
      cell: ({ getValue }) => {
        const formattedDate = getDateByUnix(getValue())

        return h('div', formattedDate)
      },
    }),
    columnHelper.display({
      id: 'actions',
      maxSize: 0,
      cell: ({ row }) => {
        renderExpandedCell(row, { setExpandedRowByStateId })

        return renderExpanded(row)
      },
    }),
  ]
}

export const data = ref<FormattedLead[]>([])
