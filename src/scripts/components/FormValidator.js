export default class FormValidator {
    constructor({ settings }, selector) {
        this._formElement = document.querySelector(selector);
        this._inputSelector = settings.inputSelector;
        this._submitButtonSelector = settings.submitButtonSelector;
        this._inputInvalid = settings.inputInvalid;
        this._inactiveButtonClass = settings.inactiveButtonClass;
        this._errorClass = settings.errorClass;
        this._inputList = Array.from(this._formElement).filter(
            (x) => x.nodeName === "INPUT"
        );
        this._buttonElement = this._formElement.querySelector(
            this._submitButtonSelector
        );
    }

    enableValidation = () => {
        this._setEventListeners();
    };

    clearInputError = () => {
        this._inputList.forEach((inputElement) => {
            this._hideInputError(inputElement);
        });
        this._toggleButtonState();
    };

    _setEventListeners = () => {
        this._toggleButtonState();
        this._inputList.forEach((inputElement) => {
            inputElement.oninput = () => {
                this._checkInputValidity(inputElement);
                this._toggleButtonState();
            };
        });
    };

    _checkInputValidity = (inputElement) => {
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement, inputElement.validationMessage);
        } else {
            this._hideInputError(inputElement);
        }
    };

    _showInputError = (inputElement, errorMessage) => {
        const errorElement = this._formElement.querySelector(
            `.pop-up__text-${inputElement.id}-error`
        );
        if (!errorElement) return;
        inputElement.classList.add(this._inputInvalid);
        if (inputElement.validity.patternMismatch) {
            errorMessage = inputElement.dataset.errorMessage;
        }

        if (errorMessage) errorElement.textContent = errorMessage;
    };

    _toggleButtonState = () => {
        if (this._hasInvalidInput()) {
            this._buttonElement.classList.add(this._inactiveButtonClass);
            this._buttonElement.setAttribute("disabled", true);
        } else {
            this._buttonElement.classList.remove(this._inactiveButtonClass);
            this._buttonElement.removeAttribute("disabled");
        }
    };

    _hasInvalidInput = () => {
        return this._inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        });
    };

    _hideInputError = (inputElement) => {
        const errorElement = this._formElement.querySelector(
            `.pop-up__text-${inputElement.id}-error`
        );
        inputElement.classList.remove(this._inputInvalid);
        errorElement.textContent = "";
    };
}
