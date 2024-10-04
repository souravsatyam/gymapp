// api/apiService.js

import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BASE_URL = 'https://f590-223-231-136-59.ngrok-free.app/user/api'; // Change to HTTP for testing

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


  export const fetchAllGyms = async () => {
    try {
      const latitude = 12.9716; // Replace with actual latitude
      const longitude = 77.5946; // Replace with actual longitude
      const userToken = await AsyncStorage.getItem('authToken'); // Fetch token if needed

      const response = await axios.get(
        `${BASE_URL}/gym/get?lat=${latitude}&long=${longitude}`,
        { headers: { Authorization: `Bearer ${userToken}` } } // Add token if required
      );
      
      if (response.data.status) {
        return response.data.gyms;
      }
    } catch (error) {
      console.error('Error fetching gyms:', error);
    }
  };

  export const fetchIndividualGymData = async (gym_id) => {
    try {
      const userToken = await AsyncStorage.getItem('authToken'); // Fetch token if needed
      const response = await fetch(`${BASE_URL}/gym/get/${gym_id}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${userToken}`, // Include the bearer token
        },
      });

      const data = await response.json();
      console.log("Data received", data);
      if (data?.status) {
        return data?.results[0];
      } else {
        console.error('Error fetching gym data:', data);
      }
    } catch (error) {
      console.error('Error fetching gyms:', error);
    }
  };


  export const fetchAllNearByUser = async () => {
    try {
      const userToken = await AsyncStorage.getItem('authToken'); // Fetch token if needed
      const response = await fetch(`${BASE_URL}/users/nearby-users?lat=12.9716&long=77.5946`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${userToken}`, // Include the bearer token
        },
      });
      const data = await response.json();
      const formattedBuddies = data.map(user => ({
        id: user.User.id,
        name: user.User.full_name,
        status: user.is_selected ? 'Available' : 'Unavailable',
        image: user.User.profile_pic || 'https://via.placeholder.com/50', // Use a placeholder if no image
        inGym: user.is_selected,
        invited: false,
      }));
      return formattedBuddies;
    } catch (error) {
      console.error('Error fetching nearby users:', error);
    }
  };

  export const userDetails = async () => {
    try {
      const userToken = await AsyncStorage.getItem('authToken'); // Fetch token if needed
      const response = await fetch(`${BASE_URL}/users/get`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${userToken}`, // Include the bearer token
        },
      });
    
      const data = await response.json();
      return data.loggedInUser;
    
    } catch (error) {
      console.error('Error fetching user data:', error);
     
    }
  }
