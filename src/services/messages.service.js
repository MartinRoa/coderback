import { msgModel } from "../DAO/models/message.model.js";

class MsgService {
    async newMsg(msg) {
        const msgCreated = await msgModel.create(msg);
        return msgCreated;
    }

    async getAllMsgs() {
        const allMsgs = await msgModel.find({});
        return allMsgs;
    }
}

export default MsgService;