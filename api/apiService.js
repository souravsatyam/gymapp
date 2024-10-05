// api/apiService.js

import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BASE_URL = 'https://9a35-2406-7400-94-f161-c9ec-feed-8b00-2a2d.ngrok-free.app/user/api'; // Change to HTTP for testing

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



export const registerUser = async (fullName, phoneNumber) => {
  try {
    console.log(`${BASE_URL}/auth/login`);
    const response = await axios.post(`${BASE_URL}/auth/register`, {
      full_name: fullName,
      mobile_number: phoneNumber
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


  export const fetchAllNearByUser = async (searchText = '') => {
    try {
      const userToken = await AsyncStorage.getItem('authToken'); // Fetch token if needed
      const endpoint = searchText
      ? `${BASE_URL}/users/search/${searchText}`
      : `${BASE_URL}/users/nearby-users?lat=12.9716&long=77.5946`;
      const response = await fetch(endpoint, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${userToken}`, // Include the bearer token
        },
      });
      const data = await response.json();
      console.log()
      const formattedBuddies = data.map(user => ({
        id: user.id,
        name: user.full_name,
        status: user.is_selected ? 'Available' : 'Unavailable',
        image: user.profile_pic || 'https://via.placeholder.com/50', // Use a placeholder if no image
        inGym: user.is_selected,
        invited: user.friendRequestStatus,
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
      console.log("Data received", data);
      return data.loggedInUser;
    
    } catch (error) {
      console.error('Error fetching user data:', error);
     
    }
  }



  export const addFriend = async (userId) => {
    try {
      const userToken = await AsyncStorage.getItem('authToken'); // Fetch token if needed
      const response = await axios.post(
        `${BASE_URL}/friends/add`,
        { userId: userId },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,  // Add the Bearer token here
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error sending friend request:', error);
      throw error;
    }
  };



  export const createBooking = async (slotDetails) => {
    console.log("slotDetails.date", slotDetails.date);
    try {
   
        const [month, day, year] = slotDetails.date.split('/'); // Split by '/' 

// Create a new date object in the format YYYY-MM-DD
        const parsedDate = new Date(`${year}-${month}-${day}`);
        const bookingDate = parsedDate.toISOString(); // Convert to ISO format
      const userToken = await AsyncStorage.getItem('authToken'); // Fetch token if needed
      const response = await axios.post(`${BASE_URL}/booking/create`, {
        slotId: slotDetails.slotId, // slot ID
        gymId: slotDetails.gymId,   // gym ID
        bookingDate: bookingDate, // current date
        subscriptionType: "daily", // subscription type
        subscriptionId: slotDetails.subscriptionId,         // subscription ID
        paymentId: slotDetails?.paymentId || Date.now.toString(),              // razorpay payment ID
      },{
        headers: {
          Authorization: `Bearer ${userToken}`,  // Add the Bearer token here
        },
      });
      
      // Handle response
      console.log("Response Status", response.status);
      if (response.status === 200 || response.status === 201) {
       
        return true;
      } else {
      
        return false;
      }
    } catch (error) {
      console.log("Error is", error);
      return false;
    }
  };



  export const fetchAllBookings = async () => {
    try {
      const userToken = await AsyncStorage.getItem('authToken'); // Fetch token if needed
      const response = await fetch(`${BASE_URL}/booking/get`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${userToken}`, // Include the bearer token
        },
      }); // Your API endpoint
      const data = await response.json();

    

      return data;
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };



  export const fetchAllNotifications = async () => {
    try {
      const userToken = await AsyncStorage.getItem('authToken'); // Fetch token if needed
      const response = await axios.get(`${BASE_URL}/notifications/get`, {
        headers: {
          Authorization: `Bearer ${userToken}`, // Make sure to replace <your_token> with the actual token
        },
      });
      return response.data
    } catch (error) {
      console.log("Error", error.response.data.message);
      console.log('Failed to load notifications');
      return error.response.data;
    }
  };


  export const acceptFriendRequest = async (requestId) => {
    try {
        const userToken = await AsyncStorage.getItem('authToken'); // Fetch token if needed
        const response = await axios.post(`${BASE_URL}/friends/accept`, {
            requestId: requestId,
        }, {
          headers: {
            Authorization: `Bearer ${userToken}`, // Make sure to replace <your_token> with the actual token
          },
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message || 'Error accepting request');
    }
};

export const rejectFriendRequest = async (requestId) => {
    try {
        const userToken = await AsyncStorage.getItem('authToken'); // Fetch token if needed
        const response = await axios.post(`${BASE_URL}/friends/reject`, {
            requestId: requestId,
        }, {
          headers: {
            Authorization: `Bearer ${userToken}`, // Make sure to replace <your_token> with the actual token
          },
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message || 'Error rejecting request');
    }
};
