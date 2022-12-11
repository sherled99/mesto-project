import {validationConfig as settings} from './const.js'

const showInputError = (
  formElement,
  inputElement,
  errorMessage,
) => {
  const errorElement = formElement.querySelector(
    `.pop-up__text-${inputElement.id}-error`
  );
  if (!errorElement) return;
  inputElement.classList.add(settings.inputInvalid);
  if (inputElement.validity.patternMismatch) {
    errorMessage = inputElement.dataset.errorMessage;
  }

  if (errorMessage) errorElement.textContent = errorMessage;
};

export const clearInputError = (formElement) => {
  const formElements = Array.from(formElement.elements);
  const inputList = formElements.filter(x => x.nodeName === 'INPUT');
  const buttonElement = formElement.querySelector(settings.submitButtonSelector);
  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement);
  });
  toggleButtonState(inputList, buttonElement);
}

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(
    `.pop-up__text-${inputElement.id}-error`
  );
  inputElement.classList.remove(settings.inputInvalid);
  errorElement.textContent = "";
};

const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage
    );
  } else {
    hideInputError(formElement, inputElement, settings.inputInvalid);
  }
};

export const setEventListeners = (formElement) => {
  const inputList = Array.from(
    formElement.querySelectorAll(settings.inputSelector)
  );
  const buttonElement = formElement.querySelector(
    settings.submitButtonSelector
  );
  toggleButtonState(inputList, buttonElement);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(settings.inactiveButtonClass);
    buttonElement.setAttribute("disabled", true);
  } else {
    buttonElement.classList.remove(settings.inactiveButtonClass);
    buttonElement.removeAttribute("disabled");
  }
};

export const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll(settings.formSelector));
  formList.forEach((formElement) => {
    setEventListeners(formElement);
  });
};
