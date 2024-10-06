import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage
import { verifyOtp } from '../api/apiService'; // Import the verifyOtp function

export default function OTPVerificationScreen({ route, navigation }) {
  const [otp, setOtp] = useState('');
  const { mobileNumber } = route.params; // Get the mobile number passed from the Login Screen

  const handleVerifyOtp = async () => {
    navigation.navigate('GymList');
    if (!otp) {
      Alert.alert('Error', 'Please enter the OTP.');
      return;
    }

    try {
      const data = await verifyOtp(mobileNumber, otp); // Call the API to verify OTP

      if (data.status) { // If verification is successful, store the token
        await AsyncStorage.setItem('authToken', data.token); // Store token in AsyncStorage
        // Navigate to the Register screen or Home screen
        navigation.navigate('GymList');
      } else {
        Alert.alert('OTP Verification Failed', data.message || 'The OTP verification failed. Please try again.');
      }
    } catch (error) {
      console.error('OTP Verification Error:', error);
      Alert.alert('Error', 'Something went wrong. Please try again later.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>OTP Verification</Text>
      <Text style={styles.subtitle}>Enter the verification code we just sent to {mobileNumber}.</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter OTP"
        placeholderTextColor="#ccc"
        keyboardType="numeric"
        maxLength={6}
        value={otp}
        onChangeText={setOtp}
      />

      <TouchableOpacity style={styles.button} onPress={handleVerifyOtp}>
        <Text style={styles.buttonText}>Verify</Text>
      </TouchableOpacity>

      <Text style={styles.resendText}>
        Didn’t receive the code?{' '}
        <Text style={styles.linkText} onPress={() => {/* Resend OTP logic */}}>
          Resend
        </Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#000', // Black background
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#fff', // White text
    marginBottom: 20,
  },
  subtitle: {
    textAlign: 'center',
    color: '#ccc', // Light gray subtitle text
    marginBottom: 40,
  },
  input: {
    width: '100%',
    borderColor: '#555', // Darker gray border for input
    borderWidth: 1,
    borderRadius: 5,
    padding: 15,
    backgroundColor: '#333', // Dark gray input background
    color: '#fff', // White text in input
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#28a745', // Green button
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
    width: '100%',
  },
  buttonText: {
    color: '#fff', // White text on button
    fontWeight: 'bold',
    fontSize: 16,
  },
  resendText: {
    color: '#ccc', // Light gray resend text
    marginTop: 20,
    textAlign: 'center',
  },
  linkText: {
    color: '#28a745', // Green text for Resend link
    fontWeight: 'bold',
  },
});
