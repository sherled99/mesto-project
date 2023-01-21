export default class FormValidator{
  constructor({settings}, selector){
    this._formElement = document.querySelector(selector);
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inputInvalid = settings.inputInvalid;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._errorClass = settings.errorClass;
    
  }

  enableValidation = () => {
    this._setEventListeners();
    this._clearInputError();
  };

  _clearInputError = () => {
    const formElements = Array.from(this._formElement);
    const inputList = formElements.filter(x => x.nodeName === 'INPUT');
    const buttonElement = this._formElement.querySelector(this._submitButtonSelector);
    inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
    this._toggleButtonState(inputList, buttonElement);
  }

  _setEventListeners = () => {
    const inputList = Array.from(
      this._formElement.querySelectorAll(this._inputSelector)
    );
    const buttonElement = this._formElement.querySelector(
      this._submitButtonSelector
    );
    this._toggleButtonState(inputList, buttonElement);
  
    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(inputList, buttonElement);
      }, this);
    });
  };

  _checkInputValidity = (inputElement) => {
    if (!inputElement.validity.valid) {
      this._showInputError(
        inputElement,
        inputElement.validationMessage
      );
    } else {
      this._hideInputError(inputElement, this._inputInvalid);
    }
  };

  _showInputError = (
    inputElement,
    errorMessage,
  ) => {
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

  _toggleButtonState = (inputList, buttonElement) => {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(this._inactiveButtonClass);
      buttonElement.setAttribute("disabled", true);
    } else {
      buttonElement.classList.remove(this._inactiveButtonClass);
      buttonElement.removeAttribute("disabled");
    }
  };

  _hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
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
