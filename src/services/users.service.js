import { Users } from "../DAO/factory.js";

class UsersService {
    constructor(dao) {
        this.dao = dao;
    }

    async newUser(newUser) {
        const userCreated = await this.dao.newUser(newUser);
        return userCreated;
    }

    async getUsers() {
        const users = await this.dao.getUsers();
        const usersFinal = [];
        users.forEach(user => {
            usersFinal.push({
                id: user._id,
                name: user.firstName,
                email: user.email,
                role: user.role,
                isAdmin: (user.role === "admin") ? true : false,
                isPremium: (user.role === "premium") ? true : false
            })
        });
        return usersFinal;
    }

    async getUserById(userId) {
        const user = await this.dao.getUserById(userId);
        return user;
    }

    async getUserByUsername(username) {
        const user = await this.dao.getUserByUsername(username);
        return user;
    }

    async updateUser(userId){
        const user = await this.getUserById(userId);
        const userNewRole = (user.role === "user") ? "premium" : "user";
        const userUptaded = await this.dao.updateUser(userId, {role: userNewRole});
        return userUptaded;
    }

    async deleteUser(userId) {
        const userDeleted = await this.dao.deleteUser(userId);
        return userDeleted;
    }
}

export const userService = new UsersService(Users);