const { clear } = require("./utils/system");
clear(); // space CLI

// ===========================================
require("./app/Express");
require("./middlewares");
require("./routes");
// ===========================================
require("./app/WhatsAppBOT");
require("./app/SocketIO");
