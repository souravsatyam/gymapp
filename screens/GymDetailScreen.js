import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, Modal } from 'react-native';
import SlotSelectionScreen from './SlotSelectionScreen'; // Adjust the import path as needed

const GymDetailScreen = ({ navigation }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showAllAmenities, setShowAllAmenities] = useState(false);
  const [isSlotSelectionVisible, setSlotSelectionVisible] = useState(false);

  const images = [
    'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Z3ltfGVufDB8fDB8fHww',
    'https://media.istockphoto.com/id/1417324952/photo/school-gym.jpg?s=1024x1024&w=is&k=20&c=Z3tQLcCAGpbuR8YsdALGKLpcrWev3zjfC4ATgwwBb08='
  ];

  const amenitiesList = [
    'Cold/Hot Shower',
    'Dumbbells',
    'Parking Space',
    'Treadmills',
    'Personal Training',
    'Group Classes',
    'Yoga Sessions',
    'Nutrition Advice'
  ];

  const handleScroll = (event) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.floor(contentOffsetX / 300); // Calculate index based on image width
    setCurrentIndex(index);
  };

  const openModal = (image) => {
    setSelectedImage(image);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedImage(null);
  };

  const toggleShowAll = () => {
    setShowAllAmenities((prevState) => !prevState);
  };

  const openSlotSelection = () => {
    setSlotSelectionVisible(true);
  };

  const closeSlotSelection = () => {
    setSlotSelectionVisible(false);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.welcomeText}>Welcome back!</Text>
        <Text style={styles.userName}>Deepak Parmar</Text>
        <Text style={styles.bookingPrompt}>Want to book your gym sessions with just a tap?</Text>

        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={16} // Ensure smooth scrolling
          style={styles.imageScroll}
        >
          {images.map((image, index) => (
            <TouchableOpacity key={index} onPress={() => openModal(image)}>
              <Image
                source={{ uri: image }}
                style={styles.image}
              />
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={styles.dotContainer}>
          {images.map((_, index) => (
            <View key={index} style={[styles.dot, currentIndex === index && styles.activeDot]} />
          ))}
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.gymName}>Cult Fit, Gurugram</Text>
        <View style={styles.priceAvailabilityContainer}>
          <Text style={styles.price}>₹ 289/session</Text>
          <Text style={styles.availability}>Available</Text>
          <Text style={styles.rating}>⭐ 4.91</Text>
        </View>
      </View>

      <Text style={styles.amenitiesTitle}>What this gym offers:</Text>
      <View style={styles.amenities}>
        {amenitiesList.slice(0, showAllAmenities ? amenitiesList.length : 4).map((amenity, index) => (
          <Text key={index} style={styles.amenity}>
            ✔️ {amenity}
          </Text>
        ))}
      </View>
      
      <TouchableOpacity onPress={() => navigation.navigate('AmenitiesListScreen')}>
        <Text style={styles.showAllText}>Show All</Text>
      </TouchableOpacity>
      
      <View style={styles.dateContainer}>
        <Text style={styles.date}>₹ 289/session</Text>
        <Text style={styles.time}>7 Sept 7:00-8:00 PM</Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={openSlotSelection}>
        <Text style={styles.buttonText}>Select Slot</Text>
      </TouchableOpacity>

      {/* Modal for Image Zoom */}
      <Modal visible={isModalVisible} transparent={true} animationType="fade">
        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
            <Text style={styles.closeButtonText}>✖️</Text>
          </TouchableOpacity>
          <Image source={{ uri: selectedImage }} style={styles.modalImage} resizeMode="contain" />
        </View>
      </Modal>

      {/* Slot Selection Modal */}
      <Modal visible={isSlotSelectionVisible} transparent={true} animationType="slide">
        <View style={styles.slotSelectionModal}>
          <TouchableOpacity style={styles.closeButton} onPress={closeSlotSelection}>
            <Text style={styles.closeButtonText}>✖️</Text>
          </TouchableOpacity>
          <SlotSelectionScreen navigation={navigation} />
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff', // Set background to white
    padding: 20,
  },
  headerContainer: {
    marginBottom: 20,
  },
  imageScroll: {
    marginTop: 10,
  },
  image: {
    width: 406, // Width of the image
    height: 200, // Height for the image
    borderRadius: 10,
  },
  dotContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#bbb',
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: '#4CAF50', // Active dot color
  },
  welcomeText: {
    color: '#000', // Set text color to black
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 5,
  },
  userName: {
    color: '#000', // Set text color to black
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  bookingPrompt: {
    color: '#000', // Set text color to black
    fontSize: 18,
    marginBottom: 10,
  },
  card: {
    backgroundColor: '#fff', // Keep card background white
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    elevation: 3, // Shadow for the card
  },
  gymName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#000', // Set text color to black
  },
  priceAvailabilityContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    fontSize: 18,
    color: '#333',
    fontWeight: '500',
  },
  availability: {
    color: 'green',
    fontWeight: 'bold',
    fontSize: 16,
  },
  rating: {
    fontSize: 18,
    color: '#f39c12',
    fontWeight: '500',
  },
  amenitiesTitle: {
    color: '#000', // Set text color to black
    fontSize: 20,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  amenities: {
    backgroundColor: '#fff', // Keep amenities background white
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    elevation: 3, // Shadow for amenities
  },
  amenity: {
    fontSize: 16,
    color: '#333',
    marginVertical: 5,
  },
  showAllText: {
    color: '#4CAF50',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    marginTop: 10,
  },
  dateContainer: {
    marginBottom: 20,
  },
  date: {
    color: '#000', // Set text color to black
    fontSize: 18,
    fontWeight: 'bold',
  },
  time: {
    color: '#000', // Set text color to black
    fontSize: 16,
    marginTop: 5,
  },
  button: {
    backgroundColor: '#4CAF50', // Green button
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.9)', // Light background with transparency
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalImage: {
    width: '90%', // Responsive width
    height: '80%', // Responsive height
  },
  closeButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 1,
  },
  closeButtonText: {
    color: '#000', // Set close button text color to black
    fontSize: 24,
  },
  slotSelectionModal: {
    width: '90%', // Increased width
    height: 'auto', // Height set to auto
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    justifyContent: 'flex-start',
    alignItems: 'center', // Centering the contents
    position: 'absolute',
    top: '50%', // Centering vertically
    left: '50%', // Centering horizontally
    transform: [{ translateX: -0.5 * 400 }, { translateY: -0.5 * 400 }], // Adjusted position to move left
  },
});

export default GymDetailScreen;
