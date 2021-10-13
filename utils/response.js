const config = require('../config');

// =====================================================

const public = (res, path) => {
    res.sendFile(path);
}

// =====================================================

const views = (res, statusCode, ejs, inject_value) => {
    res.status(statusCode)
        .render(ejs, inject_value);
}

const viewsSystem = (res, statusCode, title, reason) => {
    views(res, statusCode, "../system/index.ejs", {
        statusCode,
        app_name: config.app_name,
        title,
        reason,
    });
}

const viewsFrontend = (res, title, description, img_url) => {
    views(res, 200, "../frontend/build/index.ejs", {
        app_name: config.app_name,
        title,
        description,
        img_url,
    });
}

// =====================================================

const fileNotFound = (res) => {
    viewsSystem(res, 404, "File Not Found!", "maybe file you are looking for has been deleted or is no longer available...")
}

const pageNotFound = (res) => {
    viewsSystem(res, 404, "Page Not Found!", "maybe page you are looking for is no longer available or does not exist...")
}

// =====================================================

const json = (res, message, data) => {
    res.json({
        success: true,
        message,
        data,
    });
};

const errorJson = (res, message, status = 500) => {
    res.status(status).json({
        success: false,
        message,
    });
};

// =====================================================

module.exports = {
    public,
    views,
    viewsSystem,
    viewsFrontend,
    //
    fileNotFound,
    pageNotFound,
    //
    json,
    errorJson,
}