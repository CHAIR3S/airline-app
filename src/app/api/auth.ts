'use client'

import Cookies from 'js-cookie'

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'https://airline-service-f9h1.onrender.com'

const ACCESS_TOKEN_KEY = 'accessToken'
const REFRESH_TOKEN_KEY = 'refreshToken'

// Login y guarda tokens en cookies
export async function login(email: string, password: string) {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  })

  const data = await res.json()

  if (!res.ok) {
    throw new Error(data.message || 'Error al iniciar sesión')
  }

  // Guardar en cookies seguras
  Cookies.set(ACCESS_TOKEN_KEY, data.accessToken, {
    secure: true,
    sameSite: 'strict',
    expires: 1, // 1 día
  })
  Cookies.set(REFRESH_TOKEN_KEY, data.refreshToken, {
    secure: true,
    sameSite: 'strict',
    expires: 7, // 7 días
  })
  localStorage.setItem('user', JSON.stringify(data.returnUser))

  return data
}

// Registro
export async function register(userData: {
  name: string
  email: string
  passwordHash: string
  birthDate: string
  address: string
  role?: string
}) {
  const res = await fetch(`${API_BASE}/user`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  })

  if (!res.ok) {
    const error = await res.json()
    throw new Error(error.message || 'Error al registrar usuario')
  }

  return await res.json()
}

// Refresca el accessToken desde la cookie de refreshToken
export async function refreshAccessToken() {
  const refreshToken = Cookies.get(REFRESH_TOKEN_KEY)
  if (!refreshToken) {
    throw new Error('No hay refresh token disponible')
  }

  const res = await fetch(`${API_BASE}/auth/refresh`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refreshToken }),
  })

  if (!res.ok) {
    throw new Error('No se pudo renovar el access token')
  }

  const data = await res.json()

  // Reemplazar access token en cookie
  Cookies.set(ACCESS_TOKEN_KEY, data.accessToken, {
    secure: true,
    sameSite: 'strict',
    expires: 1,
  })

  return data.accessToken
}

// Obtener access token desde cookie
export function getAccessTokenFromCookie() {
  return Cookies.get(ACCESS_TOKEN_KEY)
}

// Logout (elimina cookies)
export function logout() {
  Cookies.remove(ACCESS_TOKEN_KEY)
  Cookies.remove(REFRESH_TOKEN_KEY)
}
