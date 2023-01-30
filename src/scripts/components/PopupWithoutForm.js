import Popup from "./Popup.js";
export default class PopupWithoutForm extends Popup {
    constructor({ deleteCard }, selector) {
        super(selector);
        this._deleteCard = deleteCard;
        this._button = this._popup.querySelector(this._classSelector.btnSave);
    }

    _classSelector = {
        btnSave: ".pop-up__button-save",
        table: ".table__card",
    };

    open = (card) => {
        this.card = card;
        super.open();
    };

    setEventListeners = () => {
        this._popup.addEventListener("submit", this._removeCard);
        super.setEventListeners();
    };

    _removeCard = (evt) => {
        evt.preventDefault();
        this._popup.removeEventListener("submit", this._removeCard);
        return this._deleteCard(
            this._button,
            this.card
        );
    };
}
