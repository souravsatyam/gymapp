import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { ProgressBar } from 'react-native-paper'; // Ensure react-native-paper is installed
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; // Import icons from react-native-vector-icons
import Footer from '../components/Footer';
import { userDetails } from '../api/apiService';

const ProfileScreen = ({ navigation }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch user data from the API
    const fetchUserData = async () => {
      try {
      
        const data = await userDetails();
        console.log("Data is", data);
        setUserData(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#4CAF50" />
      </View>
    );
  }

  return (
    <>
      <ScrollView style={styles.container}>
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <Image
            source={{ uri: userData?.profile_pic || 'https://via.placeholder.com/150' }} // Placeholder image if profile_pic is null
            style={styles.profileImage}
          />
          <View style={styles.profileDetails}>
            <Text style={styles.fullName}>{userData?.full_name || 'N/A'}</Text>
            <Text style={styles.username}>@{userData?.username || 'N/A'}</Text>
            <Text style={styles.mobileNumber}>{userData?.mobile_number || 'N/A'}</Text>
          </View>
        </View>

        {/* Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>{userData?.upload_count || 0}</Text>
            <Text style={styles.statLabel}>Posts</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>{userData?.followers_count || 0}</Text>
            <Text style={styles.statLabel}>Friends</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>{userData?.following_count || 0}</Text>
            <Text style={styles.statLabel}>Buddies</Text>
          </View>
        </View>

        {/* Workout Time */}
        <View style={styles.workoutContainer}>
          <Text style={styles.workoutLabel}>Workout Time</Text>
          <Text style={styles.workoutTime}>{userData?.total_work_out_time || 0} h.</Text>
          <ProgressBar progress={0.75} color="#4CAF50" style={styles.progressBar} />
        </View>

        {/* Buttons with Icons */}
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.button}>
            <Icon name="dumbbell" size={24} color="#fff" />
            <Text style={styles.buttonText}>Visited Gyms</Text>
            <Text style={styles.showAllText}>Show all</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Icon name="account-group" size={24} color="#fff" />
            <Text style={styles.buttonText}>Gym Buddies</Text>
            <Text style={styles.showAllText}>Show all</Text>
          </TouchableOpacity>
        </View>

        {/* Placeholder Grid */}
        <View style={styles.placeholderGrid}>
          <View style={styles.placeholderBox} />
          <View style={styles.placeholderBox} />
          <View style={styles.placeholderBox} />
          <View style={styles.placeholderBox} />
          <View style={styles.placeholderBox} />
        </View>
      </ScrollView>
      <Footer navigation={navigation} />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#000', // Set background to black
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: '#4CAF50', // Green border for profile image
  },
  profileDetails: {
    marginLeft: 16,
  },
  fullName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff', // White text for full name
  },
  username: {
    fontSize: 16,
    color: '#ccc', // Light gray text for username
  },
  mobileNumber: {
    fontSize: 14,
    color: '#999', // Gray text for mobile number
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  statBox: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff', // White text for stats
  },
  statLabel: {
    fontSize: 14,
    color: '#ccc', // Light gray text for stat labels
  },
  workoutContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  workoutLabel: {
    fontSize: 16,
    color: '#fff', // White text for workout label
  },
  workoutTime: {
    fontSize: 18,
    color: '#4CAF50', // Green text for workout time
    fontWeight: 'bold',
  },
  progressBar: {
    width: '100%',
    height: 10,
    borderRadius: 5,
    marginTop: 8,
    backgroundColor: '#555', // Dark background for progress bar
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  button: {
    flex: 1,
    backgroundColor: '#333', // Dark button background
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginHorizontal: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.5,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff', // White text for button text
    marginTop: 8,
  },
  showAllText: {
    fontSize: 14,
    color: '#4CAF50', // Green text for "Show all"
    marginTop: 8,
  },
  placeholderGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  placeholderBox: {
    width: '48%',
    height: 120,
    backgroundColor: '#555', // Dark gray placeholder box
    borderRadius: 8,
    marginBottom: 16,
  },
});

export default ProfileScreen;
