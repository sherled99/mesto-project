const config = {
  baseUrl: "https://nomoreparties.co/v1/plus-cohort-18/",
  headers: {
    authorization: "95e1c598-7d7b-4945-aa63-eed177f7d6d7",
    "Content-Type": "application/json",
  },
};

const validationData = (result) => {
  return result.ok ? result.json() : Promise.reject(`Ошибка: ${result.status}`);
};

export const removeCard = (cardId) => {
  return fetch(`${config.baseUrl}cards/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  }).then((res) => validationData(res));
};

export const getCards = () => {
  return fetch(`${config.baseUrl}cards`, {
    headers: config.headers,
  }).then((res) => validationData(res));
};

export const updateLike = (method, likeId) => {
  return fetch(`${config.baseUrl}cards/likes/${likeId}`, {
    method: method,
    headers: config.headers,
  }).then((res) => validationData(res));
};

export const addCard = (card) => {
  return fetch(`${config.baseUrl}cards`, {
    method: "POST",
    body: JSON.stringify(card),
    headers: config.headers,
  }).then((res) => validationData(res));
};

export const getProfile = () => {
  return fetch(`${config.baseUrl}users/me`, {
    headers: config.headers,
  }).then((res) => validationData(res));
};

export const saveProfile = (name, hobby) => {
  return fetch(`${config.baseUrl}users/me`, {
    method: "PATCH",
    body: JSON.stringify({
      name: name,
      about: hobby,
    }),
    headers: config.headers,
  }).then((res) => validationData(res));
};

export const updateAvatar = (url) => {
  return fetch(`${config.baseUrl}users/me/avatar`, {
    method: "PATCH",
    body: JSON.stringify({
      avatar: url,
    }),
    headers: config.headers,
  }).then((res) => validationData(res));
};
