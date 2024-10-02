import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import FontAwesome for icons

const Footer = ({ navigation }) => {
  return (
    <View style={styles.footer}>
      <TouchableOpacity onPress={() => navigation.navigate('GymList')} style={styles.iconContainer}>
        <Text><Icon name="home" size={24} color="#fff" /></Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('InviteBuddy')} style={styles.iconContainer}>
        <Text><Icon name="search" size={24} color="#fff" /></Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Bookings')} style={styles.iconContainer}>
        <Text><Icon name="calendar" size={24} color="#fff" /></Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Profile')} style={styles.iconContainer}>
        <Text><Icon name="user" size={24} color="#fff" /></Text>
      </TouchableOpacity>
      
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around', // Space icons evenly
    alignItems: 'center',
    height: 60,
    backgroundColor: '#1c1c1c', // Dark background for the footer
    borderTopWidth: 1,
    borderTopColor: '#ccc', // Light gray border on top
  },
  iconContainer: {
    alignItems: 'center', // Center the icons
  },
});

export default Footer;
