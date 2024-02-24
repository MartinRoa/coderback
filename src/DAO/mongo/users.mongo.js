import { usersModel } from "../mongo/models/users.model.js";

class Users {
    async newUser(newUser) {
        const userCreated = await usersModel.create(newUser);
        return userCreated;
    }

    async getUsers() {
        const users = await usersModel.find();
        return users;
    }

    async getUserById(userId) {
        const user = await usersModel.findOne({_id: userId});
        return user;
    }

    async getUserByUsername(username) {
        const user = await usersModel.findOne({ email: username });
        return user;
    }

    async updateUser(userId, updateUser){
        const userUptaded = await usersModel.updateOne({ _id: userId }, updateUser);
        return userUptaded;
    }

    async deleteUser(userId) {
        const userDeleted = await usersModel.deleteOne({_id: userId});
        return userDeleted;
    }
}

export default new Users();