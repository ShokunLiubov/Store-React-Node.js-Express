const User = require("../models/User");
const Role = require("../models/Role");
const tokenService = require("./tokenService");
const UserDto = require("../DTO/userDto");
const bcrypt = require("bcryptjs");
const AuthError = require("../exception/authError");

class UserService {
  async registration(username, password) {
    // Check duble candidate
    const candidate = await User.findOne({ username });

    if (candidate) {
      throw AuthError.BadRequest("A user with the same name already exists");
    }
    // Check duble candidate

    // Create user and tokens
    const hashPassword = bcrypt.hashSync(password, 7);
    const userRole = await Role.findOne({ value: "USERS" });
    const user = await User.create({
      username,
      password: hashPassword,
      roles: [userRole.value],
    });
    const userDto = new UserDto(user); // id, username
    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);
    // Create user and tokens

    return {
      ...tokens,
      user: userDto,
    };
    // res.json({ message: "User successfully registered" });
  }

  async login(username, password) {
    const user = await User.findOne({ username });

    // Check User presence
    if (!user) {
      throw AuthError.BadRequest("User not registration");
    }
    // Check User presence

    // Check password
    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) {
      throw AuthError.BadRequest("Wrong password entered");
    }

    const userDto = new UserDto(user); // id, username
    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);
    return {
      ...tokens,
      user: userDto,
    };
  }

  async logout(refreshToken) {
    const token = await tokenService.removeToken(refreshToken);
    return token;
  }

  async refresh(refreshToken) {
    if (!refreshToken) {
      throw AuthError.UnauthorizedError();
    }
    const userData = tokenService.validateRefreshToken(refreshToken);
    const tokenFromDb = await tokenService.findToken(refreshToken);
    if (!userData || !tokenFromDb) {
      throw AuthError.UnauthorizedError();
    }

    const user = await User.findById(userData.id);
    const userDto = new UserDto(user); // id, username
    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);
    return {
      ...tokens,
      user: userDto,
    };
  }

  async getAllUsers() {
    const users = await User.find();
    return users;
  }
}

module.exports = new UserService();
