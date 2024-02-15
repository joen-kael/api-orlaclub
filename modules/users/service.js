const { hashPassword }  = require("../../utils/auth");
const UsersRepository = require("./repository");

class UsersService {
  static config() {
    return new UsersService(UsersRepository.config());
  }

  async list() {
    const users = await this.usersRepository.list();
    return users.map((user) => {
      delete user.password;
      return user;
    })
  }

  async create(user) {
    const encryptedPassword = await hashPassword(user.password);
    return await this.usersRepository.create({
      ...user,
      password: encryptedPassword
    });
  }

  async retrieve(id) {
    const user = await this.usersRepository.retrieve(id);
    if (!user) throw new Error("User not found");
    delete user.password;
    return user;
  }

  async retrieveEmail(email) {
    const user = await this.usersRepository.retrieveEmail(email);
    if (!user) throw new Error("User not found");
    return user;
  }

  async update(id, user) {
    const res = await this.usersRepository.retrieve(id);
    if (!res) throw new Error("User not found");
    const item = {
      ...user,
      updatedAt: new Date().toISOString(),
    }; 
    return await this.usersRepository.update(id, item);
  }

  async delete(id) {
    const user = await this.usersRepository.retrieve(id);
    if (!user) throw new Error("User not found");
    if (user.admin) throw new Error("User admin cannot be deleted");
    return await this.usersRepository.delete(id);
  }
  constructor(usersRepository) {
    this.usersRepository = usersRepository;
  }
}

module.exports = UsersService