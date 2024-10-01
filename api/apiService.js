// api/apiService.js

import axios from 'axios';

const BASE_URL = 'https://094f-2401-4900-61a8-2123-6c3a-be0f-90d3-c211.ngrok-free.app/user/api'; // Change to HTTP for testing

// Function to handle login
export const loginUser = async (phoneNumber) => {
  try {
    console.log(`${BASE_URL}/auth/login`);
    const response = await axios.post(`${BASE_URL}/auth/login`, {
      identifier: phoneNumber,
    });
    console.log("Response Data", response.data);
    return response.data; // Return the data on success
  } catch (error) {
    console.error('API call error:', error);
    throw error; // Rethrow the error for handling in the calling function
  }
};


// Function to handle OTP verification
export const verifyOtp = async (mobileNumber, otp) => {
    try {
      console.log(`${BASE_URL}/auth/verify-otp`);
      const response = await axios.post(`${BASE_URL}/auth/verify-otp`, {
        mobile_number: mobileNumber,
        otp: otp,
      });
      console.log("OTP Verification Response Data", response.data);
      return response.data; // Return the data on success
    } catch (error) {
      console.error('OTP Verification API call error:', error);
      throw error; // Rethrow the error for handling in the calling function
    }
  };
