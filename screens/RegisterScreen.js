// screens/RegisterScreen.js

import React from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, StyleSheet, Image } from 'react-native';

const RegisterScreen = ({ navigation }) => {
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
        placeholderTextColor="#fff" // White placeholder for better visibility
      />
      <TextInput
        style={styles.input}
        placeholder="Mobile Number"
        keyboardType="phone-pad"
        maxLength={10} // Assuming a 10-digit mobile number
        placeholderTextColor="#fff" // White placeholder for better visibility
      />

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
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
    backgroundColor: '#000', // Black background
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#fff', // White text
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
    backgroundColor: '#333', // Dark gray input background
    color: '#fff', // White text
    marginBottom: 20,
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
