const { User, Role } = require("../models/index");

class UserRepository {

    async create(data) {
        try {
            const user = await User.create(data);
            return user;
        } catch (error) {
            console.log('Something went wrong in the user repo layer');
            throw error;
        }
    }

    async destroy(userId) {
        try {
            await User.destroy({
                where: {
                    id: userId
                }
            });
            return true;
        } catch (error) {
            console.log('Something went wrong in the user repo layer');
            throw error;
        }
    }

    async getById(userId) {
        try {
            const user = await User.findByPk(userId, {
                attributes: ['email', 'id']
            });
            return user;
        } catch (error) {
            console.log('Something went wrong in the user repo layer');
            throw error;
        }
    }

    async getByEmail(userEmail) {
        try {
            const user = await User.findOne({
                where: {
                    email: userEmail
                }
            });
            return user;
        } catch (error) {
            console.log('Something went wrong in the user repo layer - user email');
            throw error;
        }
    }

    async isAdmin(userId) {
        try {
            const user = await User.findByPk(userId);
            if (!user) {
                console.log('User not found');
                throw { error: 'Something went wrong while fetching user' };
            }
            const adminRole = await Role.findOne({
                where: {
                    name: 'ADMIN'
                }
            });
            const response = await user.hasRole(adminRole);
            return response;
        } catch (error) {
            console.log('Something went wrong in the user repo layer');
            throw error;
        }
    }
}

module.exports = UserRepository;