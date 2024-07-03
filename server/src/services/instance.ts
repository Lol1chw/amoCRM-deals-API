type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE'

interface FetchOptions {
  method: HttpMethod
  headers?: HeadersInit
  body?: any
}

class FetchInstance {
  private baseUrl: string
  private defaultHeaders: HeadersInit

  constructor(baseUrl: string, defaultHeaders: HeadersInit = {}) {
    this.baseUrl = baseUrl
    this.defaultHeaders = defaultHeaders
  }

  private async request(endpoint: string, options: FetchOptions) {
    const url = endpoint.startsWith('http') ? endpoint : `${this.baseUrl}${endpoint}`
    const headers = { ...this.defaultHeaders, ...options.headers }
    const response = await fetch(url, {
      method: options.method,
      headers,
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    return response.json()
  }

  public get<T>(endpoint: string, headers?: HeadersInit): Promise<T> {
    return this.request(endpoint, { method: 'GET', headers })
  }
}

const TOKEN = Bun.env.TOKEN

export const api = new FetchInstance('https://vesipaj390.amocrm.ru', {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${TOKEN}`,
})
