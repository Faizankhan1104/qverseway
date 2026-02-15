// routes/userRoutes.js - COMPLETE FILE

import express from "express";
import {
  forgotPassword,
  loginUser,
  myProfile,
  register,
  resetPassword,
  verifyUser,
  getUpdatedProfile, 
  changePassword// ✅ NEW IMPORT
} from "../controllers/user.js";
import { isAuth } from "../middlewares/isAuth.js";
import { addProgress, getYourProgress } from "../controllers/course.js";

const router = express.Router();

router.post("/user/register", register);
router.post("/user/verify", verifyUser);
router.post("/user/login", loginUser);
router.get("/user/me", isAuth, myProfile);
router.get("/user/profile", isAuth, getUpdatedProfile); // ✅ NEW ROUTE
router.post("/user/change-password", isAuth, changePassword);
router.post("/user/forgot", forgotPassword);
router.post("/user/reset/:token", resetPassword);
router.post("/user/progress", isAuth, addProgress);
router.get("/user/progress", isAuth, getYourProgress);

export default router;