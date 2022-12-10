export function closePopup(popup) {
  popup.classList.remove("pop-up_opened");
  popup.removeEventListener("mousedown", closePopupByClick);
  document.removeEventListener("keydown", closePopupByEsc);
}

export function openPopup(popup) {
  popup.classList.add("pop-up_opened");
  popup.addEventListener("mousedown", closePopupByClick);
  document.addEventListener("keydown", closePopupByEsc);
}


function closePopupByEsc(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".pop-up_opened");
    closePopup(openedPopup);
  }
}

function closePopupByClick(evt) {
  if (
    evt.target.classList.contains("pop-up") ||
    evt.target.classList.contains("popup__close")
  ) {
    closePopup(evt.currentTarget);
  }
}