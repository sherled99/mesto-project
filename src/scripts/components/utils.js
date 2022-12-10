export function renderLoading(btn, isLoading) {
  isLoading
    ? (btn.textContent = "Сохранение...")
    : (btn.textContent = "Сохраненить");
}

export function renderDeleting(btn, isLoading) {
  isLoading 
  ? (btn.textContent = "Удаление...") 
  : (btn.textContent = "Да");
}
