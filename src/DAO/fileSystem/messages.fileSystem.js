import fs from "fs";

class Messages {
    constructor(path) {
        this.path = path;
        this.messages = [];
    }

    async loadData() {
        if(fs.existsSync(this.path)){
            this.messages = JSON.parse(await fs.promises.readFile(this.path, "utf-8"));
        } else {
            await fs.promises.writeFile(this.path, JSON.stringify(this.messages));
        }
    }

    async newMsg(msg) {
        await this.loadData();

        let msgId;
        if(this.messages.length){
            msgId = parseInt(this.messages[this.messages.length - 1].id) + 1;
        } else {
            msgId = 1;
        }

        this.messages.push({
                id: msgId.toString(),
                user: msg.user,
                message: msg.message
        })

        const messagesString = JSON.stringify(this.messages);
        await fs.promises.writeFile(this.path, messagesString);
        return true;
    }

    async getAllMsgs() {
        await this.loadData();
        return this.messages;
    }
}

export default new Messages("src/database/messages.json");