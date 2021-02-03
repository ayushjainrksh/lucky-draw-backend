module.exports = (app) => {
  app.use("/api/v1/test", require("./test"));
};
