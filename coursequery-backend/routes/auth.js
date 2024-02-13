const express = require("express");
const {
  register,
  login,
  getMe,
  forgotPassowrd,
  resetPassword,
  updateDetails,
  updatePassword,
  authenticateUser
} = require("../controllers/auth");

const router = express.Router();

const { protect } = require("../middleware/auth");

router.post("/register", register);
router.post("/login", login);
router.get("/me", protect, getMe);
router.put("/updatedetails", protect, updateDetails);
router.put("/updatepassword", protect, updatePassword);
router.post("/forgotpassword", forgotPassowrd);
router.put("/resetpassword/:resettoken", resetPassword);
router.post("/authenticateuser", authenticateUser)

module.exports = router;
