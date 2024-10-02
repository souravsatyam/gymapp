import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Make sure to install @expo/vector-icons or use react-native-vector-icons
import Footer from '../components/Footer';

const amenitiesList = [
  { id: '1', name: "Cold/Hot Shower", icon: "water" },
  { id: '2', name: "Dumbbells", icon: "barbell" },
  { id: '3', name: "Parking Space", icon: "car-sport" },
  { id: '4', name: "Treadmills", icon: "walk" },
  { id: '5', name: "Free Weights", icon: "fitness" },
  { id: '6', name: "Cardio Machines", icon: "heart" },
  { id: '7', name: "Yoga Studio", icon: "md-paw" },
  { id: '8', name: "Sauna", icon: "md-snow" },
  { id: '9', name: "Personal Trainers", icon: "person" },
  { id: '10', name: "Group Classes", icon: "people" },
  { id: '11', name: "Nutrition Guidance", icon: "nutrition" },
  { id: '12', name: "Locker Rooms", icon: "lock-closed" },
  { id: '13', name: "Massage Therapy", icon: "md-hand-left" },
  { id: '14', name: "Kids Area", icon: "md-child" },
  { id: '15', name: "Sports Courts", icon: "basketball" },
  { id: '16', name: "Swimming Pool", icon: "water" },
  { id: '17', name: "Steam Room", icon: "md-water" },
  { id: '18', name: "Spin Bikes", icon: "bicycle" },
  { id: '19', name: "Resistance Bands", icon: "ribbon" },
  { id: '20', name: "Stretching Area", icon: "bicycle" },
  { id: '21', name: "Weightlifting Area", icon: "barbell" }
];

const AmenitiesListScreen = ({ navigation }) => {
  const renderAmenity = ({ item }) => (
    <View style={styles.amenityItem}>
      <Ionicons name={item.icon} size={24} color="#4CAF50" />
      <Text style={styles.amenityText}>{item.name}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>All Amenities</Text>
      <FlatList
        data={amenitiesList}
        keyExtractor={(item) => item.id}
        renderItem={renderAmenity}
        contentContainerStyle={styles.list}
      />
      <Footer navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5', // Light background
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    color: '#333', // Dark text for contrast
  },
  list: {
    paddingBottom: 80, // Space for footer if needed
  },
  amenityItem: {
    backgroundColor: '#ffffff', // White card background
    padding: 16,
    borderRadius: 8,
    marginVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 3, // Shadow for the card
  },
  amenityText: {
    fontSize: 18,
    marginLeft: 12,
    color: '#333', // Dark text for readability
  },
});

export default AmenitiesListScreen;
