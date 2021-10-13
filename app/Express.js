const express = require("express");
const http = require("http");

const production = require("../helpers/production");

global.express = express;
const app = express();
const server = http.createServer(app);

// standard Heroku App
const host = '0.0.0.0';
const port = process.env.PORT || 5000;

server.listen(port, host, () => {
    console.log("Express server listening on port %d in %s mode", port, production);
});

global.app = app;
global.server = server;
