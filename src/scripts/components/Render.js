export default class Render{
  constructor() {
    
  }

  renderLoading = (btn, isLoading) => {
    isLoading
      ? (btn.textContent = "Сохранение...")
      : (btn.textContent = "Сохраненить");
  }
  
  renderDeleting = (btn, isLoading) => {
    isLoading 
    ? (btn.textContent = "Удаление...") 
    : (btn.textContent = "Да");
  }

}