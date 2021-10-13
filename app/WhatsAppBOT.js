const fs = require("fs");
const path = require('path');
const baileys = require("@adiwajshing/baileys");
const config = require("../config");

const whatsapp_user = "data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMjEyIDIxMiIgd2lkdGg9IjIxMiIgaGVpZ2h0PSIyMTIiIGNsYXNzPSIiPjxwYXRoIGZpbGw9IiNERkU1RTciIGNsYXNzPSJiYWNrZ3JvdW5kIiBkPSJNMTA2LjI1MS41QzE2NC42NTMuNSAyMTIgNDcuODQ2IDIxMiAxMDYuMjVTMTY0LjY1MyAyMTIgMTA2LjI1IDIxMkM0Ny44NDYgMjEyIC41IDE2NC42NTQuNSAxMDYuMjVTNDcuODQ2LjUgMTA2LjI1MS41eiI+PC9wYXRoPjxwYXRoIGZpbGw9IiNGRkYiIGNsYXNzPSJwcmltYXJ5IiBkPSJNMTczLjU2MSAxNzEuNjE1YTYyLjc2NyA2Mi43NjcgMCAwIDAtMi4wNjUtMi45NTUgNjcuNyA2Ny43IDAgMCAwLTIuNjA4LTMuMjk5IDcwLjExMiA3MC4xMTIgMCAwIDAtMy4xODQtMy41MjcgNzEuMDk3IDcxLjA5NyAwIDAgMC01LjkyNC01LjQ3IDcyLjQ1OCA3Mi40NTggMCAwIDAtMTAuMjA0LTcuMDI2IDc1LjIgNzUuMiAwIDAgMC01Ljk4LTMuMDU1Yy0uMDYyLS4wMjgtLjExOC0uMDU5LS4xOC0uMDg3LTkuNzkyLTQuNDQtMjIuMTA2LTcuNTI5LTM3LjQxNi03LjUyOXMtMjcuNjI0IDMuMDg5LTM3LjQxNiA3LjUyOWMtLjMzOC4xNTMtLjY1My4zMTgtLjk4NS40NzRhNzUuMzcgNzUuMzcgMCAwIDAtNi4yMjkgMy4yOTggNzIuNTg5IDcyLjU4OSAwIDAgMC05LjE1IDYuMzk1IDcxLjI0MyA3MS4yNDMgMCAwIDAtNS45MjQgNS40NyA3MC4wNjQgNzAuMDY0IDAgMCAwLTMuMTg0IDMuNTI3IDY3LjE0MiA2Ny4xNDIgMCAwIDAtMi42MDkgMy4yOTkgNjMuMjkyIDYzLjI5MiAwIDAgMC0yLjA2NSAyLjk1NSA1Ni4zMyA1Ni4zMyAwIDAgMC0xLjQ0NyAyLjMyNGMtLjAzMy4wNTYtLjA3My4xMTktLjEwNC4xNzRhNDcuOTIgNDcuOTIgMCAwIDAtMS4wNyAxLjkyNmMtLjU1OSAxLjA2OC0uODE4IDEuNjc4LS44MTggMS42Nzh2LjM5OGMxOC4yODUgMTcuOTI3IDQzLjMyMiAyOC45ODUgNzAuOTQ1IDI4Ljk4NSAyNy42NzggMCA1Mi43NjEtMTEuMTAzIDcxLjA1NS0yOS4wOTV2LS4yODlzLS42MTktMS40NS0xLjk5Mi0zLjc3OGE1OC4zNDYgNTguMzQ2IDAgMCAwLTEuNDQ2LTIuMzIyek0xMDYuMDAyIDEyNS41YzIuNjQ1IDAgNS4yMTItLjI1MyA3LjY4LS43MzdhMzguMjcyIDM4LjI3MiAwIDAgMCAzLjYyNC0uODk2IDM3LjEyNCAzNy4xMjQgMCAwIDAgNS4xMi0xLjk1OCAzNi4zMDcgMzYuMzA3IDAgMCAwIDYuMTUtMy42NyAzNS45MjMgMzUuOTIzIDAgMCAwIDkuNDg5LTEwLjQ4IDM2LjU1OCAzNi41NTggMCAwIDAgMi40MjItNC44NCAzNy4wNTEgMzcuMDUxIDAgMCAwIDEuNzE2LTUuMjVjLjI5OS0xLjIwOC41NDItMi40NDMuNzI1LTMuNzAxLjI3NS0xLjg4Ny40MTctMy44MjcuNDE3LTUuODExcy0uMTQyLTMuOTI1LS40MTctNS44MTFhMzguNzM0IDM4LjczNCAwIDAgMC0xLjIxNS01LjQ5NCAzNi42OCAzNi42OCAwIDAgMC0zLjY0OC04LjI5OCAzNS45MjMgMzUuOTIzIDAgMCAwLTkuNDg5LTEwLjQ4IDM2LjM0NyAzNi4zNDcgMCAwIDAtNi4xNS0zLjY3IDM3LjEyNCAzNy4xMjQgMCAwIDAtNS4xMi0xLjk1OCAzNy42NyAzNy42NyAwIDAgMC0zLjYyNC0uODk2IDM5Ljg3NSAzOS44NzUgMCAwIDAtNy42OC0uNzM3Yy0yMS4xNjIgMC0zNy4zNDUgMTYuMTgzLTM3LjM0NSAzNy4zNDUgMCAyMS4xNTkgMTYuMTgzIDM3LjM0MiAzNy4zNDUgMzcuMzQyeiI+PC9wYXRoPjwvc3ZnPg==";

class WhatsApp {
    /**
     * WhatsApp Bot (baileys)
     * @param {*} SESSION_DATA tempat menyimpan session file 
     * @param {*} option {debug} 
     */
    constructor(SESSION_DATA, option = {}) {
        const conn = new baileys.WAConnection();
        if (option.autoReconnect) {
            /**
             * onAllErrors
             * onConnectionLost // only automatically reconnect when the connection breaks
             */
            conn.autoReconnect = baileys.ReconnectMode[option.autoReconnect]; // specific
        } else {
            conn.autoReconnect = baileys.ReconnectMode.onAllErrors; // default
        }
        conn.connectOptions.maxRetries = 10000;
        if (option.debug) {
            conn.logger.level = 'debug';
            conn.chatOrderingKey = baileys.waChatKey(true) // order chats such that pinned chats are on top
        }
        conn.on('open', async function () {
            fs.writeFileSync(SESSION_DATA, JSON.stringify(conn.base64EncodedAuthInfo(), null, '\t')); // nyimpen sesi baru
        });
        if (fs.existsSync(SESSION_DATA)) {
            conn.loadAuthInfo(SESSION_DATA);
        }
        conn.on('close', ({ reason, isReconnecting }) => {
            if (option.debug) {
                console.log('oh no got disconnected: ' + reason + ', reconnecting: ' + isReconnecting);
            }
            if (option.reconnect) {
                conn.connect(); // reconnect
            }
        })
        conn.connect(); // auto connect after declaration
        //
        this.conn = conn;
        this.SESSION_DATA = SESSION_DATA;
        this.option = option;
        this.blocked = [];
    }
    // =================================================================
    #deleteSession(onSuccess) {
        fs.unlink(this.SESSION_DATA, (err) => {
            if (err) {
                console.error(err)
                return
            } else {
                console.log('Session file deleted!');
                onSuccess();
            }
        });
    }
    #formatter(number) {
        let formatted = number;
        const standard = '@c.us'; // @s.whatsapp.net / @c.us
        if (!String(formatted).endsWith("@g.us")) { // isGroup ? next
            // 1. Menghilangkan karakter selain angka
            formatted = number.replace(/\D/g, '');
            // 2. Menghilangkan angka 62 di depan (prefix)
            //    Kemudian diganti dengan 0
            if (formatted.startsWith('0')) {
                formatted = '62' + formatted.substr(1);
            }
            // 3. Tambahkan standar pengiriman whatsapp
            if (!String(formatted).endsWith(standard)) {
                formatted += standard;
            }
        }
        return formatted;
    }
    // =================================================================
    reconnect() {
        this.conn.connect(); // reconnect
    }
    /**
     * 
     * @param {callback} onSuccess ketika selesai logout
     */
    logout(onSuccess) {
        this.#deleteSession(() => {
            this.conn.clearAuthInfo()
            setTimeout(() => {
                this.sendMessage(this.conn.user.jid, "logout....")
                onSuccess();
            }, 1000);
        })
    }
    // =================================================================
    //// Listen Family
    /**
     * 
     * @param {*} value mendapatkan value dari QR agar bisa di lempar menjadi gambar di website
     */
    listenQR(value) {
        this.conn.on('qr', qr => {
            // Now, use the 'qr' string to display in QR UI or send somewhere
            value(qr)
        });
    }
    /**
     * 
     * @param {object} client_info jika sudah terkoneksi maka akan mendapatkan informasi tentang client
     */
    listenConnected(client_info) {
        const getPP = (jid, img_url) => {
            this.getProfilePicture(jid, url => {
                img_url(url)
            });
        }
        const option = this.option;
        this.conn.on('open', async function () {
            const user = this.user;
            if (option.debug !== undefined) {
                console.log("WhatsApp Connected...");
                console.log('oh hello ' + user.name + ' (' + user.jid + ')')
            }
            getPP(user.jid, img_url => {
                user.imgUrl = img_url;
                client_info(user);
            });
        });
    }
    /**
     * 
     * @param {*} result mendapatkan jawaban mengapa bisa terputus
     */
    listenDisconnected(result) {
        this.conn.on('close', (why) => {
            result(why)
        });
    }
    /**
     * 
     * @param {*} value mendapatkan info baterai
     */
    listenBattery(value) {
        this.conn.on('CB:action,,battery', json => {
            const batteryLevelStr = json[2][0][1].value
            const batteryChargeStr = json[2][0][1].live
            value({
                level: parseInt(batteryLevelStr),
                charge: batteryChargeStr,
            });
        })
    }
    /**
     * 
     * @param {*} receive mendengarkan pesan masuk
     */
    listenMessage(receive) {
        const conn = this.conn;
        this.conn.on('chat-update', async chat => {
            if (chat.messages) {
                const detail = chat.messages.all()[0] // pull the new message from the update
                if (!detail.key.fromMe) {
                    const {
                        count,
                        t,
                        hasNewMessage,
                    } = chat;
                    const messageContent = detail.message;
                    const messageType = Object.keys(messageContent)[0] // message will always contain one key signifying what kind of message
                    const isGroup = String(chat.jid).endsWith("@g.us")
                    const sender = detail.key.remoteJid
                    receive({
                        conn,
                        chat,
                        count,
                        time: t,
                        hasNewMessage,
                        detail,
                        message: messageContent.conversation,
                        sender,
                        isGroup,
                        messageType,
                    })
                }
            }
        });
    }
    listenBlocklist() {
        this.conn.on('CB:Blocklist', json => {
            if (this.blocked.length > 0) return
            for (let i of json[1].blocklist) {
                this.blocked.push(i.replace('c.us', 's.whatsapp.net'))
            }
        })
    }
    // ==================================================================
    //// Function Family
    async responsePresence(jid) {
        await this.conn.chatRead(jid) // mark chat read
        await this.conn.updatePresence(jid, baileys.Presence.composing) // tell them we're typing...
        setTimeout(async () => {
            await this.conn.updatePresence(jid, baileys.Presence.paused)    // stopped typing, back to "online"
        }, 500);
    }
    async getProfilePicture(number, value) {
        await this.conn.getProfilePicture(this.#formatter(number)).then(url => {
            value(url)
        }).catch(error => {
            // not_found(error.context.message)
            value(whatsapp_user);
        })
    }
    async sendMessage(number, message, terkirim = false, gagal_mengirim = false) {
        await this.conn.sendMessage(this.#formatter(number), message, baileys.MessageType.text).then(() => {
            if (terkirim)
                terkirim();
        }).catch(error => {
            if (gagal_mengirim)
                gagal_mengirim(error);
        })
    }
    async sendButton(number, message) {
        // send a buttons message!
        const buttons = [
            { buttonId: 'id1', buttonText: { displayText: 'Button 1' }, type: 1 },
            { buttonId: 'id2', buttonText: { displayText: 'Button 2' }, type: 1 },
            // { buttonId: 'id3', buttonText: { displayText: 'Button 3' }, type: 1 },
            { buttonId: 'id4', buttonText: { displayText: 'Button 4' }, type: 1 },
            { buttonId: 'id5', buttonText: { displayText: 'Button 5' }, type: 1 },
        ]

        const buttonMessage = {
            contentText: "Hi it's button message",
            footerText: 'Hello World',
            buttons: buttons,
            headerType: 1
        }

        const sendMsg = await this.conn.sendMessage(this.#formatter(number), buttonMessage, baileys.MessageType.buttonsMessage)
    }
    async isRegisteredUser(number, isTrue, isNotFound) {
        await this.conn.isOnWhatsApp(this.#formatter(number))
            .then((result) => {
                if (result) {
                    isTrue(result)
                } else {
                    isNotFound();
                }
            })
    }
    async listGroup() {
        let getGroups = await this.conn.chats;
        let objGroup = { groups: [] };
        let members = getGroups.array;
        for (var key in members) {
            if (members[key].jid.indexOf('@g.us') != -1) {
                objGroup.groups.push({
                    id: members[key].jid,
                    name: members[key].name
                });
            }
        }
        return objGroup;
    }
    // =================================================================
    //// Combine
    getUserInfoOnReceive(receive, onResult) {
        const key = receive.key,
            sender = key.remoteJid,
            info = key.fromMe ? this.conn.user : this.conn.contacts[sender];
        this.getProfilePicture(sender, url => {
            info.imgUrl = url;
            onResult(info)
        });
    }
    // =================================================================
    //// Masih gagal
    async reply(number, message, quoted, onSuccess) {
        await this.conn.sendMessage(this.#formatter(number), message, baileys.MessageType.extendedText, { quoted }).then(() => {
            if (onSuccess)
                onSuccess();
        })
    }
    async keranjang(number, qty, message, onSuccess) {
        const fix_number = this.#formatter(number);
        await this.conn.sendMessage(fix_number, message, baileys.MessageType.extendedText, {
            // contextInfo: { mentionedJid: fix_number },
            quoted: {
                key: {
                    participant: '0@s.whatsapp.net' // Fake sender Jid
                },
                message: {
                    orderMessage: {
                        itemCount: qty,
                        status: 1,
                        surface: 1,
                        message: 'Keranjang',
                        sellerJid: '0@s.whatsapp.net' // Seller
                    },
                }
            }
        }).then(() => {
            if (onSuccess)
                onSuccess();
        })
    }
}

// =====================================================================

const bot = new WhatsApp(path.join(__dirname, "..", "system", config.whatsapp_session), {
    reconnect: true,
});
global.bot = bot;

// listen me
bot.listenConnected(client => {
    console.log({ client });
});
bot.listenMessage(async receive => {
    const {
        conn,
        chat,
        count,
        time,
        hasNewMessage,
        detail,
        message,
        sender,
        isGroup,
        messageType,
    } = receive;
    console.log({ receive });

    if (messageType === baileys.MessageType.text) {
        if (message === "!ping") {
            bot.responsePresence(sender);
            bot.reply(sender, "ompong", detail);
        } else if (message === "!button") {
            bot.sendButton(sender, "uhuuyyy");
        } else if (message === "!keranjang") {
            bot.responsePresence(sender);
            bot.keranjang(sender, 333, "list");
        }

        // bot.getUserInfoOnReceive(receive, result => {
        //     console.log(result);
        // })
    } else if (messageType === baileys.MessageType.extendedText) {
        const extendedMessage = detail.message.extendedTextMessage.text;
        console.log(sender + ' sent: ' + extendedMessage);
    } else if (messageType === baileys.MessageType.contact) {
        const contact = detail.message.contactMessage;
        console.log(sender + ' sent contact (' + contact.displayName + '): ' + contact.vcard)
    } else if (messageType === baileys.MessageType.location || messageType === baileys.MessageType.liveLocation) {
        const locMessage = detail.message[messageType];
        console.log(`${sender} sent location (lat: ${locMessage.degreesLatitude}, long: ${locMessage.degreesLongitude})`)
        await conn.downloadAndSaveMediaMessage(detail, './Media/media_loc_thumb_in_' + detail.key.id) // save location thumbnail
        if (messageType === baileys.MessageType.liveLocation) {
            console.log(`${sender} sent live location for duration: ${detail.duration / 60}`);
        }
    } else {
        // if it is a media (audio, image, video, sticker) message
        // decode, decrypt & save the media.
        // The extension to the is applied automatically based on the media type
        try {
            const savedFile = await conn.downloadAndSaveMediaMessage(detail, './Media/media_in_' + detail.key.id)
            console.log(sender + ' sent media, saved at: ' + savedFile)
        } catch (err) {
            console.log('error in decoding message: ' + err)
        }
    }
})