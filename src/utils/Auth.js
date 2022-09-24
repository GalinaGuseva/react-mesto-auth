function getResponse(res) {
  return res.ok
    ? res.json()
    : Promise.reject(new Error(`Ошибка ${res.status}`));
}

export const BASE_URL = "https://auth.nomoreparties.co";

export const headers = {
  "Content-Type": "application/json",
};

export function register({ email, password }) {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  }).then((res) => getResponse(res));
}

export function login({ email, password }) {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  }).then((res) => getResponse(res));
}

export function checkToken(token) {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => getResponse(res));
}

export function signOut() {
  return fetch(`${BASE_URL}/signout`, {
    method: "DELETE",
  }).then((res) => getResponse(res));
}
