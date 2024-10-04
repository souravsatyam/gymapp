// screens/LoginScreen.js

import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { loginUser } from '../api/apiService'; // Import the loginUser function

const LoginScreen = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleLogin = async () => {
    
    if (!phoneNumber) {
      Alert.alert('Error', 'Please enter your phone number.');
      return;
    }

    try {
      const data = await loginUser(phoneNumber); // Call the API service

      // Navigate to OTP screen on successful login
      navigation.navigate('OTPVerification', { mobileNumber: phoneNumber });
    } catch (error) {
      // Show error message if login failed
      console.error(error);
      Alert.alert('Login Failed', error.message);
    }
  };

  return (
    <View style={styles.container}>
      {/* Logo Image */}
      <Image
        source={{ uri: 'https://d250w8f359rhg6.cloudfront.net/static/media/logo-removebg-preview.783e77ab47a976cb321a.png' }} // Replace with your logo URL
        style={styles.logo}
        resizeMode="contain"
      />

      <Text style={styles.title}>Welcome back! Glad to see you, Agains!</Text>
      <Text style={styles.subtitle}>Book Your Workout Anytime, Anywhere</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter your phone number"
        keyboardType="phone-pad"
        maxLength={10}
        placeholderTextColor="#fff"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Don’t have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={styles.linkText}>Register Now</Text>
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
    backgroundColor: '#000',
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#fff',
  },
  subtitle: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 40,
  },
  input: {
    width: '100%',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 15,
    backgroundColor: '#333',
    color: '#fff',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#28a745',
    padding: 15,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
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
    color: '#28a745',
    fontWeight: 'bold',
  },
});

export default LoginScreen;