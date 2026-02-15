import crypto from "crypto";
import TryCatch from "../middlewares/TryCatch.js";
import { Courses } from "../models/Courses.js";
import { Lecture } from "../models/Lecture.js";
import { User } from "../models/User.js";
import { Payment } from "../models/Payment.js";
import { Progress } from "../models/Progress.js";

/* ================= COURSES ================= */

export const getAllCourses = TryCatch(async (req, res) => {
  const courses = await Courses.find();
  res.json({ courses });
});

export const getSingleCourse = TryCatch(async (req, res) => {
  const course = await Courses.findById(req.params.id);
  res.json({ course });
});

/* ================= LECTURES ================= */

export const fetchLectures = TryCatch(async (req, res) => {
  const lectures = await Lecture.find({ course: req.params.id });
  const user = await User.findById(req.user._id);

  if (user.role === "admin") return res.json({ lectures });

  if (!user.subscription.includes(req.params.id)) {
    return res.status(403).json({
      message: "You have not subscribed to this course",
    });
  }

  res.json({ lectures });
});

export const fetchLecture = TryCatch(async (req, res) => {
  const lecture = await Lecture.findById(req.params.id);
  const user = await User.findById(req.user._id);

  if (user.role === "admin") return res.json({ lecture });

  if (!user.subscription.includes(lecture.course.toString())) {
    return res.status(403).json({
      message: "You have not subscribed to this course",
    });
  }

  res.json({ lecture });
});

/* ================= USER COURSES ================= */

export const getMyCourses = TryCatch(async (req, res) => {
  const courses = await Courses.find({ _id: req.user.subscription });
  res.json({ courses });
});

/* ================= PAYU CHECKOUT ================= */

export const generatePayUHash = TryCatch(async (req, res) => {
  const { txnid, amount, productinfo, firstname, email } = req.body;

  const key = process.env.PAYU_KEY;
  const salt = process.env.PAYU_SALT;

  const hashString =
    `${key}|${txnid}|${amount}|${productinfo}|${firstname}|${email}` +
    `|||||||||||${salt}`;

  const hash = crypto
    .createHash("sha512")
    .update(hashString)
    .digest("hex");

  res.status(200).json({ hash });
});

export const checkout = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const course = await Courses.findById(req.params.id);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    if (user.subscription.includes(course._id)) {
      return res.status(400).json({
        message: "You already have this course",
      });
    }

    const txnid = "TXN" + Date.now();
    const key = process.env.PAYU_KEY;
    const salt = process.env.PAYU_SALT;

    const amount = Number(course.price).toFixed(2);

    // ✅ Clean product title
    const productinfo = course.title.replace(/[^a-zA-Z0-9 ]/g, "");

    const firstname = user.name.replace(/[^a-zA-Z0-9 ]/g, "");
    const email = user.email;

    const hashString =
      `${key}|${txnid}|${amount}|${productinfo}|${firstname}|${email}` +
      `|||||||||||${salt}`;


    const hash = crypto
      .createHash("sha512")
      .update(hashString)
      .digest("hex");

    res.status(200).json({
      key,
      txnid,
      amount,
      productinfo,
      firstname,
      email,
      phone: user.phone || "9999999999",
      udf1: "",
      udf2: "",
      udf3: "",
      udf4: "",
      udf5: "",
      surl: `${process.env.BACKEND_URL}/api/payment/success/${course._id}`,
      furl: `${process.env.BACKEND_URL}/api/payment/failure`,
      hash,
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Checkout error" });
  }
};

/* ================= PAYU SUCCESS ================= */

export const paymentSuccess = async (req, res) => {
  try {
    const {
      status,
      txnid,
      amount,
      productinfo,
      firstname,
      email,
      hash,
      mihpayid,
      udf1 = "",
      udf2 = "",
      udf3 = "",
      udf4 = "",
      udf5 = "",
    } = req.body;

    const salt = process.env.PAYU_SALT;
    const key = process.env.PAYU_KEY;

    const reverseHashString =
      `${salt}|${status}|${udf5}|${udf4}|${udf3}|${udf2}|${udf1}` +
      `||||||${email}|${firstname}|${productinfo}|${amount}|${txnid}|${key}`;

    const calculatedHash = crypto
      .createHash("sha512")
      .update(reverseHashString)
      .digest("hex");


    if (hash !== calculatedHash) {
      return res.status(400).send("Invalid Transaction");
    }

    await Payment.create({
      txnid,
      payu_payment_id: mihpayid,
      status,
      amount,
      email,
    });

    const user = await User.findOne({ email });
    const course = await Courses.findById(req.params.id);

    user.subscription.push(course._id);

    // ✅ Update role to student (if not admin)
    if (user.role !== "admin") {
      user.role = "student";
    }

    await Progress.create({
      user: user._id,
      course: course._id,
      completedLectures: [],
    });

    await user.save();

    // ✅ Redirect with update flag
    res.redirect(`${process.env.FRONTEND_URL}/payment-success?payment=success&updateRole=true`);

  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
};

/* ================= PAYU FAILURE ================= */

export const paymentFailure = (req, res) => {
  res.redirect(`${process.env.FRONTEND_URL}/payment-failed`);
};

/* ================= PROGRESS ================= */

export const addProgress = TryCatch(async (req, res) => {
  const { course, lectureId } = req.query;

  const progress = await Progress.findOne({
    user: req.user._id,
    course,
  });

  if (progress.completedLectures.includes(lectureId)) {
    return res.json({ message: "Progress recorded" });
  }

  progress.completedLectures.push(lectureId);
  await progress.save();

  res.status(201).json({ message: "New progress added" });
});

export const getYourProgress = TryCatch(async (req, res) => {
  const { course } = req.query;

  const progress = await Progress.findOne({
    user: req.user._id,
    course,
  });

  if (!progress) {
    return res.status(404).json({ message: "No progress found" });
  }

  const allLectures = await Lecture.countDocuments({ course });
  const completedLectures = progress.completedLectures.length;

  const courseProgressPercentage =
    (completedLectures * 100) / allLectures;

  res.json({
    courseProgressPercentage,
    completedLectures,
    allLectures,
    progress,
  });
});