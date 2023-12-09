class UserDataSessionDTO {
    constructor(user) {
        this.email = user.email,
        this.firstName = user.firstName,
        this.lastName = user.lastName,
        this.cart = user.cart,
        this.role = user.role
    }
}

export default UserDataSessionDTO;