import Popup from './Popup.js';
export default class PopupWithoutForm extends Popup{
    constructor({renderDelete, deleteCard}, selector){
        super(selector);
        this._renderDelete = renderDelete;
        this._deleteCard = deleteCard;
    }

    open = (evt) => {
        this._openRemoveCard(evt);
        super.open();
    }

    _openRemoveCard = (evt) => {
        this._popup.id = evt.target.parentElement.id;
        this._popup.card = evt.target.closest(".table__card");
        this._popup.addEventListener("submit", this._removeCard);
    }

    _removeCard = (currentEvt) => {
        currentEvt.preventDefault();
        const btn = currentEvt.target.querySelector(".pop-up__button-save");
        this._renderDelete(btn, true);
        return this._deleteCard(this._popup.id)
          .then(() => {
            this._popup.card.remove();
            super.close();
            this._popup.removeEventListener("submit", this._removeCard);
          })
          .catch((err) => console.log(err))
          .finally(() => this._renderDelete(btn, false));
      }
}