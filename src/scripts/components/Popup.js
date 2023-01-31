export default class Popup {
    constructor(selector) {
        this._popup = document.querySelector(selector);
    }

    close() {
        this._popup.classList.remove("pop-up_opened");
        this._popup.removeEventListener("mousedown", this._handleClick);
        document.removeEventListener("keydown", this._handleEscClose);
    }

    open() {
        this._popup.classList.add("pop-up_opened");
        this.setEventListeners();
    }

    setEventListeners() {
        this._popup.addEventListener("mousedown", this._handleClick);
        document.addEventListener("keydown", this._handleEscClose);
    }

    _handleEscClose = (evt) => {
        if (evt.key === "Escape") {
            this.close();
        }
    };

    _handleClick = (evt) => {
        if (
            evt.target.classList.contains("pop-up") ||
            evt.target.classList.contains("popup__close")
        ) {
            this.close();
        }
    };
}
