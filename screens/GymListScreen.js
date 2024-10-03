import React, { useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import FontAwesome for notification icon
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'; // For the location icon
import Footer from '../components/Footer';

export default function GymListScreen({ navigation }) {
  const [searchText, setSearchText] = useState(''); // State to track search input
  const [gyms, setGyms] = useState([
    {
      id: '1',
      name: 'Fitness Gym Pro',
      description: 'High-quality equipment and trainers available.',
      rating: 4.5,
      price: 288,
      image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Z3ltfGVufDB8fDB8fHww',
    },
    {
      id: '2',
      name: 'Superfit Gym',
      description: '24/7 availability and best workout environment.',
      rating: 4.7,
      price: 288,
      image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Z3ltfGVufDB8fDB8fHww',
    },
    {
      id: '3',
      name: 'Power House Gym',
      description: 'Affordable pricing and great community.',
      rating: 4.2,
      price: 288,
      image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Z3ltfGVufDB8fDB8fHww',
    },
  ]);

  // Filter gyms based on search input
  const filteredGyms = gyms.filter(gym =>
    gym.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const renderGym = ({ item }) => (
    <TouchableOpacity style={styles.gymCard} onPress={() => navigation.navigate('GymDetails', { gymId: item.id })}>
      <Image source={{ uri: item.image }} style={styles.gymImage} />
      <View style={styles.gymInfo}>
        <Text style={styles.gymName}>{item.name}</Text>
        <Text style={styles.gymPrice}>₹ {item.price}/session</Text>
        <Text style={styles.gymRating}>⭐ {item.rating}</Text>
        <TouchableOpacity 
          style={styles.bookNowButton} 
          onPress={() => navigation.navigate('GymDetails', { gymId: item.id })} // Navigate to GymDetails
        >
          <Text style={styles.bookNowText}>Book Now</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
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
              <Icon name="bell" size={24} color="green" /> {/* Changed notification icon color to green */}
            </Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.greetingText}>Hey Deepak, looking for a gym or a workout buddy?</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Search gyms or friends"
          placeholderTextColor="#666" // Light gray placeholder text
          value={searchText}
          onChangeText={setSearchText} // Updates the search text state
        />
      </View>

      {/* Display filtered gyms */}
      <FlatList
        data={filteredGyms}
        keyExtractor={(item) => item.id}
        renderItem={renderGym}
        contentContainerStyle={styles.gymList}
      />
      <Footer navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff', // Set background color to white
  },
  header: {
    padding: 20,
    backgroundColor: '#f0f0f0', // Light gray for header
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
    color: '#000', // Black text for location
  },
  greetingText: {
    fontSize: 18, // Adjusted font size
    fontWeight: 'bold',
    color: '#000', // Black text for greeting
    textAlign: 'center',
    marginVertical: 10,
  },
  searchInput: {
    backgroundColor: '#fff', // White background for search bar
    borderRadius: 10,
    padding: 10,
    color: '#000', // Black text for search input
    fontSize: 14,
    borderColor: '#ccc', // Light gray border for input
    borderWidth: 1,
  },
  gymList: {
    paddingHorizontal: 20,
  },
  gymCard: {
    backgroundColor: '#e0e0e0', // Light gray for each gym card
    borderRadius: 10,
    marginBottom: 20,
    overflow: 'hidden',
  },
  gymImage: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
  },
  gymInfo: {
    padding: 10,
  },
  gymName: {
    fontSize: 16, // Adjusted font size
    fontWeight: 'bold',
    color: '#000', // Black text for gym name
    marginBottom: 5,
  },
  gymPrice: {
    fontSize: 14, // Adjusted font size
    color: '#000', // Black text for price
    marginBottom: 5,
  },
  gymRating: {
    fontSize: 14, // Adjusted font size
    color: 'green', // Changed star rating color to green
    marginBottom: 5,
  },
  bookNowButton: {
    backgroundColor: 'green', // Green background color for "Book Now" button
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    alignSelf: 'flex-end', // Align to the right
    marginTop: 10, // Space above the button
  },
  bookNowText: {
    color: '#fff', // White text color for "Book Now"
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
