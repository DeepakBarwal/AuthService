const validateUserAuth = (req, res, next) => {
    if (!req.body.email || !req.body.password) {
        return res.status(400).json({
            data: {},
            success: false,
            message: 'Something went wrong',
            err: 'Email or Password is missing in the auth process'
        });
    }
    next();
}

const validateIsAdminRequest = (req, res, next) => {
    if (!req.body.id) {
        return res.status(400).json({
            data: {},
            success: false,
            message: 'Something went wrong',
            err: 'UserId was not given'
        });
    }
    next();
}

module.exports = {
    validateUserAuth,
    validateIsAdminRequest
}