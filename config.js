const path = require('path');

const config = {
    // Application init
    app_name: "NodeJS MVC Pack",
    description: "this is website programming MVC environment",

    // Github Config
    github_repository: "https://github.com/jefripunza/nodejs-mvc-pack.git",
    template_markdown: "https://raw.githubusercontent.com/jefripunza/storage/main/README.md", // include "{{judul_project}}" for replace to name project

    public_path: path.join(__dirname, "frontend", "build"),

    whatsapp_session: "whatsapp-session.json",

    // your secure
    password_encrypt: "mvc", // change this for new security (only once)

    // for SQLite / Advance JSON Database
    models: {
        path: {
            database: path.join(__dirname, "models", "database"),
        },
    },

    // MongoDB setup
    mongodb_init: "",

    // system access
    environment: process.env.NODE_ENV,
    production: String(process.env.NODE_ENV).includes("production") ? true : false, // development
}

module.exports = config