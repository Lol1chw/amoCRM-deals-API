import { api } from './instance'
import type { LeadStatus } from '@/types/table'

interface Lead {
  id: number
  name: string
  price: number
  responsible_user_id: number
  status_id: number
  created_at: number
  _embedded: {
    contacts: Contact[]
  }
}

interface Contact {
  id: number
  _links: EmbeddedLink
}

interface EmbeddedLink {
  self: {
    href: string
  }
}

interface LeadsResponse {
  _embedded: {
    leads: Lead[]
  }
}

interface LeadsPipelineResponse {
  _embedded: {
    pipelines: {
      _embedded: {
        statuses: {
          id: number
          name: LeadStatus
        }[]
      }
    }[]
  }
}

export interface ContactResponse {
  id: number
  name: string
  custom_fields_values: CustomFieldValue[]
}

interface UserResponse {
  _embedded: {
    users: {
      id: number
      name: string
    }[]
  }
}

interface StatusResponse {
  id: number
  name: LeadStatus
}

export interface CustomFieldValue {
  field_code: 'EMAIL' | 'PHONE'
  values: {
    value: string
  }[]
}

export async function getLeads(): Promise<Lead[]> {
  try {
    const response = await api.get<LeadsResponse>(`/api/v4/leads?with=contacts`)

    const leads: Lead[] = response._embedded.leads.map(lead => ({
      id: lead.id,
      name: lead.name,
      responsible_user_id: lead.responsible_user_id,
      price: lead.price,
      created_at: lead.created_at,
      status_id: lead.status_id,
      _embedded: lead._embedded,
    }))

    return leads
  }
  catch (error) {
    console.error(error)

    return Promise.reject(error)
  }
}

export async function getLeadStatuses(): Promise<StatusResponse[]> {
  try {
    const response = await api.get<LeadsPipelineResponse>(`/api/v4/leads/pipelines`)
    const pipelines = response._embedded.pipelines

    const statuses: StatusResponse[] = []

    pipelines.forEach((pipeline) => {
      pipeline._embedded.statuses.forEach(status => statuses.push({
        id: status.id,
        name: status.name,
      }))
    })

    return statuses
  }
  catch (error) {
    console.error(error)

    return Promise.reject(error)
  }
}

export async function getContacts(endpoint: string): Promise<ContactResponse> {
  try {
    const contacts = api.get<ContactResponse>(endpoint)

    return contacts
  }
  catch (error) {
    console.error(error)

    return Promise.reject(error)
  }
}

export async function getUsers(): Promise<UserResponse> {
  try {
    const users = api.get<UserResponse>('/api/v4/users')

    return users
  }
  catch (error) {
    console.error(error)

    return Promise.reject(error)
  }
}
