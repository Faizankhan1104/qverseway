import { useLocation, Navigate } from "react-router-dom";
import Verification from "./Verification";

const VerifyEmailWrapper = () => {
  const location = useLocation();
  const email = location.state?.email; // <- must be passed from navigate

  // if email not present (direct access), redirect to register
  if (!email) return <Navigate to="/register" replace />;

  return <Verification email={email} />;
};

export default VerifyEmailWrapper;
