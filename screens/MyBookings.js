import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { fetchAllBookings, cancelBooking, rebook } from '../api/apiService'; // Assuming these functions are defined in your API service
import Footer from '../components/Footer';

const MyBookings = () => {
  const [activeTab, setActiveTab] = useState('Upcoming');
  const [bookings, setBookings] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const data = await fetchAllBookings();
        console.log("data received", data);
        setBookings(data.Booking); // Set bookings directly from the API response
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    fetchBookings();
  }, []);

  // Function to handle booking cancellation
  const handleCancelBooking = async (bookingId) => {
    try {
      const response = await cancelBooking(bookingId);
      if (response.success) {
        Alert.alert("Success", "Your booking has been canceled.");
        setBookings(prevBookings => prevBookings.filter(booking => booking.bookingId !== bookingId)); // Update state
      } else {
        Alert.alert("Error", response.message);
      }
    } catch (error) {
      console.error("Error canceling booking:", error);
      Alert.alert("Error", "Could not cancel the booking.");
    }
  };

  // Function to handle rebooking
  const handleRebook = async (booking) => {
    try {
      const response = await rebook(booking); // Pass booking details for rebooking
      if (response.success) {
        Alert.alert("Success", "Your booking has been rebooked.");
        setBookings(prevBookings => prevBookings.filter(b => b.bookingId !== booking.bookingId)); // Update state
      } else {
        Alert.alert("Error", response.message);
      }
    } catch (error) {
      console.error("Error rebooking:", error);
      Alert.alert("Error", "Could not rebook.");
    }
  };

  return (
    <View style={styles.container}>
      
      {/* Tabs for Upcoming and Completed */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'Upcoming' && styles.activeTabButton]}
          onPress={() => setActiveTab('Upcoming')}
        >
          <Text style={[styles.tabButtonText, activeTab === 'Upcoming' && styles.activeTabText]}>
            Upcoming
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'Completed' && styles.activeTabButton]}
          onPress={() => setActiveTab('Completed')}
        >
          <Text style={[styles.tabButtonText, activeTab === 'Completed' && styles.activeTabText]}>
            Completed
          </Text>
        </TouchableOpacity>
      </View>

      {/* Scrollable Booking List */}
      <ScrollView style={styles.scrollView}>
        {bookings
          .filter(booking => activeTab === 'Upcoming' ? new Date(booking.bookingDate) >= new Date() : new Date(booking.bookingDate) < new Date())
          .map((booking) => (
            <View key={booking.bookingId} style={styles.bookingContainer}>
              <View style={styles.bookingDetails}>
                <Text style={styles.bookingDate}>Booking Date: {booking.bookingDate}</Text>
                <Text style={styles.bookingTime}>Time: {booking.slotStartTime}</Text>
                <Text style={styles.gymName}>{booking.gymName}</Text>
                <Text style={styles.gymRating}>Rating: {booking.gymRating ? booking.gymRating : 'N/A'}</Text>
                <Text style={styles.subscriptionPrice}>Price: ${booking.subscriptionPrice}</Text>
              </View>
              <Image
                source={{ uri: booking.gymImage }} // Add a field for gym image in the booking data
                style={styles.gymImage}
                resizeMode="cover"
              />
              {activeTab === 'Upcoming' && (
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={() => handleCancelBooking(booking.bookingId)}
                >
                  <Text style={styles.buttonText}>Cancel Booking</Text>
                </TouchableOpacity>
              )}
              {activeTab === 'Completed' && (
                <TouchableOpacity
                  style={styles.rebookButton}
                  onPress={() => handleRebook(booking)}
                >
                  <Text style={styles.buttonText}>Rebook</Text>
                </TouchableOpacity>
              )}
            </View>
          ))}
      </ScrollView>
      <Footer navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f9f0', // Light green background
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2e7d32', // Dark green color
    textAlign: 'center',
    marginBottom: 20,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  tabButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 20,
    backgroundColor: '#e0f2f1', // Light green for the tabs
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  activeTabButton: {
    backgroundColor: '#a5d6a7', // Lighter green for the active tab
  },
  tabButtonText: {
    color: '#2e7d32', // Dark green text
    fontSize: 18,
    fontWeight: 'bold',
  },
  activeTabText: {
    color: '#004d40', // Darker shade for active tab
  },
  scrollView: {
    marginBottom: 60,
  },
  bookingContainer: {
    marginBottom: 20,
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#ffffff', // White background for bookings
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 6,
  },
  bookingDetails: {
    marginVertical: 5,
  },
  bookingDate: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2e7d32', // Dark green
  },
  bookingTime: {
    fontSize: 14,
    color: '#444', // Dark gray
  },
  gymName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#388e3c', // Medium green
    marginTop: 5,
  },
  gymRating: {
    fontSize: 14,
    color: '#666', // Gray for rating
  },
  subscriptionPrice: {
    fontSize: 16,
    color: '#2e7d32', // Dark green
    fontWeight: 'bold',
  },
  gymImage: {
    height: 150,
    width: '100%',
    borderRadius: 10,
    marginTop: 10,
  },
  cancelButton: {
    backgroundColor: '#f44336', // Red for cancel button
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
    alignItems: 'center',
  },
  rebookButton: {
    backgroundColor: '#4caf50', // Green for rebook button
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default MyBookings;
