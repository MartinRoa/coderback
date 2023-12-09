import { Tickets } from "../DAO/factory.js";

class TicketsService {
    constructor(dao) {
        this.dao = dao;
    }

    async createTicket(user) {
        const createdTicket = await this.dao.createTicket(user);
        return createdTicket;
    }

    async getTicketById(id) {
        const ticket = await this.dao.getTicketById(id);
        return ticket;
    }

    async updateTicketAmount(id, amount) {
        const updatedTicket = await this.dao.updateTicketAmount(id, amount);
        return updatedTicket;
    }
}

export const ticketsService = new TicketsService(Tickets);