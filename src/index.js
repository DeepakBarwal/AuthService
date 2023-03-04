const express = require("express");
const app = express();

const { PORT } = require("./config/serverConfig");
const apiRoutes = require("./routes/index");

const prepareAndStartServer = () => {

    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());

    app.use("/api", apiRoutes);

    app.listen(PORT, () => {
        console.log(`Server started on PORT: ${PORT}`);
    });
}

prepareAndStartServer();