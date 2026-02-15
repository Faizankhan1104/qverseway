import express from "express";
import {
  getAllCourses,
  getSingleCourse,
  fetchLectures,
  fetchLecture,
  getMyCourses,
  checkout,
  paymentSuccess,
  paymentFailure,
} from "../controllers/course.js";
import { isAuth } from "../middlewares/isAuth.js";
import { generatePayUHash } from "../controllers/course.js";


const router = express.Router();

/* ================= COURSES ================= */

router.get("/course/all", getAllCourses);
router.get("/course/:id", getSingleCourse);

/* ================= LECTURES ================= */

router.get("/lectures/:id", isAuth, fetchLectures);
router.get("/lecture/:id", isAuth, fetchLecture);

/* ================= USER ================= */

router.get("/mycourse", isAuth, getMyCourses);
 
/* ================= PAYU PAYMENT ================= */

// create payment
router.post("/course/checkout/:id", isAuth, checkout);
// router.post("/payment/payu-hash", isAuth, generatePayUHash);


// PayU redirects here (NO isAuth)
router.post("/payment/success/:id", paymentSuccess);
router.post("/payment/failure", paymentFailure);

export default router;
