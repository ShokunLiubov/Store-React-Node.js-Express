export default class UserDto {
    constructor(model) {
        this.username = model.username;
        this.id = model.id;
        this.roles = model.roles;
    }
}
