import { authFetch } from './api';

export async function listBookmarks() {
  const res = await authFetch('/bookmarks');
  return res.json();
}

export async function createBookmark(data) {
  const res = await authFetch('/bookmarks', {
    method: 'POST',
    body: JSON.stringify(data)
  });
  return res.json();
}

export async function deleteBookmark(id) {
  const res = await authFetch(`/bookmarks/${id}`, { method: 'DELETE' });
  return res.json();
}
