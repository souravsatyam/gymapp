import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  Image, 
  StyleSheet, 
  TouchableOpacity, 
  TextInput, 
  KeyboardAvoidingView, 
  Platform 
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { fetchAllGyms } from '../api/apiService';
import Footer from '../components/Footer';

export default function GymListScreen({ navigation }) {
  const [searchText, setSearchText] = useState('');
  const [gyms, setGyms] = useState([]);

  // Function to fetch gyms based on latitude and longitude
  const fetchGyms = async () => {
    try {
      const gymList = await fetchAllGyms();
      setGyms(gymList);
    } catch (error) {
      console.error('Error fetching gyms:', error);
    }
  };

  useEffect(() => {
    fetchGyms(); // Call the API when the component mounts
  }, []);

  // Filter gyms based on search input
  const filteredGyms = gyms?.filter(gym =>
    gym.gymName.toLowerCase().includes(searchText.toLowerCase())
  );

  const redirectToGymDetails = (gymId) => {
    navigation.navigate('GymDetails', { gym_id: gymId });
  };

  // Render each gym
  const renderGym = ({ item }) => (
    <TouchableOpacity style={styles.gymCard} onPress={() => redirectToGymDetails(item.gymId)}>
      <Image source={{ uri: item.images?.[0]?.imageUrl || 'https://via.placeholder.com/150' }} style={styles.gymImage} />
      <View style={styles.gymInfo}>
        <Text style={styles.gymName}>{item.gymName}</Text>
        <Text style={styles.gymPrice}>₹ {item.subscriptionPrices?.[0] || 'N/A'}/session</Text>
        <Text style={styles.gymRating}>⭐ {item.gymRating || 'N/A'}</Text>
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
              <MaterialIcon name="location-on" size={18} color="#000" /> Gurugram, IN
            </Text>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('NotificationListScreen')}>
            <Text>
              <Icon name="bell" size={24} color="green" />
            </Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.greetingText}>Hey Deepak, looking for a gym or a workout buddy?</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Search nearby gyms"
          placeholderTextColor="#666"
          value={searchText}
          onChangeText={setSearchText}
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
    backgroundColor: '#ffffff',
  },
  header: {
    padding: 20,
    backgroundColor: '#ffffff',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    fontSize: 12,
    color: '#000',
  },
  greetingText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    marginVertical: 10,
  },
  searchInput: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    color: '#000',
    fontSize: 14,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  gymList: {
    paddingHorizontal: 20,
  },
  gymCard: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    marginBottom: 10,
    overflow: 'hidden',
    elevation: 2,
    height: 300,
  },
  gymImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  gymInfo: {
    padding: 6,
    paddingTop: 4,
  },
  gymName: {
    fontSize: 14,
    fontWeight: 'bold',
    fontFamily: 'Roboto',
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
  gymRating: {
    fontSize: 10,
    color: 'green',
    marginBottom: 3,
    textAlign: 'left',
  },
  bookNowText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
