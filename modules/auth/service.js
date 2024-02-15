const AuthRepository = require("./repository");
const UsersService = require("../users/service");
const { comparePasswords, generateToken }  = require("../../utils/auth");

class AuthService {
  static config() {
    return new AuthService(
      AuthRepository.config(),
      UsersService.config(),
      );
  }


  async create(auth) {
    const user = await this.usersService.retrieveEmail(auth.email);
    const valid = await comparePasswords(auth.password, user.password);
    if (!valid) throw new Error("Senha incorreta!");
    const token = await generateToken({ auth }); 
    try {
      await this.authRepository.create({ email: auth.email, token });
      return {
        "access_token": token,
        "expires_in": 3600,
        "token_type": "Bearer"
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async retrieve(token) {
    return await this.authRepository.retrieve(token);
  }

  constructor(authRepository, usersService) {
    this.authRepository = authRepository;
    this.usersService = usersService;
  }
}

module.exports = AuthService;