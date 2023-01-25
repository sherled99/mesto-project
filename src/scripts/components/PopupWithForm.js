import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor({ collection, submit }, selector) {
        super(selector);
        this._collection = collection;
        this._submit = submit;
    }

    _getInputValues = () => {
        let elements = [];
        for (const item in this._collection) {
            elements.push(
                this._popup.querySelector(this._collection[item])
                    ? this._popup.querySelector(this._collection[item]).value
                    : null
            );
        }
        return elements;
    };

    _clearValues = () => {
        for (const item in this._collection) {
            const element =
                item && document.querySelector(item)
                    ? document.querySelector(item).textContent
                    : null;
            this._popup.querySelector(this._collection[item])
                ? (this._popup.querySelector(this._collection[item]).value =
                      element)
                : null;
        }
    };

    close = () => {
        this._popup.removeEventListener("submit", this._submit);
        super.close();
    };

    open = () => {
        this._clearValues();
        super.open();
    };

    setEventListeners = () => {
        this._popup.addEventListener(
            "submit",
            (evt) => {
                this._submit(this._getInputValues(), evt);
            },
            { once: true }
        );
        super.setEventListeners();
    };
}
