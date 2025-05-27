const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'https://airline-service-f9h1.onrender.com';

export async function login(email: string, password: string) {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || 'Error al iniciar sesión');
  }

  // Guardar tokens si la respuesta es correcta
  localStorage.setItem('accessToken', data.accessToken);
  localStorage.setItem('refreshToken', data.refreshToken);

  return data;
}


/**
 * Registra un nuevo usuario.
 */
export async function register(userData: {
  name: string;
  email: string;
  password: string;
  birthDate: string;
  address: string;
  role?: string;
}) {
  const res = await fetch(`${API_BASE}/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'Error al registrar usuario');
  }

  return await res.json();
}

/**
 * Refresca el access token usando el refresh token almacenado.
 */
export async function refreshAccessToken() {
  const refreshToken = localStorage.getItem('refreshToken');
  if (!refreshToken) {
    throw new Error('No hay refresh token disponible');
  }

  const res = await fetch(`${API_BASE}/auth/refresh`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refreshToken }),
  });

  if (!res.ok) {
    throw new Error('No se pudo renovar el access token');
  }

  const data = await res.json();
  localStorage.setItem('accessToken', data.accessToken);
  return data.accessToken;
}
