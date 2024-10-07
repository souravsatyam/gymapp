import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

const MyBookings = () => {
  const [activeTab, setActiveTab] = useState('upcoming');

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <Text style={styles.header}>My bookings</Text>

      {/* Tabs for Upcoming and Completed */}
      <View style={styles.tabs}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'upcoming' && styles.activeTab]} 
          onPress={() => handleTabClick('upcoming')}
        >
          <Text style={[styles.tabText, activeTab === 'upcoming' && styles.activeTabText]}>Upcoming</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'completed' && styles.activeTab]} 
          onPress={() => handleTabClick('completed')}
        >
          <Text style={[styles.tabText, activeTab === 'completed' && styles.activeTabText]}>Completed</Text>
        </TouchableOpacity>
      </View>

      {/* Scrollable Bookings List */}
      <ScrollView>
        {/* Booking Card Example */}
        <View style={styles.bookingCard}>
          <Text style={styles.bookingDate}>Booking Date: April 26, 2023, 10:00 PM - 03:00 PM</Text>
          <View style={styles.gymDetails}>
            <Image 
              source={{ uri: 'https://via.placeholder.com/80' }} // Replace with real gym image URL
              style={styles.gymImage}
            />
            <View>
              <Text style={styles.gymName}>FitZone Gym</Text>
              <Text style={styles.gymLocation}>Fitness Gym, Downtown</Text>
              <Text style={styles.rating}>⭐⭐⭐⭐⭐ 4.5 (120 Reviews)</Text>
              <Text style={styles.invites}>2 Invites</Text>
            </View>
          </View>

          {/* Action Buttons */}
          <View style={styles.bookingActions}>
            <TouchableOpacity style={styles.cancelButton}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.detailsButton}>
              <Text style={styles.detailsButtonText}>View Details</Text>
            </TouchableOpacity>

            <View style={styles.addMore}>
              <TouchableOpacity style={styles.addMoreBtn}>
                <Text style={styles.addMoreBtnText}>-</Text>
              </TouchableOpacity>
              <Text style={styles.inviteCount}>1</Text>
              <TouchableOpacity style={styles.addMoreBtn}>
                <Text style={styles.addMoreBtnText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNavigation}>
        <TouchableOpacity>
          <Text style={styles.navIcon}>🏠</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.navIcon}>🔍</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={[styles.navIcon, styles.activeNavIcon]}>📅</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.navIcon}>👤</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  header: {
    fontSize: 24,
    textAlign: 'center',
    marginVertical: 20,
    fontWeight: 'bold',
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
  },
  tab: {
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 20,
    backgroundColor: '#f2f2f2',
    borderColor: '#ccc',
    borderWidth: 1,
    marginHorizontal: 10,
  },
  tabText: {
    color: '#666',
  },
  activeTab: {
    backgroundColor: '#4caf50',
  },
  activeTabText: {
    color: '#fff',
  },
  bookingCard: {
    backgroundColor: '#fff',
    margin: 10,
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 5,
    elevation: 3,
  },
  bookingDate: {
    fontSize: 14,
    color: '#777',
  },
  gymDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  gymImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 10,
  },
  gymName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  gymLocation: {
    fontSize: 14,
    color: '#777',
  },
  rating: {
    fontSize: 14,
    color: '#ff9800',
  },
  invites: {
    fontSize: 14,
    color: '#666',
  },
  bookingActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  cancelButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    borderColor: '#4caf50',
    borderWidth: 1,
  },
  cancelButtonText: {
    color: '#4caf50',
  },
  detailsButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    backgroundColor: '#4caf50',
  },
  detailsButtonText: {
    color: '#fff',
  },
  addMore: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addMoreBtn: {
    backgroundColor: '#4caf50',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  addMoreBtnText: {
    color: '#fff',
  },
  inviteCount: {
    marginHorizontal: 10,
    fontSize: 16,
    color: '#000',
  },
  bottomNavigation: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: '#000',
  },
  navIcon: {
    color: '#fff',
    fontSize: 24,
  },
  activeNavIcon: {
    color: '#4caf50',
  },
});


export default MyBookings;
