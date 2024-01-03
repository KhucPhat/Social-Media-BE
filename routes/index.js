const userRouter = require("./users");

function route(app) {
  app.use("/api/v1", userRouter);
}

module.exports = route;
