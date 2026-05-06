const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

async function request(endpoint, options = {}) {
  const token = localStorage.getItem('token')

  const config = {
    method: options.method || 'GET',

    headers: {
      'Content-Type': 'application/json',

      ...(token
        ? {
            Authorization: `Bearer ${token}`,
          }
        : {}),

      ...options.headers,
    },

    ...options,
  }

  // Convert object body to JSON
  if (config.body && typeof config.body === 'object') {
    config.body = JSON.stringify(config.body)
  }

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, config)

    // Handle empty responses
    const data = await response.json().catch(() => ({}))

    if (!response.ok) {
      throw new Error(data.message || 'Request failed')
    }

    return data
  } catch (error) {
    console.error('API Error:', error.message)
    throw error
  }
}

export const api = {
  get: (endpoint) => request(endpoint),

  post: (endpoint, data) =>
    request(endpoint, {
      method: 'POST',
      body: data,
    }),

  put: (endpoint, data) =>
    request(endpoint, {
      method: 'PUT',
      body: data,
    }),

  patch: (endpoint, data) =>
    request(endpoint, {
      method: 'PATCH',
      body: data,
    }),

  delete: (endpoint) =>
    request(endpoint, {
      method: 'DELETE',
    }),
}