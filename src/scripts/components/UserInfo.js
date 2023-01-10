export default class UserInfo{
    constructor({data, getProfile, setStandartCards}) {
        this._selectorPorfile = document.querySelector(data.selectorPorfile);
        this._nameInfo = this._selectorPorfile.querySelector(data.selectorName);
        this._hobbyInfo = this._selectorPorfile.querySelector(data.selectorStatus);
        this._avatarInfo = this._selectorPorfile.querySelector(data.selectorAvatar);
        this._getProfile = getProfile;
        this._setStandartCards = setStandartCards;
    }

    getUserInfo = () => {
        this._getProfile()
        .then((res) => this.setUserInfo(res))
        .then(() => this._setStandartCards(this.id));
    }

    setUserInfo = (profile) => {
        this._nameInfo.textContent = profile.name;
        this._hobbyInfo.textContent = profile.about;
        this._avatarInfo.src = profile.avatar;
        this.id = profile._id;
    }
}