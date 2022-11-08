const controller = require("../controller/userController")

module.exports = (app) => {
    app.post("/api/user/signup", controller.userSignUp)
    app.post("/api/user/signin", controller.userSignIn)
    app.post("/api/user/userlist", controller.userList)
}