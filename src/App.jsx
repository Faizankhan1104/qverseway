import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "./components/Layout/MainLayout";
import Home from "./pages/home/Home";
import About from "./pages/about/About";
import './App.css';
import Courses from "./pages/courses/Courses";
import Contact from "./pages/contact/Contact";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import StudentDashboard from "./pages/dashboard/StudentDashboard"; 
import Price from "./pages/pricing/Price";
import Basic from "./pages/basic/Basic";
import { useDispatch } from "react-redux";
import api from "./api/axios";
import { useEffect } from "react";
import { setCourses } from "./redux/slices/courseSlice";
import Verification from "./pages/verificationPage/Verification";
import CoursePlayers from "./pages/courseplayer/CoursePlayers";
import WhatsAppFloat from "./utils/WhatsAppFloat";
import ForgotPassword from "./components/forgetPassword/ForgotPassword";
import ResetPassword from "./components/forgetPassword/ResetPassword";
import Dashboard from "./components/dashboard/Dashboard";
import ProtectedRoute from "./utils/ProtectedRoute";
import PublicRoute from "./utils/PublicRoute";
import PaymentSuccess from "./pages/paymentSuccess/PaymentSuccess";
import RefundPolicy from "./pages/legalities/RefundPolicy";
import PrivacyPolicy from "./pages/legalities/PrivacyPolicy";
import TermsConditions from "./pages/legalities/TermsConditions";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    api.get("/course/all")
      .then(res => dispatch(setCourses(res.data.courses)))
      .catch(console.error);
  }, []);

  return (
    <>
      <BrowserRouter>
        <MainLayout>
          <Routes>
            {/* Public Routes - No Authentication Required */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/course" element={<Courses />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/pricing" element={<Price />} />
            <Route path="/course/:id" element={<Basic />} />
            <Route path="/payment-success" element={<PaymentSuccess />} />
            <Route path="/refund-policy" element={<RefundPolicy />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsConditions />} />

            {/* Auth Routes - Only for Non-Logged Users */}
            <Route
              path="/login"
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              }
            />
            <Route
              path="/register"
              element={
                <PublicRoute>
                  <Register />
                </PublicRoute>
              }
            />
            <Route path="/verify-email" element={<Verification />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />

            {/* Course Player - Student & Admin Both Can Access */}
            <Route
              path="/lectures/:id"
              element={
                <ProtectedRoute allowedRoles={['student', 'admin']}>
                  <CoursePlayers />
                </ProtectedRoute>
              }
            />

            {/* Student Dashboard - Student & Admin Both */}
            <Route
              path="/student"
              element={
                <ProtectedRoute allowedRoles={['student', 'admin']}>
                  <StudentDashboard />
                </ProtectedRoute>
              }
            />

            {/* Admin Only Routes */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            

            {/* 404 Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </MainLayout>
      </BrowserRouter>
      <WhatsAppFloat />
    </>
  );
}

export default App;