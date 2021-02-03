module.exports = (app) => {
  app.use("/api/v1/test", require("./test"));
  app.use("/api/v1/ticket", require("./ticket"));
  app.use("/api/v1/event", require("./event"));
};
