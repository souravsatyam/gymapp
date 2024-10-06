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
import { fetchAllGyms } from '../api/apiService';
import * as Location from 'expo-location';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Footer from '../components/Footer';
import axios from 'axios';

export default function GymListScreen({ navigation }) {
  const [searchText, setSearchText] = useState('');
  const [gyms, setGyms] = useState([]);
  const [currentLocation, setCurrentLocation] = useState('');
  const [address, setAddress] = useState('');

  // Function to fetch gyms based on latitude, longitude, and search text (if any)
  const fetchGyms = async (lat, long, searchText = '') => {
    try {
      const gymList = await fetchAllGyms(lat, long, searchText);
      setGyms(gymList);
    } catch (error) {
      console.error('Error fetching gyms:', error);
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
      console.log("Fetched SearchEd Tesxt", searchText);
      fetchGyms(location.coords.latitude, location.coords.longitude, searchText); // Pass searchText if it exists
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

  useEffect(() => {
    getLocation(); // Get the current location when the component mounts
  }, [searchText]); // Add searchText as a dependency to update gyms based on search

  // Filter gyms based on search input (this will be automatically updated from fetchGyms)
  const filteredGyms = gyms?.filter(gym =>
    gym.gymName.toLowerCase().includes(searchText.toLowerCase())
  );

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
      {/* Custom header with greeting and search bar */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.locationContainer}>
            <Text style={styles.locationText}>
              <MaterialIcon name="location-on" size={20} color="#fff" /> 
              {address || 'Fetching location...'}
            </Text>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('NotificationListScreen')}>
            <Icon name="bell" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
        <Text style={styles.greetingText}>Hey Deepak, looking for a gym or a workout buddy?</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Search nearby gyms"
          placeholderTextColor="#ccc"
          value={searchText}
          onChangeText={setSearchText} // Update searchText state
        />
      </View>

      {/* Display filtered gyms */}
      <FlatList
        data={filteredGyms}
        keyExtractor={(item) => item.gymId}
        renderItem={renderGym}
        contentContainerStyle={styles.gymList}
      />
      <Footer navigation={navigation} />
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
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  locationContainer: {
    flexDirection: 'column',
  },
  locationText: {
    fontSize: 14,
    color: '#fff',
    fontWeight: 'bold',
  },
  greetingText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginVertical: 10,
  },
  searchInput: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 10,
    color: '#000',
    fontSize: 14,
    borderColor: '#ccc',
    borderWidth: 1,
    marginTop: 10,
  },
  gymList: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  gymCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    marginBottom: 20,
    overflow: 'hidden',
    elevation: 3,
  },
  gymImage: {
    width: '100%',
    height: 180,
    resizeMode: 'cover',
  },
  gymInfo: {
    padding: 10,
  },
  gymName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 5,
    textAlign: 'left',
  },
  gymPrice: {
    fontSize: 14,
    fontWeight: '600',
    color: '#e76f51',
    marginBottom: 5,
    textAlign: 'left',
  },
  gymDistance: {
    fontSize: 12,
    color: '#555',
    marginBottom: 5,
  },
  gymRating: {
    fontSize: 12,
    color: '#FFD700',
    marginBottom: 3,
  },
  gymDescription: {
    fontSize: 12,
    color: '#333',
    marginBottom: 5,
  },
  bookNowButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 15,
    marginTop: 10,
    alignSelf: 'flex-end',
  },
  bookNowText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
});
