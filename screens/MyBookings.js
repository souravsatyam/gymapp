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

  const handleCancelBooking = async (bookingId) => {
    try {
      const response = await cancelBooking(bookingId);
      if (response.success) {
        Alert.alert("Success", "Your booking has been canceled.");
        setBookings(prevBookings => prevBookings.filter(booking => booking.bookingId !== bookingId));
      } else {
        Alert.alert("Error", response.message);
      }
    } catch (error) {
      console.error("Error canceling booking:", error);
      Alert.alert("Error", "Could not cancel the booking.");
    }
  };

  const handleRebook = async (booking) => {
    try {
      const response = await rebook(booking);
      if (response.success) {
        Alert.alert("Success", "Your booking has been rebooked.");
        setBookings(prevBookings => prevBookings.filter(b => b.bookingId !== booking.bookingId));
      } else {
        Alert.alert("Error", response.message);
      }
    } catch (error) {
      console.error("Error rebooking:", error);
      Alert.alert("Error", "Could not rebook.");
    }
  };

  const handleInviteFriends = (bookingId) => {
    navigation.navigate('InviteFriendBuddy', { bookingId });
  };

  return (
    <View style={styles.container}>
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

      <ScrollView style={styles.scrollView}>
        {bookings
          .filter(booking => activeTab === 'Upcoming' ? new Date(booking.bookingDate) >= new Date() : new Date(booking.bookingDate) < new Date())
          .map((booking) => (
            <View key={booking.bookingId} style={styles.bookingContainer}>
              <View style={styles.bookingDetails}>
                <Text style={styles.bookingDate}>Date: {booking.bookingDate}</Text>
                <Text style={styles.gymName}>{booking.gymName}</Text>
                <Text style={styles.subscriptionPrice}>Price: ${booking.subscriptionPrice}</Text>
                <Text style={styles.subscriptionPrice}>Invited Buddy: {booking.invitedBuddyCount}</Text>
                {/* Small text link to invite friends */}
                  
                  <TouchableOpacity onPress={() => handleInviteFriends(booking.bookingId)}>
                    <Text style={styles.inviteLink}>Invite friends to join!</Text>
                  </TouchableOpacity>
             
              </View>
              <Image
                source={{ uri: booking.gymImage }}
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
    backgroundColor: '#f5f5f5', // Light gray background for a clean look
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  tabButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    backgroundColor: '#e0f7fa', // Light blue for tabs
  },
  activeTabButton: {
    backgroundColor: '#80deea', // Darker blue for active tab
  },
  tabButtonText: {
    color: '#00796b', // Dark teal text
    fontSize: 16,
    fontWeight: 'bold',
  },
  activeTabText: {
    color: '#004d40', // Darker shade for active tab
  },
  scrollView: {
    marginBottom: 60,
  },
  bookingContainer: {
    marginBottom: 15,
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#ffffff', // White background for bookings
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  bookingDetails: {
    marginVertical: 5,
  },
  bookingDate: {
    fontSize: 14,
    color: '#00796b', // Dark teal
  },
  gymName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#004d40', // Darker teal
    marginTop: 5,
  },
  subscriptionPrice: {
    fontSize: 14,
    color: '#00796b',
    fontWeight: 'bold',
    marginTop: 5,
  },
  inviteLink: {
    fontSize: 14,
    color: '#2196F3', // Blue for link
    marginTop: 5,
    textDecorationLine: 'underline', // Underline to indicate it's a link
  },
  gymImage: {
    height: 120,
    width: '100%',
    borderRadius: 8,
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
