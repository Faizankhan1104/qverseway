// controllers/user.js - COMPLETE FILE WITH NEW FUNCTION

import { User } from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import sendMail, { sendForgotMail } from "../middlewares/sendMail.js";
import TryCatch from "../middlewares/TryCatch.js";

export const register = TryCatch(async (req, res) => {
  const { email, name, password } = req.body;

  let user = await User.findOne({ email });

  if (user)
    return res.status(400).json({
      message: "User Already exists",
    });

  const hashPassword = await bcrypt.hash(password, 10);

  user = {
    name,
    email,
    password: hashPassword,
  };

  const otp = Math.floor(Math.random() * 1000000);

  const activationToken = jwt.sign(
    {
      user,
      otp,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "5m",
    }
  );

  const data = {
    name,
    otp,
  };

  await sendMail(email, "E learning", data);
  // console.log("OTP sent to email:", email, "OTP:", otp);
  
  res.status(200).json({
    message: "Otp send to your mail",
    activationToken,
  });
});

export const verifyUser = TryCatch(async (req, res) => {
  const { otp, activationToken } = req.body;
  // console.log("Received OTP:", otp, "and activationToken:", activationToken);

  const verify = jwt.verify(activationToken, process.env.JWT_SECRET);

  if (!verify)
    return res.status(400).json({
      message: "Otp Expired",
    });

  if (verify.otp !== otp)
    return res.status(400).json({
      message: "Wrong Otp",
    });

  await User.create({
    name: verify.user.name,  
    email: verify.user.email,
    password: verify.user.password,
  });

  res.json({
    message: "User Registered",
  });
});

export const loginUser = TryCatch(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user)
    return res.status(400).json({
      message: "No User with this email",
    });

  const mathPassword = await bcrypt.compare(password, user.password);

  if (!mathPassword)
    return res.status(400).json({
      message: "wrong Password",
    });

  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "15d",
  });
  
  res.json({
    message: `Welcome back ${user.name}`,
    token,
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role, // ✅ Role return karo
      subscription: user.subscription,
    },
  });
});

export const myProfile = TryCatch(async (req, res) => {
  const user = await User.findById(req.user._id);

  res.json({ 
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role, // ✅ Role return karo
      subscription: user.subscription,
    }
  });
});

// ✅✅ NEW FUNCTION - Get Updated User Profile
// controllers/user.js - Add/Update this function

export const getUpdatedProfile = TryCatch(async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  
  // ✅ Check and update role before sending response
  if (user.role !== "admin" && user.subscription.length > 0) {
    user.role = "student";
    await user.save();
    console.log(`✅ Role updated to student for: ${user.email}`);
  }
  
  res.json({
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      subscription: user.subscription,
      phone: user.phone,
    }
  });
});

export const forgotPassword = TryCatch(async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({
      message: "No User with this email",
    });
  }

  const token = jwt.sign(
    { email },
    process.env.JWT_SECRET,
    { expiresIn: "5m" }
  );

  await sendForgotMail("E learning", { email, token });

  user.resetPasswordExpire = Date.now() + 5 * 60 * 1000;
  await user.save();

  res.json({
    message: "Reset Password Link is sent to your mail",
  });
});

export const resetPassword = TryCatch(async (req, res) => {
  const { token } = req.params;

  const decodedData = jwt.verify(token, process.env.JWT_SECRET);

  const user = await User.findOne({ email: decodedData.email });

  if (!user)
    return res.status(404).json({
      message: "No user with this email",
    });

  if (!user.resetPasswordExpire)
    return res.status(400).json({
      message: "Token Expired",
    });

  if (user.resetPasswordExpire < Date.now())
    return res.status(400).json({
      message: "Token Expired",
    });

  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  user.password = hashedPassword;
  user.resetPasswordExpire = null;

  await user.save();

  res.json({ message: "Password Reset Successfully" });
});

// controllers/user.js - Add this function

export const changePassword = TryCatch(async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  // Get user
  const user = await User.findById(req.user._id);


  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  // Verify current password
  const isMatch = await bcrypt.compare(currentPassword, user.password);

  if (!isMatch) {
    return res.status(400).json({ message: "Current password is incorrect" });
  }

  // Hash new password
  const hashedPassword = await bcrypt.hash(newPassword, 10);

  // Update password
  user.password = hashedPassword;
  await user.save();

  res.json({ message: "Password changed successfully" });
});