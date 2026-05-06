const BASE_URL = ''

async function request(endpoint, options = {}) {
  const token = localStorage.getItem('token')
  
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
    ...options,
  }

  if (config.body && typeof config.body === 'object') {
    config.body = JSON.stringify(config.body)
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, config)
  
  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Request failed' }))
    throw new Error(error.message || 'Request failed')
  }

  return response.json()
}

export const api = {
  get: (endpoint) => request(endpoint),
  post: (endpoint, data) => request(endpoint, { method: 'POST', body: data }),
  put: (endpoint, data) => request(endpoint, { method: 'PUT', body: data }),
  patch: (endpoint, data) => request(endpoint, { method: 'PATCH', body: data }),
  delete: (endpoint) => request(endpoint, { method: 'DELETE' }),
}
