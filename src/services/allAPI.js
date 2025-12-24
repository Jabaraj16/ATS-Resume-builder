import { commonAPI } from "./commonAPI";
import { SERVER_URL } from "./serverUrl";

// Register API
export const registerAPI = async (user) => {
    return await commonAPI("POST", `${SERVER_URL}/api/auth/register`, user, "");
};

// Login API
export const loginAPI = async (user) => {
    return await commonAPI("POST", `${SERVER_URL}/api/auth/login`, user, "");
};

// Verify OTP API
export const verifyOTPAPI = async (reqBody) => {
    return await commonAPI("POST", `${SERVER_URL}/api/auth/verify-otp`, reqBody, "");
};

// Resend OTP API
export const resendOTPAPI = async (reqBody) => {
    return await commonAPI("POST", `${SERVER_URL}/api/auth/resend-otp`, reqBody, "");
};

// Forgot Password API
export const forgotPasswordAPI = async (reqBody) => {
    return await commonAPI("POST", `${SERVER_URL}/api/auth/forgot-password`, reqBody, "");
};

// Reset Password API
export const resetPasswordAPI = async (reqBody) => {
    return await commonAPI("POST", `${SERVER_URL}/api/auth/reset-password`, reqBody, "");
};

// Parse Resume API
export const parseResumeAPI = async (reqBody, reqHeader) => {
    return await commonAPI("POST", `${SERVER_URL}/api/resume/parse`, reqBody, reqHeader);
};

// Upload Photo API
export const uploadPhotoAPI = async (reqBody, reqHeader) => {
    return await commonAPI("POST", `${SERVER_URL}/api/resume/upload-photo`, reqBody, reqHeader);
};

// Get Current User API
export const meAPI = async (reqHeader) => {
    return await commonAPI("GET", `${SERVER_URL}/api/auth/me`, "", reqHeader);
};

// ATS Analysis API
export const atsAnalysisAPI = async (reqBody, reqHeader) => {
    return await commonAPI("POST", `${SERVER_URL}/api/ats/analyze`, reqBody, reqHeader);
};
