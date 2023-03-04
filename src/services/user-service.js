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

    async signIn(email, plainPassword) {
        try {
            // Step 1 -> fetch the user using their email
            const user = await this.userRepository.getByEmail(email);
            // Step 2 -> Compare incoming plain password with stored encrypted password
            const passwordsMatch = this.checkPassword(plainPassword, user.password);

            if (!passwordsMatch) {
                console.log('Passowrds don\'t match');
                throw { error: 'Incorrect Password' };
            }

            // Step 3 -> if passwords match then create a token and send it to the user
            const newJWT = this.createToken({ email: user.email, id: user.id });
            return newJWT;
        } catch (error) {
            console.log('Something went wrong in the user service layer - sign in');
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

    async isAuthenticated(token) {
        try {
            const response = this.verifyToken(token);
            if (!response) {
                throw { error: 'Invalid token' };
            }
            // In case user is deleted before token expires
            const user = await this.userRepository.getById(response.id);
            if (!user) {
                throw { error: 'No user with the corresponding token exists' };
            }
            return user.id;
        } catch (error) {
            console.log('Something went wrong in the user service layer - auth process');
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