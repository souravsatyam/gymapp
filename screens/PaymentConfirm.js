import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ImageBackground } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import RazorpayCheckout from 'react-native-razorpay';

const PaymentScreen = ({ route, navigation }) => {
  const { slotDetails } = route.params; // Extract slot details from navigation parameters
  

  const handlePayment = () => {
    
    var options = {
      description: 'Credits towards consultation',
      image: 'https://i.imgur.com/3g7nmJC.png',
      currency: 'INR',
      key: 'QaunL5f3pREFgj4wZXgruC57', // Your api key
      amount: slotDetails.price * (slotDetails.duration/60), // Amount in paisa (50000 paisa = ₹500),
      name: 'foo',
      prefill: {
        email: 'void@razorpay.com',
        contact: '9191919191',
        name: 'Razorpay Software'
      },
      theme: {color: '#F37254'}
    }
    RazorpayCheckout.open(options).then((data) => {
      // handle success
      Alert.alert(`Success: Payment ID: ${data.razorpay_payment_id}`);
    }).catch((error) => {
      // handle failure
      Alert.alert(`Error: ${error.code} | ${error.description}`);
    });
  };

  return (
    <ImageBackground
      //source={{ uri: 'https://media.istockphoto.com/id/866702538/photo/sprinter-running-on-track.jpg?s=2048x2048&w=is&k=20&c=WLGSCN0rR3A4lQq7VWmdRpDEWjH5kf-D9bQ8qIzvMVQ=' }}
      style={styles.container}
    >
      <View style={styles.overlay} />

      <Text style={styles.title}>Payment Screen</Text>
      <View style={styles.detailsContainer}>
        <View style={styles.detailRow}>
          <Icon name="calendar-today" size={24} color="#2e7d32" />
          <Text style={styles.detail}>Date: {slotDetails.date}</Text>
        </View>
        <View style={styles.detailRow}>
          <Icon name="access-time" size={24} color="#2e7d32" />
          <Text style={styles.detail}>Time: {slotDetails.time}</Text>
        </View>
        <View style={styles.detailRow}>
          <Icon name="hourglass-empty" size={24} color="#2e7d32" />
          <Text style={styles.detail}>Duration: {slotDetails.duration} mn</Text>
        </View>
        <View style={styles.detailRow}>
          <Icon name="attach-money" size={24} color="#2e7d32" />
          <Text style={styles.price}>Price: INR {slotDetails.price * (slotDetails.duration/60)}</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.button} onPress={handlePayment}>
        <Text style={styles.buttonText}>Make Payment</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>Go Back</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
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
    borderRadius: 10,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2e7d32', // Dark green text
    marginBottom: 20,
    fontFamily: 'Roboto', // Stylish font
  },
  detailsContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    elevation: 2,
    marginBottom: 20,
    width: '80%', // Set width to a percentage for better responsiveness
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
    fontFamily: 'Roboto', // Stylish font
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2e7d32', // Dark green price text
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#2e7d32', // Dark green button
    padding: 15,
    borderRadius: 10,
    width: '80%', // Set width to a percentage for better responsiveness
    alignItems: 'center',
    elevation: 3,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  backButton: {
    marginTop: 10,
    backgroundColor: '#c8e6c9', // Light green for back button
    padding: 15,
    borderRadius: 10,
    width: '80%', // Set width to a percentage for better responsiveness
    alignItems: 'center',
  },
  backButtonText: {
    color: '#2e7d32', // Dark green text for back button
    fontSize: 18,
  },
});

export default PaymentScreen;
