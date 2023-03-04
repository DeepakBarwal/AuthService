const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const UserRepository = require("../repositories/user-repository");
const { JWT_KEY } = require("../config/serverConfig");

class UserService {
    constructor() {
        this.userRepository = new UserRepository();
    }

    async create(data) {
        try {
            const user = await this.userRepository.create(data);
            return user;
        } catch (error) {
            console.log('Something went wrong in the user service layer');
            throw error;
        }
    }

    createToken(user) {
        try {
            const result = jwt.sign(user, JWT_KEY, { expiresIn: '1h' });
            return result;
        } catch (error) {
            console.log('Something went wrong in the user service layer - token creation');
            throw error;
        }
    }

    verifyToken(token) {
        try {
            const response = jwt.verify(token, JWT_KEY);
            return response;
        } catch (error) {
            console.log('Something went wrong in the user service layer - token validation', error);
            throw error;
        }
    }

    checkPassword(userInputPlainPassword, encryptedPassword) {
        try {
            return bcrypt.compareSync(userInputPlainPassword, encryptedPassword);
        } catch (error) {
            console.log('Something went wrong in the user layer - password comparison');
            throw error;
        }
    }

    async destroy(userId) {
        try {
            await this.userRepository.destroy(userId);
            return true;
        } catch (error) {
            console.log('Something went wrong in the user service layer');
            throw error;
        }
    }
}

module.exports = UserService;