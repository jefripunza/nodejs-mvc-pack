// ========================== LIBRARY 1ST =========================
const child_process = require('child_process'),
    fs = require("fs"),
    path = require("path")

// ======================== HELPER & UTILS ========================
const print = require("./utils/print");
const { clear } = require("./utils/system");
const { writeFile, isFileFolderExist, mkdirIfNotExist } = require("./utils/fs");
const { replaceAll } = require("./helpers/data");
const { requestGet } = require('./utils/axios');
const config = require('./config');

// ========================== LIBRARY 3th =========================
const JSSoup = require('jssoup').default
const minify = require('html-minifier').minify

// =========================== DEFINE ==========================
const path_frontend = path.join(__dirname, "frontend"),
    path_build = path.join(path_frontend, "build");
//
const path_html = path.join(path_build, "index.html"),
    path_ejs = path.join(path_build, "index.ejs")

// ========================== FUNCTION =========================
function closeApp(status = true) {
    setTimeout(() => {
        if (status) {
            print("happy hacking!", "success");
        } else {
            print("Oh Nooooo!", "error");
        }
        process.exit()
    }, 200);
}
function newTerminal(cmd) {
    child_process.exec(`start cmd.exe /K "${cmd}" `);
}
function execute(cmd, onFinish, dirname = __dirname) {
    child_process.exec(cmd, {
        cwd: dirname,
    }, (error, stdout, stderr) => {
        if (error) {
            print(`exec error: ${error}`, "error");
        } else {
            onFinish()
        }
    }).stdout.pipe(process.stdout);
}
function createMarkdown(onFinish = false) {
    requestGet(config.template_markdown, result => {
        writeFile(path.join(__dirname, "README.md"), replaceAll(result, "{{app_name}}", config.app_name), () => {
            print("README.md added!", "success");
            if (onFinish) {
                onFinish()
            } else {
                closeApp();
            }
        }, error => {
            print(error, "error");
            closeApp(false);
        })
    }, error => {
        print(error, "error");
        closeApp(false);
    }, () => {
        //
    }, false)
}

// ============================ MAIN ===========================
clear(); // space CLI
const mode = process.argv[2];
if (mode) {
    if (mode === "install") {
        print("Starting installation....", "title");
        const cmd = `yarn install && cd frontend && yarn install`;
        print("cmd : " + cmd, "notice");
        execute(cmd, () => {
            print("installation success!", "success");
            closeApp();
        });

    } else if (mode === "start") {
        newTerminal("SET NODE_ENV=development && nodemon");
        newTerminal("cd frontend && yarn start");
        closeApp();
    } else if (mode === "template") {
        if (isFileFolderExist(path.join(__dirname, "template"))) {
            mkdirIfNotExist(path.join(__dirname, "template"))
        }
        setTimeout(() => {
            newTerminal("cd system && nodemon template.js");
        }, 300);
        closeApp();
    } else if (mode === "ngrok") {
        newTerminal("ngrok.exe http 5000");
        closeApp();

    } else if (mode === "build") {
        print("Starting compile....", "title");
        print("target : " + path_frontend, "notice");
        execute(`cd frontend && yarn build`, () => {
            print("finish building react.js!", "success");
            setTimeout(() => {
                print("make EJS File...", "title");
                // process index.html to index.ejs
                setTimeout(() => {
                    const html_value = replaceAll(fs.readFileSync(path_html, { encoding: "utf-8" }), "http://localhost:5000", "");
                    var soup = new JSSoup(html_value);
                    //
                    // change title
                    soup.find('title').string.replaceWith('<%= title %>')
                    //
                    // change description content
                    const meta = soup.findAll('meta');
                    let selector_meta_i = 0;
                    for (let i = 0; i < meta.length; i++) {
                        if (meta[i].attrs.name === "description") {
                            selector_meta_i = i;
                        }
                    }
                    soup.findAll('meta')[selector_meta_i].attrs.content = "<%= description %>"
                    let result = "<!DOCTYPE html>" + soup.prettify().split("\n").filter((v, i) => {
                        return i > 1 ? true : false
                    }).join("\n");
                    //
                    // minify
                    result = minify(result, {
                        collapseBooleanAttributes: true,
                        collapseWhitespace: true,
                        decodeEntities: true,
                        removeAttributeQuotes: true,
                        removeComments: true,
                        // removeEmptyAttributes: true,
                        // removeEmptyElements: true, // dangerous for react app
                        removeOptionalTags: true,
                        removeRedundantAttributes: true,
                        removeScriptTypeAttributes: true,
                        removeStyleLinkTypeAttributes: true,
                        removeTagWhitespace: true,
                    });
                    //
                    print("index.html minify and set ejs format!", "success");
                    setTimeout(() => {
                        writeFile(path_ejs, result, () => {
                            print("write index.html FIX to index.ejs!", "success");
                            // delete index.html
                            fs.rm(path_html, () => {
                                print("delete index.html from public!", "success");
                                closeApp();
                            })
                        })
                    }, 1000);
                }, 1000);
            }, 2000);
        });

    } else if (mode === "create-readme") {
        createMarkdown(() => {
            print("README.md Created!", "success");
            closeApp();
        })

    } else if (mode === "github") {
        const menu = process.argv[3];
        if (menu === "init") {
            execute(`git init`, () => {
                print("Github initial DONE!", "success");
                execute(`git remote add origin ${config.github_repository}`, () => {
                    print("Github Initial DONE!", "success");
                    closeApp();
                })
            })
        } else if (menu === "first") {
            if (fs.existsSync(path.join(__dirname, "README.md"))) {
                execute(`git add README.md && git commit -m "first commit" && git branch -M main && git remote add origin ${config.github_repository} && git push -u origin main --force`, () => {
                    print("Github First Commit DONE!", "success");
                    closeApp();
                })
            } else {
                print("README.md not found, please run : node run create-readme", "error");
                closeApp(false);
            }
        } else if (menu === "push") {
            const commit_message = process.argv[4];
            if (commit_message !== undefined) {
                execute(`git add . && git commit -m "${commit_message}" && git branch -M main && git push -u origin main --force`, () => {
                    print("repository now is update!", "success");
                    closeApp();
                })
            } else {
                print("commit message?", "error");
                closeApp(false);
            }
        }

    } else if (mode === "push-heroku") {

    } else if (mode === "test") {
        //
    } else {
        print("mode not found!", "warning")
    }
} else {
    print("mode require!", "warning")
}
