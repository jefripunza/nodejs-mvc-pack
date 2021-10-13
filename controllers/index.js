const path = require("path");
const fs = require("fs");
const config = require('../config');

const { public, viewsFrontend, fileNotFound } = require('../utils/response');

exports.index = (req, res, next) => {
    const now_path = req.params[0],
        filename = now_path.replace(/^.*[\\\/]/, ''),
        isFile = String(filename).includes(".");
    if (![
        "socket.io",
    ].some(v => now_path.includes(v))) {
        if (isFile) {
            const public_file = path.join(config.public_path, now_path);
            if (fs.existsSync(public_file)) {
                return public(res, public_file);
            } else { // system
                const system_path = path.join(__dirname, "..", "system", "assets", now_path);
                if (fs.existsSync(system_path)) {
                    return public(res, system_path);
                } else {
                    if (![
                        "favicon.ico",
                    ].some(v => now_path.includes(v))) {
                        return fileNotFound(res);
                    } else {
                        next();
                    }
                }
            }
        } else {
            return viewsFrontend(res, "Home", "testing aja ini mah...", "httek.jepege"); // Next to React JS Router Handler
            // return public(res, path.join(config.public_path, "index.html")); // development non EJS
        }
    } else {
        next();
    }
}