const express = require("express");
const router = express.Router();
//include controller
const userCont = require("../../controller/userController");
//routes
//auth
router.post("/register", userCont.register);
router.post("/login", userCont.login);
router.get("/logout", userCont.logout);
//get
router.get("/", userCont.getAllUsers);
router.get("/:id", userCont.getUser);
//put
router.put("/:id", userCont.updateUser);
//patch
router.patch("/friends/:id", userCont.acceptInvitation);
router.patch("/invitations/:id", userCont.sendInvitation);
//delete
router.delete("/:id", userCont.deleteUser);

module.exports = router;
