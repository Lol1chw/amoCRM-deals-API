import { getContacts, getLeadStatuses, getLeads, getUsers } from '@/services/leads'
import type { FormattedLead } from '@/types/table'

const server = Bun.serve({
  port: 3000,
  async fetch(req) {
    const url = new URL(req.url)

    if (url.pathname === '/api/leads') {
      const leads = await getLeads()
      const statuses = await getLeadStatuses()
      const users = await getUsers()

      const formattedLead: FormattedLead[] = []

      await Promise.all(leads.map(async (lead) => {
        const statusName = statuses.find(status => status.id === lead.status_id)!.name
        const responsiblePersonName = users._embedded.users.find(user => user.id === lead.responsible_user_id)!.name

        for (const contact of lead._embedded.contacts) {
          const contactsInfo = (await getContacts(contact._links.self.href))
          const contactInfo: { email: string | undefined, phone: string | undefined } = {
            email: undefined,
            phone: undefined,
          }

          if (contactsInfo.custom_fields_values) {
            for (const contactInfoArr of contactsInfo.custom_fields_values) {
              if (contactInfoArr.field_code === 'EMAIL') {
                contactInfo.email = contactInfoArr.values.find(value => value)?.value
              }
              else if (contactInfoArr.field_code === 'PHONE') {
                contactInfo.phone = contactInfoArr.values.find(value => value)?.value
              }
            }
          }

          formattedLead.push({
            id: lead.id,
            title: lead.name,
            price: lead.price,
            status: statusName,
            person_name: responsiblePersonName,
            created_at: lead.created_at,
            contacts: [{
              id: contactsInfo.id,
              person_name: contactsInfo.name,
              email: contactInfo.email,
              phone: contactInfo.phone,
            }],
          })
        }
      }))
      return new Response(JSON.stringify(formattedLead))
    }

    return new Response('404!')
  },
})

// eslint-disable-next-line no-console
console.log(`Listening on http://${server.hostname}:${server.port} ...`)
