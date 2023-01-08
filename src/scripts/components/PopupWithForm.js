import Popup from './Popup.js';

export default class PopupWithForm extends Popup{
    constructor({data, submit}){
        super(data.selector);
        this._popup = document.querySelector(data.selector);
        this._name = data.name;
        this._description = data.description;
        this._nameSelector = this._popup.querySelector(this._name);
        this._descriptionSelector = this._popup.querySelector(this._description);
        this._submit = submit;
    }

    getInputValues = () => {
        const name = this._nameSelector ? this._nameSelector.value : "";
        const description = this._descriptionSelector ? this._descriptionSelector.value : "";
        return {name : name, description: description};
    }

    clearValues = (name, description) => {
        if (this._nameSelector) this._nameSelector.value = name;
        if (this._descriptionSelector) this._descriptionSelector.value = description;
        
    }

    close = (name, description) => {
        this.clearValues(name, description);
        this._popup.removeEventListener("submit", this._submit);
        super.close();
    }

    setEventListeners = () => {
        this._popup.addEventListener('submit', this._submit);
        super.setEventListeners();
    }
}