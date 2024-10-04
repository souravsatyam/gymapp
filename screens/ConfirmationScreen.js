import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';

const ConfirmationScreen = ({ route }) => {
  const { slotDetails } = route.params; // Get slot details from navigation parameters

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <ImageBackground
          source={{ uri: 'https://www.istockphoto.com/photo/isometric-view-of-sport-equipment-like-kettlebell-dumbbell-and-barbell-on-violet-gm1370649838-440153242?searchscope=image%2Cfilm' }}
          style={styles.backgroundImage}
        >
          <View style={styles.overlay} />
        </ImageBackground>
      </View>

      <View style={styles.textContainer}>
        <Text style={styles.title}>Confirmed! Get ready to sweat.</Text>
        <Text style={styles.subtitle}>Spot secured! Get ready for a great workout.</Text>

        <View style={styles.detailsContainer}>
          <Text style={styles.detailTitle}>Booking details</Text>
          <Text style={styles.detail}>Gym: {slotDetails.gymName}</Text>
          <Text style={styles.detail}>Location: {slotDetails.location}</Text>
          <Text style={styles.detail}>Date & time: {slotDetails.date} - {slotDetails.time}</Text>
        </View>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Got it</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {
    flex: 0.6, // 60% for the image
  },
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.7)', // Light overlay for text readability
  },
  textContainer: {
    flex: 0.4, // 40% for the text
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2C3E50',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#34495E',
    textAlign: 'center',
    marginBottom: 20,
  },
  detailsContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    width: '100%', // Full width for details container
    elevation: 5,
  },
  detailTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  detail: {
    fontSize: 16,
    color: '#34495E',
    marginBottom: 5,
  },
  button: {
    backgroundColor: '#28A745', // Green button
    padding: 15,
    borderRadius: 10,
    width: '80%', // Adjust the width as needed
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ConfirmationScreen;
