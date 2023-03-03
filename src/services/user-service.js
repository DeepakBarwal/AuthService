const UserRepository = require("../repositories/user-repository");

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