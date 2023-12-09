import { Users } from "../DAO/factory.js";

class UsersService {
    constructor(dao) {
        this.dao = dao;
    }

    async newUser(newUser) {
        const userCreated = await this.dao.newUser(newUser);
        return userCreated;
    }

    async getUserById(userId) {
        const user = await this.dao.getUserById(userId);
        return user;
    }

    async getUserByUsername(username) {
        const user = await this.dao.getUserByUsername(username);
        return user;
    }

    async updateUser(userId, updateUser){
        const userUptaded = await this.dao.updateUser(userId, updateUser);
        return userUptaded;
    }

    async deleteUser(userId) {
        const userDeleted = await this.dao(userId);
        return userDeleted;
    }
}

export const userService = new UsersService(Users);