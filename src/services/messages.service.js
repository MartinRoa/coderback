import { Messages } from "../DAO/factory.js";

class MsgService {
    constructor(dao) {
        this.dao = dao;
    }

    async newMsg(msg) {
        const msgCreated = await this.dao.newMsg(msg);
        return msgCreated;
    }

    async getAllMsgs() {
        const allMsgs = await this.dao.getAllMsgs();
        return allMsgs;
    }
}

export const msgService = new MsgService(Messages);