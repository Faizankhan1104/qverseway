// pages/PaymentSuccess.jsx

import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateUser } from '../../redux/slices/authSlice'; // ✅ Import updateUser
import api from '../../api/axios';

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const courseId = searchParams.get('courseId');

  useEffect(() => {
    const updateUserData = async () => {
      try {
        console.log("🔄 Fetching updated user data...");
        
        const { data } = await api.get('/user/profile');
        
        console.log("✅ User data received:", data.user);
        console.log("✅ New role:", data.user.role);
        
        // ✅ Update Redux (only user data, token already hai)
        dispatch(updateUser(data.user));

        console.log("✅ Redux updated!");

        // 3 seconds wait
        setTimeout(() => {
          navigate(`/course`);
        }, 3000);

      } catch (err) {
        console.error("❌ Error fetching user:", err);
        navigate('/student');
      }
    };

    updateUserData();
  }, [courseId, navigate, dispatch]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50">
      <div className="text-center bg-white p-12 rounded-2xl shadow-2xl max-w-md">
        {/* Success Icon */}
        <div className="mb-6">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
            <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
        </div>

        <h1 className="text-3xl font-bold text-gray-800 mb-3">
          Payment Successful! 🎉
        </h1>
        
        <p className="text-gray-600 mb-6">
          Your course has been activated successfully
        </p>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <p className="text-blue-700 font-medium">
            You are now a student!
          </p>
        </div>

        {/* Loading Animation */}
        <div className="flex items-center justify-center space-x-2">
          <div className="animate-bounce">
            <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
          </div>
          <div className="animate-bounce delay-100">
            <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
          </div>
          <div className="animate-bounce delay-200">
            <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
          </div>
        </div>

        <p className="text-sm text-gray-500 mt-4">
          Redirecting to your course...
        </p>
      </div>
    </div>
  );
};

export default PaymentSuccess;