import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";

export const GoogleAuth = () => {
  const navigate = useNavigate();

  const handleSuccess = (credentialResponse: any) => {
    console.log("Login Success:", credentialResponse);
    // Here you would typically send the credential to your backend
    // For now, just redirect
    navigate("/dashboard");
  };

  const handleError = () => {
    console.log("Login Failed");
  };

  return (
    <GoogleLogin
      onSuccess={handleSuccess}
      onError={handleError}
      useOneTap
      auto_select
      theme="filled_blue"
      shape="rectangular"
      size="large"
    />
  );
};
