const express = require("express");
const router = express.Router();

const userController = require("../../controllers/user-controller");
const { AuthRequestValidators } = require("../../middlewares/index");

router.post(
    '/signup',
    AuthRequestValidators.validateUserAuth,
    userController.create
);
router.post(
    '/signIn',
    AuthRequestValidators.validateUserAuth,
    userController.signIn
);

router.get(
    '/isAuthenticated',
    userController.isAuthenticated
);

module.exports = router;