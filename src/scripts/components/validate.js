const showInputError = (formElement, inputElement, errorMessage, inputInvalid) => {
  const errorElement = formElement.querySelector(`.pop-up__text-${inputElement.id}-error`);
  if (!errorElement) return;
  inputElement.classList.add(inputInvalid);
  if (inputElement.validity.patternMismatch) {
    errorMessage = inputElement.dataset.errorMessage
  }

  if (errorMessage) errorElement.textContent = errorMessage;
};

const hideInputError = (formElement, inputElement, inputInvalid) => {
  const errorElement = formElement.querySelector(`.pop-up__text-${inputElement.id}-error`);
  inputElement.classList.remove(inputInvalid);
  errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement, inputInvalid) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, inputInvalid);
  } else {
    hideInputError(formElement, inputElement, inputInvalid);
  }
};

const setEventListeners = (formElement, settings) => {
  const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
  const buttonElement = formElement.querySelector(settings.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, settings.inactiveButtonClass);
  
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, settings.inputInvalid);
      toggleButtonState(inputList, buttonElement, settings.inactiveButtonClass);
    });
  });
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement, inactiveButtonClass) => {
  if(hasInvalidInput(inputList)){
    buttonElement.classList.add(inactiveButtonClass);
    buttonElement.setAttribute('disabled', true);
  } else {
    buttonElement.classList.remove(inactiveButtonClass);
    buttonElement.removeAttribute('disabled');
  }
};

export const enableValidation = (settings) => {
    const formList = Array.from(document.querySelectorAll(settings.formSelector));
    formList.forEach((formElement) => {
      setEventListeners(formElement, settings);
    });
  };