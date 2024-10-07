// screens/RegisterScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { registerUser } from '../api/apiService'; // Import the registerUser function

const RegisterScreen = ({ navigation }) => {
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleRegister = async () => {
    if (!fullName || !phoneNumber) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    
    try {
      const response = await registerUser(fullName, phoneNumber);
      console.log("Registration Success:", response);
      // Navigate to OTP screen with phoneNumber
      navigation.navigate('OTPVerification', { mobileNumber: phoneNumber });
    } catch (error) {
      console.error('Registration failed:', error);
      Alert.alert('Registration Error', 'Something went wrong during registration. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      {/* Logo Image */}
      <Image
        source={{ uri: 'https://example.com/logo.png' }} // Replace with your logo URL
        style={styles.logo}
      />

      <Text style={styles.title}>Create Your Account</Text>
      <Text style={styles.subtitle}>Join us to book your workouts!</Text>

      <TextInput
        style={styles.input}
        placeholder="Full Name"
        placeholderTextColor='#808080' // light grey placeholder for better visibility
        value={fullName}
        onChangeText={setFullName} // Update fullName state
      />
      <TextInput
        style={styles.input}
        placeholder="Mobile Number"
        keyboardType="phone-pad"
        maxLength={10} // Assuming a 10-digit mobile number
        placeholderTextColor='#808080' // light grey placeholder for better visibility
        value={phoneNumber}
        onChangeText={setPhoneNumber} // Update phoneNumber state
      />

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.linkText}>Login Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#FFFFFF', // white background
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#0ED94A', // White text
  },
  subtitle: {
    fontSize: 16,
    color: '#fff', // White text
    textAlign: 'center',
    marginBottom: 40,
  },
  input: {
    width: '100%',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 15,
    backgroundColor: '#D3D3D3', // light gray input background
    color: '#333', // White text
    marginBottom: 20,
    fontSize: 18,
    fontWeight:'bold',
  },
  button: {
    backgroundColor: '#28a745', // Green button color
    padding: 15,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff', // White text for button
    fontWeight: 'bold',
    fontSize: 16,
  },
  footer: {
    marginTop: 20,
    flexDirection: 'row',
  },
  footerText: {
    color: '#666',
  },
  linkText: {
    color: '#28a745', // Green link text
    fontWeight: 'bold',
  },
});

export default RegisterScreen;
