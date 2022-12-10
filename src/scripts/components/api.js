const config = {
    baseUrl: 'https://nomoreparties.co/v1/plus-cohort-18/',
    headers: {
      authorization: '95e1c598-7d7b-4945-aa63-eed177f7d6d7',
      'Content-Type': 'application/json'
    }
  }

export const removeCardInDb = (cardId) => {
    return fetch(`${config.baseUrl}cards/${cardId}`, {
      method: "DELETE",
      headers: config.headers,
    })
      .then((res) => {
        if (res.ok) {
          return Promise.resolve();
        }

        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .catch((err) => console.log(err));
  };

export const getCardsInDb = () =>{
  return fetch(`${config.baseUrl}cards`, {
    headers: config.headers
  })
  .then((res) => {
    if (res.ok){
      return res.json();
    }
    
    return Promise.reject(`Ошибка: ${res.status}`);
  })
  .catch((err) => console.log(err));
}

export const updateLikeInDb = (method, likeId) => {
    return fetch(`${config.baseUrl}cards/likes/${likeId}`, {
      method: method,
      headers: config.headers
    })
    .then((res) => {
      if (res.ok) 
      {
        return res.json();
      }
  
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => console.log(err));
  }

export const addCardInDb = (card) => {
  return fetch(`${config.baseUrl}cards`, {
    method: "POST",
    body: JSON.stringify(card),
    headers: config.headers,
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => console.log(err));
}

export const getProfileInDb = () =>{
  return fetch(`${config.baseUrl}users/me`, {
      headers: config.headers
    })
    .then((res) => {
      if (res.ok){
        return res.json();
      }

      return new Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => console.log(err));
}

export const saveProfileInDb = (name, hobby) => {
    return fetch(`${config.baseUrl}users/me`, {
      method: 'PATCH',
      body: JSON.stringify(
        {
          name: name,
          about: hobby
        }
      ),
      headers: config.headers
    })
    .then((res) => {
      if (res.ok){
        return res.json();
      }

      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => console.log(err));
}

export const updateAvatarInDb = (url) => {
    return fetch(`${config.baseUrl}users/me/avatar`, {
          method: 'PATCH',
          body: JSON.stringify(
            {
              avatar: url
            }
          ),
          headers: config.headers
        })
        .then((res) => {
          if (res.ok){
            return res.json();
          }
          
          return Promise.reject(`Ошибка: ${res.status}`);
        })
        .catch((err) => console.log(err));
}