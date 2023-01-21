import Popup from './Popup.js';

export default class PopupWithForm extends Popup{
    constructor({data, submit}, selector){
        super(selector);
        this._name = data.name;
        this._description = data.desc;
        this._submit = submit;
    }

    _getInputValues = () => {
        const name = this._popup.querySelector('#name') ? this._popup.querySelector('#name').value : null;
        const description = this._popup.querySelector('#description') ? this._popup.querySelector('#description').value : null;
        return {name : name, description: description};
    }

    _clearValues = () => {
        this._popup.querySelector('#name') ? this._popup.querySelector('#name').value = this._name : null;
        this._popup.querySelector('#description') ? this._popup.querySelector('#description').value = this._description : null;
    }

    close = () => {
        this._popup.removeEventListener("submit", this._submit);
        super.close();
    }

    open = () => {
        this._clearValues();
        super.open();
    }

    refreshValues = (name, description) => {
        this._name = name;
        this._description = description;
    }
    

    setEventListeners = () => {
        const once = {
            once : true
        };
        this._popup.addEventListener('submit', (evt) => {
            this._submit(this._getInputValues(), evt);
        }, once);
        super.setEventListeners();
    }
}