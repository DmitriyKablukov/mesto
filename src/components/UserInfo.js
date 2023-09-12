class UserInfo {
  constructor({ profileName, profileDescription }) {
    this._name = profileName;
    this._description = profileDescription;
  }
  //Получение данных из формы
  getUserInfo() {
    return {
      profileName: this._name.textContent,
      profileDescription: this._description.textContent,
    };
  }
  //Присвоение данных по умолчанию
  setUserInfo({ name, description }) {
    this._name.textContent = name;
    this._description.textContent = description;
  }
}

export default UserInfo;
