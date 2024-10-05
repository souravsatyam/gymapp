import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import RazorpayCheckout from 'react-native-razorpay';
import { createBooking } from '../api/apiService';

const PaymentScreen = ({ route, navigation }) => {
  const { slotDetails } = route.params; // Extract slot details from navigation parameters
  
  console.log("slotDetails", slotDetails);
  const handlePayment = async () => {
    const data = await createBooking(slotDetails);
    if(data) {
      navigation.navigate('ConfirmationScreen', {slotDetails, data});
    } else {
      Alert.alert("Some error occured while booking slot");
    }
    
    // var options = {
    //   description: 'Credits towards consultation',
    //   image: 'https://i.imgur.com/3g7nmJC.png',
    //   currency: 'INR',
    //   key: 'QaunL5f3pREFgj4wZXgruC57', // Your api key
    //   amount: slotDetails.price * (slotDetails.duration/60), // Amount in paisa (50000 paisa = ₹500),
    //   name: 'foo',
    //   prefill: {
    //     email: 'void@razorpay.com',
    //     contact: '9191919191',
    //     name: 'Razorpay Software'
    //   },
    //   theme: {color: '#F37254'}
    // }
    // RazorpayCheckout.open(options).then((data) => {
    //   // handle success
    //   Alert.alert(`Success: Payment ID: ${data.razorpay_payment_id}`);
    // }).catch((error) => {
    //   // handle failure
    //   Alert.alert(`Error: ${error.code} | ${error.description}`);
    // });
  };

  return (
    <ImageBackground
      style={styles.background}
    >
      <View style={styles.container}>

        {/* Gym Information Section */}
        <View style={styles.card}>
          <Text style={styles.gymName}>{slotDetails.gymName}</Text>
          <Text style={styles.gymDescription}>
            Welcome to {slotDetails.gymName}, your ultimate fitness destination!
            We offer a variety of classes and personal training options to fit your needs.
          </Text>
          <Text style={styles.gymLocation}>Location: 123 Fitness St, Fit City</Text>
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
         
          <Text style={styles.price}>Price: INR {slotDetails.price * (slotDetails.duration/60)}</Text>
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
