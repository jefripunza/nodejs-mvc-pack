const app = global.app;

const Controller = require('./controllers');
const ControllerBackend = require("./controllers/backend");

// =================================================================

app.post("/backend/:request", ControllerBackend.request);
app.post("/backend/:request/:mode", ControllerBackend.request_mode);

// paling bawah
app.post("*", ControllerBackend.index);
app.get("*", Controller.index);
