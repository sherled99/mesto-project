export default class Section {
    constructor({renderer}, containerSelector) {
        this._container = document.querySelector(containerSelector);
        this._renderer = renderer;
    }

    addItem(item, first) {
        first ? this._container.append(item) : this._container.prepend(item);
    }

    renderItems() {
        this.items.forEach(item => {
            this._renderer(item);
        });
    }
}
