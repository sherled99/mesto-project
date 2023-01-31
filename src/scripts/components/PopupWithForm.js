import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor({submit }, selector,) {
        super(selector);
        this._formElement = this._popup.querySelector('.pop-up__form');
        this._collection = Array.from(this._formElement).filter(
            (x) => x.nodeName === "INPUT"
        );
        this._submit = submit;
    }

    _getInputValues = () => {
        let elements = {};
        this._collection.forEach((element) => {
            elements[element.id] = element.value;
        });
        return elements;
    };

    _clearValues = () => {
        for (const item in this._collection) {
            this._collection[item].value = null;
        }
    };

    close = () => {
        this._clearValues();
        this._popup.removeEventListener("submit", this._addCard);
        super.close();
    };

    setStandartValues = (data) => {
        this._collection.forEach((element) => {
            element.value = data[element.id];
        });
    }

    open = () => {
        super.open();
    };

    _saveValue = (evt) => {
        evt.preventDefault();
        this._submit(evt, this._getInputValues());
    }
    

    setEventListeners = () => {
        this._popup.addEventListener("submit", this._saveValue);
        super.setEventListeners();
    };
}
