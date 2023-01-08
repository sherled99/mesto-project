import Popup from './Popup.js';

export default class PopupWithImage extends Popup{
    constructor(selector, name, description){
        super(selector);
        this._popup = document.querySelector(selector);
        this._picture = this._popup.querySelector(name);;
        this._description = this._popup.querySelector(description);;
    }

    open = (link, name) => {
        this._picture.src = link;
        this._picture.alt = name;
        this._description.textContent = name;
        super.open();
    }
}