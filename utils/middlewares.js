//Logs each request to console
const requestLogger = (request, response, next) => {
  console.log("Method:", request.method);
  console.log("Path:  ", request.path);
  console.log("Body:  ", request.body);
  console.log("---");
  next();
};

//Default endpoint
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

/**
 * To send the response data of a request
 * @param {Object} result - The JSON data that is requested
 * @param {Boolean} success - true if the query returns expected data
 * @param { Number } statusCode - Response Status code
 * @param {String} message - Description of the response
 * @param {Object} res - http response object
 */
const outputHandler = (result, success, statusCode, message, res) => {
  return res.status(statusCode).json({
    result,
    success,
    message,
  });
};

module.exports = {
  requestLogger,
  unknownEndpoint,
  outputHandler,
};
