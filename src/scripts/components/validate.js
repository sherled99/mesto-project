const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.pop-up__text-${inputElement.id}-error`);
  if (!errorElement) return;
  inputElement.classList.add('pop-up__text-error');
  if (inputElement.validity.patternMismatch) {
    errorMessage = inputElement.dataset.errorMessage
  }

  if (errorMessage) errorElement.textContent = errorMessage;
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.pop-up__text-${inputElement.id}-error`);
  inputElement.classList.remove('pop-up__text-error');
  errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.pop-up__text'));
  const buttonElements = formElement.querySelectorAll('.pop-up__button-save');
  buttonElements.forEach((buttonElement) => {
    toggleButtonState(inputList, buttonElement);
  });
  
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement);
      buttonElements.forEach((buttonElement) => {
        toggleButtonState(inputList, buttonElement);
      });
    });
  });
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement) => {
  if(hasInvalidInput(inputList)){
    buttonElement.classList.add('pop-up__button_save_type-inactive');
    buttonElement.setAttribute('disabled', true);
  } else {
    buttonElement.classList.remove('pop-up__button_save_type-inactive');
    buttonElement.removeAttribute('disabled');
  }
};

export const enableValidation = () => {
    const formList = Array.from(document.querySelectorAll('.pop-up__form'));
    formList.forEach((formElement) => {
      formElement.addEventListener('submit', function (evt) {
        evt.preventDefault();
      });
      
      const fieldsetList = Array.from(formElement.querySelectorAll('.pop-up__set'));
      fieldsetList.forEach((fieldSet) => {
        setEventListeners(fieldSet);
      });
    });
  };