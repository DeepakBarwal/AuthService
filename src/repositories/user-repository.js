const { StatusCodes } = require("http-status-codes");

const { User, Role } = require("../models/index");
const ClientError = require("../utils/client-error");
const ValidationError = require("../utils/validation-error");

class UserRepository {

    async create(data) {
        try {
            const user = await User.create(data);
            return user;
        } catch (error) {
            if (error.name === 'SequelizeValidationError') {
                throw new ValidationError(error);
            }
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
            if (!user) {
                throw new ClientError(
                    'AttributeNotFound',
                    'Invalid email sent in the request',
                    'Please check the email, as there is no record of this email',
                    StatusCodes.NOT_FOUND
                );
            }
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