export default class UserInfo{
    constructor({data}) {
        this._selectorPorfile = document.querySelector(data.selectorPorfile);
        this._nameInfo = this._selectorPorfile.querySelector(data.selectorName);
        this._hobbyInfo = this._selectorPorfile.querySelector(data.selectorStatus);
        this._avatarInfo = this._selectorPorfile.querySelector(data.selectorAvatar);
    }

    getUserInfo = () => {
        return {
            name: this._nameInfo.textContent,
            desc: this._hobbyInfo.textContent,
            avatar: this._avatarInfo.src
        }
    }

    setUserInfo = (profile) => {
        this._nameInfo.textContent = profile.name;
        this._hobbyInfo.textContent = profile.about;
        this._avatarInfo.src = profile.avatar;
    }
}