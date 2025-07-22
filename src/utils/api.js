class Api {
	constructor({baseUrl, headers}) {
	  this._baseUrl = baseUrl;
	  this._headers = headers;
	}

	getUser(){
	  return fetch(`${this._baseUrl}/users/me`,{
		  headers:this._headers
	  })
	}

	updateUser(name,about){
	  return fetch(`${this._baseUrl}/users/me`,{
		  headers: this._headers,
		  method: "PATCH",
		  body: JSON.stringify({
			  name: name,
			  about: about
		  })
	  })
	}

	updateAvatar(avatarLink){
	  return fetch(`${this._baseUrl}/users/me/avatar`,{
		  headers: this._headers,
		  method: "PATCH",
		  body: JSON.stringify({
			  avatar:avatarLink
		  })
	  })
	}

	getInitialCards() {
	  return fetch(`${this._baseUrl}/cards`, {
		headers: this._headers
	  })
	}

	createCard(card){
	  return fetch(`${this._baseUrl}/cards`, {
		  headers: this._headers,
		  method: "POST",
		  body: JSON.stringify(card)
		})
	}

	deleteCard(cardId){
	  return fetch(`${this._baseUrl}/cards/${cardId}`,{
		  headers: this._headers,
		  method: "DELETE"
	  })
	}

	addLike(cardId) {
	  return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
		method: "PUT",
		headers: this._headers,
	  })
		.then((res) => {
		  if (!res.ok) {
			return Promise.reject(`Erro ao curtir o cartão: ${res.status}`);
		  }
		  return res.json();
		})
		.then((data) => {
		  return data;
		})
		.catch(err => console.log("Erro ao curtir card: ",err));
	}

	removeLike(cardId) {
	  return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
		method: "DELETE",
		headers: this._headers,
	  })
		.then((res) => {
		  if (!res.ok) {
			return Promise.reject(`Erro ao remover a curtida: ${res.status}`);
		  }
		  return res.json();
		})
		.then((data) => {
		  return data;
		})
		.catch(err => console.log("Erro ao descutir card: ",err));
	}
  }

const api = new Api({
  baseUrl: "https://around-api.pt-br.tripleten-services.com/v1",
  headers: {
	authorization: "6776f0e2-04cc-4374-8e7e-91a09af225f0",
	"Content-Type": "application/json",
  },
});

export default api