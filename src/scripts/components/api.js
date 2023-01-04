export default class Api{
  constructor({connection}) {
    this.baseUrl = connection.baseUrl;
    this.headers = connection.headers;
  }

  _validationData = (result) => {
    return result.ok ? result.json() : Promise.reject(`Ошибка: ${result.status}`);
  }

  removeCard = (cardId) => {
    return fetch(`${this.baseUrl}cards/${cardId}`, {
      method: "DELETE",
      headers: this.headers,
    }).then((res) => this._validationData(res));
  }

  getCards = () => {
    return fetch(`${this.baseUrl}cards`, {
      headers: this.headers,
    }).then((res) => this._validationData(res));
  }

  updateLike = (method, likeId) => {
    return fetch(`${this.baseUrl}cards/likes/${likeId}`, {
      method: method,
      headers: this.headers,
    }).then((res) => this._validationData(res));
  }

  addCard = (card) => {
    return fetch(`${this.baseUrl}cards`, {
      method: "POST",
      body: JSON.stringify(card),
      headers: this.headers,
    }).then((res) => this._validationData(res));
  }

  getProfile = () => {
    return fetch(`${this.baseUrl}users/me`, {
      headers: this.headers,
    }).then((res) => this._validationData(res));
  }

  saveProfile = (name, hobby) => {
    return fetch(`${this.baseUrl}users/me`, {
      method: "PATCH",
      body: JSON.stringify({
        name: name,
        about: hobby,
      }),
      headers: this.headers,
    }).then((res) => this._validationData(res));
  }

  updateAvatar = (url) => {
    return fetch(`${this.baseUrl}users/me/avatar`, {
      method: "PATCH",
      body: JSON.stringify({
        avatar: url,
      }),
      headers: this.headers,
    }).then((res) => this._validationData(res));
  }
}
