export default class Card {
    constructor(
        { data, handleClick, openRemoveCard, updateLike },
        selector,
        userId
    ) {
        if (data) {
            this._ownerId = data.owner._id;
            this.id = data._id;
            this._link = data.link;
            this._name = data.name;
            this._likes = data.likes;
            this._userId = userId;
        }

        this._openRemoveCard = openRemoveCard;
        this._selector = selector;
        this._handleClick = handleClick;
        this._updateLike = updateLike;
    }

    createCard = () => {
        const template = document.querySelector("#template-card").content;
        this.cardElement = template
            .querySelector(this._selector)
            .cloneNode(true);
        this.cardElement.id = this.id;
        this.cardElement.classList.add(`card${this.id}`);
        this.cardElement.querySelector(".table__name").textContent = this._name;
        this._createCardLike();
        this._createCardValues();
        this._createCardDelete();

        return this.cardElement;
    };

    remove = () => {
        this.cardElement.remove();
    };

    _createCardValues = () => {
        const photo = this.cardElement.querySelector(".table__photo");
        photo.src = this._link;
        photo.alt = this._name;
        this._handleClick(photo);
    };

    _createCardLike = () => {
        const like = this.cardElement.querySelector(".table__like");
        like.id = this.id;
        like.textContent = this._likes.length;
        const likeButton = this.cardElement.querySelector(
            ".table__button-like"
        );
        if (this._likes.some((x) => x._id === this._userId))
            likeButton.classList.add("table__button-like_active");
        likeButton.addEventListener("click", this._updateLike);
    };

    _createCardDelete = () => {
        const btnDelete = this.cardElement.querySelector(
            ".table__button-remove"
        );
        btnDelete.addEventListener("click", this._openRemoveCard);
        if (this._userId === this._ownerId)
            btnDelete.classList.add("table__button-remove_active");
    };
}
