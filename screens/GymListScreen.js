import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Alert
} from 'react-native';
import { fetchAllGyms } from '../api/apiService';  // Assumed to be paginated (limit & page supported)
import * as Location from 'expo-location';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Footer from '../components/Footer';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage
import CustomHeader from '../components/Header';

export default function GymListScreen({ navigation }) {
  const [searchText, setSearchText] = useState('');
  const [gyms, setGyms] = useState([]);
  const [currentLocation, setCurrentLocation] = useState('');
  const [address, setAddress] = useState('');
  const [page, setPage] = useState(1); // Initialize page number
  const [loading, setLoading] = useState(false); // For loading spinner
  const [hasMoreGyms, setHasMoreGyms] = useState(true); // To stop fetching if no more data
  const [fullName, setFullName] = useState(''); // State for user's full name
  const [isInputFocused, setIsInputFocused] = useState(false); // State to track input focus
  const [pincode, setPincode] = useState(''); // State for user-entered pincode

  const limit = 9; // Number of gyms per page

  // Fetch gyms based on latitude, longitude, search text, pincode, page, and limit
  const fetchGyms = async (lat, long, searchText = '', page = 1) => {
    if ((loading || !hasMoreGyms) && !searchText) return; // Prevent further fetching if already loading or no more gyms
    setLoading(true);
    try {
      const gymList = await fetchAllGyms(lat, long, searchText, limit, page, pincode); // Added pincode to the fetch
      if (gymList.length > 0) {
        setGyms(gymList); // Append gyms to the existing list
      } else {
        setHasMoreGyms(false); // No more gyms to load
      }
    } catch (error) {
      console.error('Error fetching gyms:', error);
    } finally {
      setLoading(false);
    }
  };

  // Get current location and address
  const getLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'Location permission is required to access your location.');
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      fetchGyms(location.coords.latitude, location.coords.longitude, searchText, page); // Pass searchText and initial page
      fetchAddress(location.coords.latitude, location.coords.longitude);
    } catch (error) {
      fetchGyms(); // Fetch gyms without location if location access fails
      console.error('Error getting location:', error);
      Alert.alert('Error', 'Could not retrieve location. Please try again later.');
    }
  };

  // Fetch address based on latitude and longitude
  const fetchAddress = async (lat, long) => {
    try {
      const response = await axios.get(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${long}&localityLanguage=en`);
      if (response.data) {
        setAddress(response.data.city || response.data.locality || 'Unknown location');
      }
    } catch (error) {
      console.error('Error fetching address:', error);
      setAddress('Error fetching address');
    }
  };

  // Fetch user's full name from AsyncStorage
  const fetchUserName = async () => {
    try {
      const user = await AsyncStorage.getItem('user'); // Assuming user info is stored in 'user'
      if (user) {
        const userInfo = JSON.parse(user);
        setFullName(userInfo.full_name || ''); // Update full name
      }
    } catch (error) {
      console.error('Error fetching user name:', error);
    }
  };

  useEffect(() => {
    getLocation(); // Get the current location when the component mounts
    fetchUserName(); // Fetch user's full name
  }, [searchText, pincode]); // Update gyms based on searchText and pincode

  // Triggered when the user scrolls to the end of the list to fetch the next page
  const loadMoreGyms = () => {
    console.log("Load More Gyms");
    if (hasMoreGyms && !loading) {
      setPage(prevPage => prevPage + 1); // Increment the page number
    }
  };

  const redirectToGymDetails = (gymId) => {
    navigation.navigate('GymDetails', { gym_id: gymId });
  };

  // Render each gym
  const renderGym = ({ item }) => (
    <TouchableOpacity style={styles.gymCard} onPress={() => redirectToGymDetails(item.gymId)}>
      <Image source={{ uri: item.images?.[0]?.imageUrl || 'https://www.hussle.com/blog/wp-content/uploads/2020/12/Gym-structure-1080x675.png' }} style={styles.gymImage} />
      <View style={styles.gymInfo}>
        <Text style={styles.gymName}>{item.gymName}</Text>
        <Text style={styles.gymDescription}>
          {item.gymDescription ? item.gymDescription.substring(0, 100) + '...' : 'No description available'}
        </Text>
        <Text style={styles.gymPrice}>₹ {item.subscriptionPrices?.[0] || 'N/A'}/session</Text>
        <Text style={styles.gymDistance}>📍 {(item.distance ? item.distance.toFixed(1) : 'N/A')} km</Text>
        <Text style={styles.gymRating}>⭐ {item.gymRating || 'N/A'}</Text>
        <TouchableOpacity style={styles.bookNowButton} onPress={() => redirectToGymDetails(item.gymId)}>
          <Text style={styles.bookNowText}>
            <Icon name="check-circle" size={18} color="#fff" /> Book Now
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.header}>
        <View style={styles.headerContent}>
          {/* Wrap location text and pincode input together */}
          <View style={styles.locationPincodeContainer}>
            <Text style={styles.locationText}>
              <MaterialIcon name="location-on" size={20} color="#fff" />
              {address || 'Fetching location...'}
            </Text>
            <TextInput
              style={styles.pincodeInput}
              placeholder="Enter pincode"
              placeholderTextColor="#ccc"
              value={pincode}
              onChangeText={setPincode}
              keyboardType="numeric" // Set numeric keyboard
            />
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('NotificationListScreen')}>
            <Icon name="bell" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
        <Text style={styles.greetingText}>Hey {fullName}, looking for a gym or a workout buddy?</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Search nearby gyms"
          placeholderTextColor="#ccc"
          value={searchText}
          onChangeText={setSearchText} // Update searchText state
          onFocus={() => setIsInputFocused(true)} // Set focus to true when input is focused
          onBlur={() => setIsInputFocused(false)} // Set focus to false when input is blurred
        />
      </View>

      {/* Display filtered gyms */}
      <FlatList
        data={gyms}
        keyExtractor={(item) => item.gymId}
        renderItem={renderGym}
        contentContainerStyle={styles.gymList}
        onEndReached={loadMoreGyms} // Load more gyms when scrolling
        onEndReachedThreshold={0.6} // Trigger when 50% away from the end
        ListFooterComponent={loading ? <Text>Loading more gyms...</Text> : null} // Loading indicator
      />
      {/* Conditionally render the footer based on input focus */}
      {!isInputFocused && <Footer navigation={navigation} />}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 20,
    backgroundColor: '#4CAF50',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    elevation: 5,
    height: 200,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 25,
  },
  locationPincodeContainer: {
    flexDirection: 'row', // Row direction to align location text and input
    alignItems: 'center',
  },
  locationText: {
    fontSize: 14,
    color: '#fff',
    fontWeight: 'bold',
  },
  pincodeInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 5,
    backgroundColor: '#fff',
    width: 100, // Adjust width as necessary
    textAlign: 'center',
    marginLeft: 5,
    height: 30, // Reduced margin to move closer to location text
  },
  greetingText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginVertical: 10,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    backgroundColor: '#fff',
  },
  gymList: {
    paddingBottom: 80, // Add some padding at the bottom
  },
  gymCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 2,
    margin: 10,
    padding: 10,
  },
  gymImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  gymInfo: {
    marginLeft: 10,
    flex: 1,
  },
  gymName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  gymDescription: {
    fontSize: 14,
    color: '#777',
  },
  gymPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  gymDistance: {
    fontSize: 14,
    color: '#777',
  },
  gymRating: {
    fontSize: 14,
    color: '#777',
  },
  bookNowButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  bookNowText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
