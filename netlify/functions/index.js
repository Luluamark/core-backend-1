const serverless = require("serverless-http");
const app = require("../../app"); // this points to your Express app

module.exports.handler = serverless(app);
