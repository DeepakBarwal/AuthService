const express = require("express");
const router = express.Router();

const userController = require("../../controllers/user-controller");

router.post('/signup', userController.create);
router.post('/signIn', userController.signIn);

module.exports = router;