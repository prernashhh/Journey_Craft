import React, { useState } from "react";
import { Mail } from "lucide-react";
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import "./LoginSignup.css";

function LoginSignup({ onClose }) {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  const handleGoogleSuccess = (credentialResponse) => {
    console.log('Google Sign In Success:', credentialResponse);
    // Send token to your backend
    // TODO: Implement backend verification
  };

  const handleGoogleError = () => {
    console.error('Google Sign In Failed');
  };

  return (
    <div className="login-signup-container">
      <div className="login-signup-card">
        <button className="close-button" onClick={onClose}>×</button>
        
        <h2 className="form-title">{isLogin ? "Login" : "Sign Up"}</h2>
        
        <form className="auth-form">
          {!isLogin && (
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input type="text" id="name" placeholder="Enter your full name" />
            </div>
          )}
          
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <div className="input-with-icon">
              <Mail size={16} className="input-icon" />
              <input type="email" id="email" placeholder="Enter your email" />
            </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" placeholder="Enter your password" />
          </div>
          
          {isLogin && (
            <div className="forgot-password">
              <a href="#">Forgot password?</a>
            </div>
          )}
          
          <button type="submit" className="auth-button">
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>
        
        <div className="divider">
          <span>OR</span>
        </div>
        
        <GoogleOAuthProvider clientId="YOUR_NEW_CLIENT_ID_HERE">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleError}
            width="100%"
            theme="outline"
            text={isLogin ? "Continue with Google" : "Sign up with Google"}
            shape="rectangular"
            useOneTap={true}
          />
        </GoogleOAuthProvider>
        
        <div className="toggle-form">
          <p>
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <button className="toggle-button" onClick={toggleForm}>
              {isLogin ? "Sign Up" : "Login"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginSignup;