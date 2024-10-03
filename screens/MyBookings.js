import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import the navigation hook

const MyBookings = () => {
  // State to track which tab is selected
  const [activeTab, setActiveTab] = useState('Upcoming');

  // State to track total invites
  const [totalInvites, setTotalInvites] = useState(2); // Example starting with 2 invites

  const navigation = useNavigation(); // Get the navigation object

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Bookings</Text>

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
      <ScrollView>
        {activeTab === 'Upcoming' && (
          <>
            {/* Upcoming Booking 1 */}
            <View style={styles.bookingContainer}>
              <View style={styles.bookingDetails}>
                {/* Booking Date and Time */}
                <Text style={styles.bookingDate}>Booking Date: September 15, 2024</Text>
                <Text style={styles.bookingTime}>Time: 9:00 AM - 10:00 AM</Text>

                {/* Row with Image and Gym Name */}
                <View style={styles.imageTextRow}>
                  <Image 
                    source={{ uri: "https://th.bing.com/th/id/R.ae8099552a6cb9d1d0c0e74d8f793538?rik=0P8dxBBcaCyX7g&riu=http%3a%2f%2fwallpapers-all.com%2fuploads%2fposts%2f2016-12%2f9_gym.jpg&ehk=x3kWLILAbm9B0Ty5mX4mXu6Z2Pc2iMmQ4Yocbgos37o%3d&risl=&pid=ImgRaw&r=0" }} 
                    style={styles.gymImage}
                  />
                  <Text style={styles.gymName}>Cult Fit</Text>
                </View>

                {/* Location and Rating */}
                <Text style={styles.location}>Location: Bhanshankari, Bengaluru, IN 560085</Text>
                <Text style={styles.rating}>4.91 (289 Reviews)</Text>

                {/* Invites Section */}
                <View style={styles.inviteContainer}>
                  <Text style={styles.inviteText}>Total Invites: {totalInvites}</Text>
                  <TouchableOpacity onPress={() => navigation.navigate('InviteBuddy')} style={styles.addInviteButton}>
                    <Text style={styles.addInviteButtonText}>Add Invite</Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/* Actions (Cancel) */}
              <View style={styles.actionsContainer}>
                <TouchableOpacity style={styles.cancelButton}>
                  <Text style={styles.cancelButtonText}>Cancel Booking</Text>
                </TouchableOpacity>
              </View>
            </View>
          </>
        )}

        {activeTab === 'Completed' && (
          <>
            {/* Completed Booking 1 */}
            <View style={styles.bookingContainer}>
              <View style={styles.bookingDetails}>
                {/* Booking Date and Time */}
                <Text style={styles.bookingDate}>Booking Date: April 26, 2024</Text>
                <Text style={styles.bookingTime}>Time: 10:00 PM - 03:00 PM</Text>

                {/* Row with Image and Gym Name */}
                <View style={styles.imageTextRow}>
                  <Image 
                    source={{ uri: "https://s3-media0.fl.yelpcdn.com/bphoto/79LqIdRdF-WfEl4XqTvM8A/l.jpg" }} 
                    style={styles.gymImage}
                  />
                  <Text style={styles.gymName}>Gold's Gym</Text>
                </View>

                {/* Location and Rating */}
                <Text style={styles.location}>Location: Mumbai, Maharashtra</Text>
                <Text style={styles.rating}>4.0 (115 Reviews)</Text>

                {/* Invites Section */}
                <View style={styles.inviteContainer}>
                  <Text style={styles.inviteText}>Total Invites: {totalInvites}</Text>
                </View>
              </View>

              {/* Actions (Book Again) */}
              <View style={styles.actionsContainer}>
                <TouchableOpacity style={styles.bookAgainButton}>
                  <Text style={styles.buttonText}>Book Again</Text>
                </TouchableOpacity>
              </View>
            </View>
          </>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F4F9',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2C3E50',
    textAlign: 'center',
    marginBottom: 20,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
    backgroundColor: '#E0E5EC',
    borderRadius: 10,
    paddingVertical: 5,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    marginHorizontal: 5,
    backgroundColor: '#E0E5EC',
    borderRadius: 10,
    alignItems: 'center',
  },
  activeTabButton: {
    backgroundColor: '#28A745', // Green color for active tab
    elevation: 5, // Shadow for depth effect
  },
  tabButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#34495E',
  },
  activeTabText: {
    color: '#FFFFFF',
  },
  bookingContainer: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  bookingDetails: {
    marginBottom: 15,
  },
  imageTextRow: {
    flexDirection: 'row',
    alignItems: 'center', // Align the image and text vertically
    marginBottom: 10,
  },
  gymImage: {
    width: 60, // Small width for the image
    height: 60, // Small height for the image
    borderRadius: 10, // Round the corners of the image
    marginRight: 15, // Space between image and text
  },
  gymName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#34495E',
  },
  bookingDate: {
    fontSize: 16,
    color: '#7F8C8D',
    marginBottom: 5,
  },
  bookingTime: {
    fontSize: 16,
    color: '#7F8C8D',
    marginBottom: 5,
  },
  location: {
    fontSize: 16,
    color: '#7F8C8D',
    marginBottom: 5,
  },
  rating: {
    fontSize: 14,
    color: '#28A745',
  },
  inviteContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  inviteText: {
    fontSize: 16,
    color: '#34495E',
  },
  addInviteButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 10,
  },
  addInviteButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end', // Align actions to the right
    marginTop: 15,
  },
  cancelButton: {
    backgroundColor: '#F44336', // Red color for the cancel button
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    elevation: 2,
    shadowColor: '#000', // Add shadow for depth
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    marginLeft: 10, // Space between buttons
  },
  cancelButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    textAlign: 'center', // Center the text
  },
  bookAgainButton: {
    backgroundColor: '#28A745', // Green color for the book again button
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    elevation: 2,
    shadowColor: '#000', // Add shadow for depth
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    textAlign: 'center', // Center the text
  },
});

export default MyBookings;
