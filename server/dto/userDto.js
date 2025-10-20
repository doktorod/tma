class UserDto {
  username;
  id;
  first_name;
  last_name;
  verify;

  constructor(model) {
    this.username = model.username;
    this.id = model.id;
    this.first_name = model.first_name;
    this.last_name = model.last_name;
    this.verify = model.verify;
  }
}
export default UserDto;
