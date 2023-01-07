export default class FormValidator{
  constructor({settings}){
    this._formSelector = settings.formSelector;
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inputInvalid = settings.inputInvalid;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._errorClass = settings.errorClass;
  }

  enableValidation = () => {
    const formList = Array.from(document.querySelectorAll(this._formSelector));
    formList.forEach((formElement) => {
      this._setEventListeners(formElement);
    });
  };

  clearInputError = (formElement) => {
    const formElements = Array.from(formElement.elements);
    const inputList = formElements.filter(x => x.nodeName === 'INPUT');
    const buttonElement = formElement.querySelector(this._submitButtonSelector);
    inputList.forEach((inputElement) => {
      this._hideInputError(formElement, inputElement);
    });
    this._toggleButtonState(inputList, buttonElement);
  }

  _setEventListeners = (formElement) => {
    const inputList = Array.from(
      formElement.querySelectorAll(this._inputSelector)
    );
    const buttonElement = formElement.querySelector(
      this._submitButtonSelector
    );
    this._toggleButtonState(inputList, buttonElement);
  
    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(formElement, inputElement);
        this._toggleButtonState(inputList, buttonElement);
      }, this);
    });
  };

  _checkInputValidity = (formElement, inputElement) => {
    if (!inputElement.validity.valid) {
      this._showInputError(
        formElement,
        inputElement,
        inputElement.validationMessage
      );
    } else {
      this._hideInputError(formElement, inputElement, this._inputInvalid);
    }
  };

  _showInputError = (
    formElement,
    inputElement,
    errorMessage,
  ) => {
    const errorElement = formElement.querySelector(
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

  _hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(
      `.pop-up__text-${inputElement.id}-error`
    );
    inputElement.classList.remove(this._inputInvalid);
    errorElement.textContent = "";
  };
}
