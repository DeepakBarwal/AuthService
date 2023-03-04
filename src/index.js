const express = require("express");
const app = express();

const { PORT } = require("./config/serverConfig");
const apiRoutes = require("./routes/index");

const UserService = require("./services/user-service");

const prepareAndStartServer = () => {

    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());

    app.use("/api", apiRoutes);

    app.listen(PORT, () => {
        console.log(`Server started on PORT: ${PORT}`);

        const userService = new UserService();
        // const token = userService.createToken({email: 'test@test.com', id: 1});
        // console.log(token);
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAdGVzdC5jb20iLCJpZCI6MSwiaWF0IjoxNjc3OTA1MDcxLCJleHAiOjE2Nzc5MDg2NzF9.XuOUez3ID0rrYSAnEoPgYWqv2zUhPX-W5Y5kBB5xNS4'
        console.log(userService.verifyToken(token));
    });
}

prepareAndStartServer();