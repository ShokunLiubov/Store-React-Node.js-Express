
export default class UserDto {
  username;
  id;
  roles;
  constructor(model: any) {
    this.username = model.username;
    this.id = model.id;
    this.roles = model.roles;
  }
}
