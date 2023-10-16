// importing modules
const express = require("express");
const router = express.Router();

// importing controller
const userController = require("../controllers/userController");

// user -> test
router.get("/user/test", userController.test);
router.get("/user/all", userController.AllUsers);
router.get("/user/detail/:id", userController.DetailUser);
router.get("/user/whitelisted/:steamId", userController.WhiteListedBySteamId);

router.post("/user/signin", userController.SignIn);
router.post("/user/create", userController.CreateUser);
router.post("/user/edit/:id", userController.EditUser);
router.post("/user/whitelist/:steamId", userController.SetWhiteListBySteamId);

router.delete("/user/:id", userController.DeleteUser);

module.exports = router;
