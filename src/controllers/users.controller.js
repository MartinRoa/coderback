import { userService } from "../services/users.service.js";

class UsersController {
    async getUsers(req, res) {
        try {
            const users = await userService.getUsers();
            return res.status(200).json({
                status: "success",
                message: "List of users.",
                data: users
            });
        }
        catch (error) {
            return res.status(409).json({
                status: "error",
                message: error.message,
                data: {}
            });
        }
    }

    async changeUserRole(req, res) {
        try {
            const idUser = req.params.uid;
            const userUpdated = await userService.updateUser(idUser);
            res.status(200).json({
                status: "success",
                message: "User role successfully modified.",
                data: userUpdated
            });
        }
        catch (error) {
            res.status(409).json({
                status: "error",
                message: error.message,
                data: {}
            });
        }
    }

    async deleteUser(req, res) {
        try {
            const idToDelete = req.params.uid;
            const deleteUser = await userService.deleteUser(idToDelete);
            return res.status(200).json({
                status: "success",
                message: "User successfully deleted.",
                data: deleteUser
            });
        }
        catch (error) {
            return res.status(409).json({
                status: "error",
                message: error.message,
                data: {}
            });
        }
    }

    async showUsersList(req, res) {
        try {
            const finalData = await userService.getUsers();
            return res.status(200).render("users", { users: finalData });
        } 
        catch {
            return res.status(409).json({
                status: "error",
                message: "Could not get the users list.",
            });
        }
    }
}

export const usersController = new UsersController;