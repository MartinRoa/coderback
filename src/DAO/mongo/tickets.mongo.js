import { codeGenerator } from "../../utils.js";
import { ticketsModel } from "./models/tickets.model.js";

class Tickets {
    async getTickets() {
        const purchases = await ticketsModel.find({});
        return purchases;
    }

    async createTicket(user) {
        const purchases = await this.getTickets();
        const purchaseCode = codeGenerator(purchases);
        const createdTicket = await ticketsModel.create({ code: purchaseCode, amount: 0, purchaser: user});
        return createdTicket;
    }

    async getTicketById(id) {
        const ticket = await ticketsModel.findById({_id: id});
        return ticket;
    }

    async updateTicketAmount(id, amount) {
        const ticket = await this.getTicketById(id);
        const updatedTicket = await ticketsModel.updateOne({ _id: id }, { $set: { amount: ticket.amount + amount } })
        return updatedTicket;
    }
}

export default new Tickets();