import Popup from './Popup.js';
import Api from "./Api.js"
import {connection} from './const.js';
import { renderDeleting } from "./utils.js";

const api = new Api({connection});

export default class PopupWithoutForm extends Popup{
    constructor(selector, selectorPicture){
        super(selector);
        this._popup = document.querySelector(selector);
        this._selectorPicture = selectorPicture;
    }

    open = (evt) => {
        this._openRemoveCard(evt);
        super.open();
    }

    _openRemoveCard = (evt) => {
        this._popupDeletePicture = document.querySelector(this._selectorPicture);
        this._popupDeletePicture.id = evt.target.parentElement.id;
        this._popupDeletePicture.card = evt.target.closest(".table__card");
        this._popupDeletePicture.addEventListener("submit", this._removeCard);
    }

    _removeCard = (currentEvt) => {
        currentEvt.preventDefault();
        const btn = currentEvt.target.querySelector(".pop-up__button-save");
        renderDeleting(btn, true);
        return api.removeCard(this._popupDeletePicture.id)
          .then(() => {
            this._popupDeletePicture.card.remove();
            super.close();
            this._popupDeletePicture.removeEventListener("submit", this._removeCard);
          })
          .catch((err) => console.log(err))
          .finally(() => renderDeleting(btn, false));
      }
}