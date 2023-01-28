import Popup from "./Popup.js";
export default class PopupWithoutForm extends Popup {
    constructor({ deleteCard }, selector) {
        super(selector);
        this._deleteCard = deleteCard;
    }

    _classSelector = {
        btnSave: ".pop-up__button-save",
        table: ".table__card",
    };

    open = (evt, card) => {
        this._openRemoveCard(evt);
        this.card = card;
        super.open();
    };

    _openRemoveCard = (evt) => {
        this._popup.id = evt.target.parentElement.id;
        this._popup.card = evt.target.closest(this._classSelector.table);
    };

    setEventListeners = () => {
        this._popup.addEventListener("submit", this._removeCard);
        super.setEventListeners();
    };

    _removeCard = (evt) => {
        evt.preventDefault();
        this._popup.removeEventListener("submit", this._removeCard);
        return this._deleteCard(
            evt.target.querySelector(this._classSelector.btnSave),
            this._popup
        );
    };
}
