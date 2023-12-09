import fs from "fs";

class Users {
    constructor(path) {
        this.path = path;
        this.users = [];
    }

    async loadData() {
        if(fs.existsSync(this.path)){
            this.users = JSON.parse(await fs.promises.readFile(this.path, "utf-8"));
        } else {
            await fs.promises.writeFile(this.path, JSON.stringify(this.users));
        }
    }

    async newUser(newUser) {
        await this.loadData();

        let userId;
        if(this.users.length){
            userId = parseInt(this.messages[this.users.length - 1].id) + 1;
        } else {
            userId = 1;
        }

        this.users.push({
                _id: userId.toString(),
                email: newUser.email,
                firstName: newUser.firstName,
                lastname: newUser.lastname,
                age: newUser.age,
                cart: newUser.cart,
                password: newUser.password,
                role: "user"
        })

        const usersString = JSON.stringify(this.users);
        await fs.promises.writeFile(this.path, usersString);
        return true;
    }

    async getUserById(userId) {
        await this.loadData();
        const user = this.users.find((e) => e._id === userId);

        if(user){
            return user;
        } else {
            return false;
        }
    }

    async getUserByUsername(username) {
        await this.loadData();
        const user = this.users.find((e) => e.email === username);

        if(user){
            return user;
        } else {
            return false;
        }
    }

    async updateUser(userId, updateUser){
        await this.loadData();
        const user = this.users.find((e) => e.id === userId);

        if(user){
            const userIndex = this.users.findIndex((u) => u._id === user._id);
            this.users.splice(userIndex, 1, {...user, ...updateUser});
            const usersString = JSON.stringify(this.users);
            await fs.promises.writeFile(this.path, usersString);
            return true;
        } else {
            return false;
        }
    }

    async deleteUser(userId) {
        await this.loadData();
        const user = this.users.find((e) => e.id === userId);

        if(user){
            const updateList = this.users.filter(u => u._id !== user._id);
            const usersString = JSON.stringify(updateList);
            await fs.promises.writeFile(this.path, usersString);
            return true;
        } else {
            return false;
        }
    }
}

export default new Users("src/database/users.json");