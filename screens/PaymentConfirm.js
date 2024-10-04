import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';

const PaymentScreen = ({ route, navigation }) => {
  const { slotDetails } = route.params; // Extract slot details from navigation parameters

  const handlePayment = () => {
    // Navigate to ConfirmationScreen and pass the slot details
    navigation.navigate('ConfirmationScreen', { slotDetails });
  };

  return (
    <ImageBackground
      style={styles.background}
    >
      <View style={styles.container}>

        {/* Gym Information Section */}
        <View style={styles.card}>
          <Text style={styles.gymName}>Test Gym Name</Text>
          <Text style={styles.gymDescription}>
            Welcome to Test Gym, your ultimate fitness destination!
            We offer a variety of classes and personal training options to fit your needs.
          </Text>
          <Text style={styles.gymLocation}>Location: 123 Fitness St, Fit City</Text>
        </View>

        {/* Slot Details Section */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Slot Details</Text>
          <View style={styles.slotDetails}>
            <View style={styles.detailRow}>
              <FontAwesome name="calendar" size={24} color="#2e7d32" />
              <Text style={styles.detail}>Date: {slotDetails.date}</Text>
            </View>
            <View style={styles.detailRow}>
              <FontAwesome name="clock-o" size={24} color="#2e7d32" />
              <Text style={styles.detail}>Time: {slotDetails.time}</Text>
            </View>
            <View style={styles.detailRow}>
              <Icon name="hourglass-empty" size={24} color="#2e7d32" />
              <Text style={styles.detail}>Duration: {slotDetails.duration} mn</Text>
            </View>
            <View style={styles.detailRow}>
              <Entypo name="price-tag" size={24} color="#2e7d32" />
              <Text style={styles.price}>Price: ${slotDetails.price}</Text>
            </View>
          </View>
        </View>

        <TouchableOpacity style={styles.button} onPress={handlePayment}>
          <Text style={styles.buttonText}>Proceed</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 20,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    width: '90%',
    elevation: 5,
    marginVertical: 50,
  },
  gymName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2e7d32',
    marginBottom: 5,
    textAlign: 'center',
    fontFamily: 'Roboto',
  },
  gymDescription: {
    fontSize: 16,
    color: '#555',
    marginBottom: 10,
    textAlign: 'center',
    fontFamily: 'Roboto',
  },
  gymLocation: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    fontFamily: 'Roboto',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2e7d32',
    marginBottom: 10,
    textAlign: 'left',
  },
  slotDetails: {
    marginTop: 10,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  detail: {
    fontSize: 18,
    color: '#333',
    marginLeft: 10,
    fontFamily: 'Roboto',
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2e7d32',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#2e7d32',
    padding: 15,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    elevation: 5,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  backButton: {
    marginTop: 10,
    backgroundColor: '#c8e6c9',
    padding: 15,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
  },
  backButtonText: {
    color: '#2e7d32',
    fontSize: 18,
  },
});

export default PaymentScreen;
