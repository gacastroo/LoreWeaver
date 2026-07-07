const BASE_URL = (import.meta.env.VITE_API_URL || '/api').replace(/\/$/, '');

function getAuthToken() {
  return localStorage.getItem('token');
}

function buildUrl(endpoint) {
  if (/^https?:\/\//i.test(endpoint)) return endpoint;
  return `${BASE_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
}

function createHttpError(response, data) {
  const message = data?.message || data?.error || response.statusText || 'Error de petición';
  const error = new Error(message);

  // Mantiene compatibilidad con el uso anterior tipo Axios:
  // error.response?.status y error.response?.data?.message
  error.response = {
    status: response.status,
    statusText: response.statusText,
    data,
  };

  return error;
}

async function parseResponse(response) {
  if (response.status === 204) return null;

  const contentType = response.headers.get('content-type') || '';
  if (contentType.includes('application/json')) {
    return response.json();
  }

  const text = await response.text();
  return text || null;
}

async function request(method, endpoint, body, options = {}) {
  const headers = new Headers(options.headers || {});
  const token = getAuthToken();

  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  const hasBody = body !== undefined && body !== null;
  const isFormData = typeof FormData !== 'undefined' && body instanceof FormData;

  if (hasBody && !isFormData && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }

  const response = await fetch(buildUrl(endpoint), {
    ...options,
    method,
    headers,
    credentials: 'include',
    body: hasBody ? (isFormData ? body : JSON.stringify(body)) : undefined,
  });

  const data = await parseResponse(response);

  if (!response.ok) {
    if (response.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('usuario');

      if (window.location.pathname !== '/') {
        window.location.href = '/';
      }
    }

    throw createHttpError(response, data);
  }

  return {
    data,
    status: response.status,
    headers: response.headers,
  };
}

const API = {
  get: (endpoint, options) => request('GET', endpoint, undefined, options),
  post: (endpoint, data, options) => request('POST', endpoint, data, options),
  put: (endpoint, data, options) => request('PUT', endpoint, data, options),
  patch: (endpoint, data, options) => request('PATCH', endpoint, data, options),
  delete: (endpoint, options) => request('DELETE', endpoint, undefined, options),
};

export default API;
