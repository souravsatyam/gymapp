import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const Footer = ({ navigation }) => {
  return (
    <View style={styles.footer}>
      <TouchableOpacity onPress={() => navigation.navigate('GymList')} style={styles.iconContainer}>
        <Icon name="home" size={24} color="#fff" />
        <Text style={styles.iconText}>Home</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('InviteBuddy')} style={styles.iconContainer}>
        <Icon name="search" size={24} color="#fff" />
        <Text style={styles.iconText}>Search</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Bookings')} style={styles.iconContainer}>
        <Icon name="calendar" size={24} color="#fff" />
        <Text style={styles.iconText}>Bookings</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Profile')} style={styles.iconContainer}>
        <Icon name="user" size={24} color="#fff" />
        <Text style={styles.iconText}>Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 60,
    backgroundColor: '#1c1c1c',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    elevation: 5, // Add a shadow effect for Android
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  iconContainer: {
    alignItems: 'center',
    padding: 8, // Add padding for better touch area
  },
  iconText: {
    color: '#fff',
    fontSize: 12,
    marginTop: 4, // Space between icon and text
  },
});

export default Footer;
