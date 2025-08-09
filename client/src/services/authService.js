const API = process.env.REACT_APP_API_URL;

export async function signup({ email, password }) {
  try {
    const res = await fetch(`${API}/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    return await res.json();
  } catch (e) {
    return { error: 'Network error' };
  }
}

export async function login({ email, password }) {
  try {
    const res = await fetch(`${API}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    return await res.json();
  } catch (e) {
    return { error: 'Network error' };
  }
}

export async function getMe(token) {
  try {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/auth/me`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    return await res.json();
  } catch (e) { return null; }
}
