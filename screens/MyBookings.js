import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { fetchAllBookings } from '../api/apiService';
import Footer from '../components/Footer';

const BookingScreen = ({navigation}) => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTab, setSelectedTab] = useState('Upcoming'); // State for tab selection

  // Fetch booking data from API
  const fetchBookings = async () => {
    try {
      const response = await fetchAllBookings();

      setBookings(response.Booking); // Update state with booking data
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch data');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings(); // Fetch bookings on component mount
  }, []);

  // Helper function to determine if the booking is upcoming or completed
  const isUpcoming = (bookingDate) => {
    const today = new Date();
    const bookingDay = new Date(bookingDate);
    return bookingDay >= today; // Future or today
  };

  // Filter bookings based on selected tab (Upcoming or Completed)
  const filteredBookings = bookings.filter((item) => {
    return selectedTab === 'Upcoming' ? isUpcoming(item.bookingDate) : !isUpcoming(item.bookingDate);
  });

  // Handler for View Details button
  const handleViewDetails = (bookingId) => {
    console.log('View details for:', bookingId);
    // Navigate to booking details page or show more information
  };

  // Handler for Cancel Booking button
  const handleCancelBooking = (bookingId) => {
    console.log('Cancel booking:', bookingId);
    // Implement cancel booking logic
  };

  // Render each booking item with View Details and Cancel Booking buttons
  const renderBookingItem = ({ item }) => (
    <View style={styles.bookingCard}>
      <Text style={styles.gymName}>{item.gymName}</Text>
      <Text>Date: {item.bookingDate}</Text>
      <Text>Start Time: {item.slotStartTime}</Text>
      <Text>Subscription Price: {item.subscriptionPrice}</Text>
      <Text>Buddies Invited: {item.invitedBuddyCount}</Text>
      
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.viewDetailsButton} onPress={() => handleViewDetails(item.bookingId)}>
          <Text style={styles.buttonText}>View Details</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.cancelButton} onPress={() => handleCancelBooking(item.bookingId)}>
          <Text style={styles.buttonText}>Cancel Booking</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return <Text style={styles.errorText}>{error}</Text>;
  }

  return (
    <View style={styles.container}>
      {/* Tabs for Upcoming and Completed */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tabButton, selectedTab === 'Upcoming' && styles.activeTab]}
          onPress={() => setSelectedTab('Upcoming')}
        >
          <Text style={styles.tabText}>Upcoming</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabButton, selectedTab === 'Completed' && styles.activeTab]}
          onPress={() => setSelectedTab('Completed')}
        >
          <Text style={styles.tabText}>Completed</Text>
        </TouchableOpacity>
      </View>

      {/* List of bookings filtered based on the selected tab */}
      <FlatList
        data={filteredBookings}
        keyExtractor={(item) => item.bookingId}
        renderItem={renderBookingItem}
        ListEmptyComponent={<Text>No bookings found</Text>}
      />
      <Footer navigation={navigation} />
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  tabButton: {
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: '#4CAF50',
  },
  tabText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  bookingCard: {
    padding: 16,
    marginVertical: 8,
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  gymName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  viewDetailsButton: {
    padding: 10,
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    flex: 1,
    marginRight: 10,
  },
  cancelButton: {
    padding: 10,
    backgroundColor: '#ff1744',
    borderRadius: 8,
    flex: 1,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default BookingScreen;
