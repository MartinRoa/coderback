import { msgModel } from "./models/message.model.js";

class Msgs {
    async newMsg(msg) {
        const msgCreated = await msgModel.create(msg);
        return msgCreated;
    }

    async getAllMsgs() {
        const allMsgs = await msgModel.find({});
        return allMsgs;
    }
}

export default new Msgs();