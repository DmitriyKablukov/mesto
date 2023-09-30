class UserInfo {
  constructor({ profileName, profileDescription, profileAvatar }) {
    this._name = profileName;
    this._description = profileDescription;
    this._avatar = profileAvatar;
  }
  //Получение данных из формы
  getUserInfo() {
    return {
      profileName: this._name.textContent,
      profileDescription: this._description.textContent,
      profileAvatar: this._avatar.src,
    };
  }
  //Присвоение данных по умолчанию
  setUserInfo({ name, about, avatar }) {
    this._name.textContent = name;
    this._description.textContent = about;
    this._avatar.src = avatar;
  }
}
export default UserInfo;
