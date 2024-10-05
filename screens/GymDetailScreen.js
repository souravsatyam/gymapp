
import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, Modal } from 'react-native';
import { fetchIndividualGymData } from '../api/apiService';
import SlotSelectionScreen from './SlotSelectionScreen';
import Footer from '../components/Footer';
import AmenitiesListPopup from '../components/AmenitiesListPopup';
import Icon from 'react-native-vector-icons/FontAwesome'; // Importing FontAwesome for icons

const GymDetailScreen = ({ navigation, route }) => {
  const [gymData, setGymData] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isSlotSelectionVisible, setSlotSelectionVisible] = useState(false);
  const [showAmenitiesPopup, setShowAmenitiesPopup] = useState(false);

  const { gym_id } = route.params;

  useEffect(() => {
    fetchGymData();
  }, []);

  const fetchGymData = async () => {
    try {
      const data = await fetchIndividualGymData(gym_id);
      setGymData(data);
    } catch (error) {
      console.error('Error fetching gyms:', error);
    }
  };

  const handleScroll = (event) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.floor(contentOffsetX / 300);
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

  const openSlotSelection = () => {
    setSlotSelectionVisible(true);
  };

  const closeSlotSelection = () => {
    setSlotSelectionVisible(false);
  };

  const toggleAmenitiesPopup = () => {
    setShowAmenitiesPopup(!showAmenitiesPopup);
  };

  if (!gymData) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.headerContainer}>
          <Text style={styles.welcomeText}>Welcome back!</Text>
          <Text style={styles.userName}>Deepak Parmar</Text>
          <Text style={styles.bookingPrompt}>Want to book your gym sessions with just a tap?</Text>

          <View style={styles.imageContainer}>
            <ScrollView
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              onScroll={handleScroll}
              scrollEventThrottle={16}
              style={styles.imageScroll}
            >
              {(gymData.images || []).map((image, index) => (
                <TouchableOpacity key={index} onPress={() => openModal(image)}>
                  <Image source={{ uri: image }} style={styles.image} />
                </TouchableOpacity>
              )) || (
                  <Image
                    source={{
                      uri: 'https://example.com/default_image.png',
                    }}
                    style={styles.image}
                  />
                )}
            </ScrollView>

            <View style={styles.dotContainer}>
              {(gymData.images || []).map((_, index) => (
                <View key={index} style={[styles.dot, currentIndex === index && styles.activeDot]} />
              ))}
            </View>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.gymName}>{gymData.name}</Text>
          <Text style={styles.gymDescription}>{gymData.description}</Text>
          <View style={styles.priceAvailabilityContainer}>
            <Text style={styles.city}>City: {gymData.city}</Text>
          </View>
        </View>

        {/* Amenities Display */}
        <View style={styles.amenitiesContainer}>
          <Text style={styles.amenitiesTitle}>What this gym offers:</Text>
          <View style={styles.amenitiesList}>
            {(gymData.equipment_list || []).slice(0, 4).map((amenity, index) => (
              <View key={index} style={styles.amenityItem}>
                <Icon name="check-circle" size={20} color="#4CAF50" />
                <Text style={styles.amenityText}>{amenity.equipment_name || 'Unnamed Equipment'}</Text>
              </View>
            ))}
          </View>
          <TouchableOpacity onPress={toggleAmenitiesPopup}>
            <Text style={styles.showAllText}>Show All Amenities</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.bottomSpacing} />
      </ScrollView>

      <TouchableOpacity style={styles.button} onPress={openSlotSelection}>
        <Text style={styles.buttonText}>Select Slot</Text>
      </TouchableOpacity>

      <Modal visible={isModalVisible} transparent={true} animationType="fade">
        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
            <Text style={styles.closeButtonText}>✖️</Text>
          </TouchableOpacity>
          <Image source={{ uri: selectedImage }} style={styles.modalImage} resizeMode="contain" />
        </View>
      </Modal>

      {/* Amenities List Popup */}
      {showAmenitiesPopup && (
        <AmenitiesListPopup gymId={gym_id} onClose={toggleAmenitiesPopup} />
      )}

      <Footer navigation={navigation} />
    </View>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    flex: 1,
    padding: 10, // Reduced padding for tighter spacing
  },
  scrollContent: {
    paddingBottom: 80, // Space for the button
  },
  headerContainer: {
    marginBottom: 15, // Reduced margin for tighter spacing
  },
  imageContainer: {
    position: 'relative', // Allow the dots to overlay on the image
  },
  imageScroll: {
    marginTop: 10,
  },
  image: {
    width: 406,
    height: 200,
    borderRadius: 10,
  },
  dotContainer: {
    position: 'absolute',
    bottom: 10, // Adjust position as needed
    left: '50%',
    transform: [{ translateX: -50 }],
    flexDirection: 'row',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#bbb',
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: '#4CAF50',
  },
  welcomeText: {
    color: '#4CAF50', // Added green color for welcome text
    fontSize: 20, // Adjusted font size
    fontWeight: 'bold', // Bold for welcome text
    marginBottom: 5,
    fontFamily: 'Roboto', // Changed to Roboto for consistency
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold', // Bold for user name
    marginBottom: 5,
    fontFamily: 'Roboto', // Changed to Roboto
  },
  bookingPrompt: {
    color: '#333', // Changed to dark grey for better contrast
    fontSize: 16,
    marginBottom: 10,
    fontFamily: 'Roboto', // Changed to Roboto
  },
  card: {
    //backgroundColor: '#fff',
    //borderRadius: 10,
    padding: 20, // Reduced padding for tighter spacing
    marginBottom: 15, // Reduced margin for tighter spacing
    //elevation: 3,
  },
  gymName: {
    fontSize: 24,
    fontWeight: 'bold', // Bold for gym name
    color: '#4CAF50', // Green color for gym name
    fontFamily: 'Roboto', // Changed to Roboto
  },
  gymDescription: {
    fontSize: 14, // Adjusted font size to match the amenities list
    color: '#333', // Changed to dark grey for consistency
    fontFamily: 'Roboto', // Changed to Roboto
    marginBottom: 5,
  },
  priceAvailabilityContainer: {
    marginVertical: 5,
  },
  city: {
    fontSize: 14,
    color: '#333', // Changed to dark grey
    fontFamily: 'Roboto', // Changed to Roboto
  },
  amenitiesContainer: {
    padding: 20,
    //backgroundColor: '#f9f9f9',
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 20,
  },
  amenitiesTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#4CAF50',
  },
  amenitiesList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  amenityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    width: '45%', // Adjust width to fit 2 items per row
  },
  amenityText: {
    marginLeft: 5,
    fontSize: 14,
    color: '#333',
  },
  showAllText: {
    color: '#4CAF50',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
    
  },
  bottomSpacing: {
    height: 50, // Space for the button
  },
  button: {
    position: 'absolute',
    bottom: 120, // Reduced bottom value to move the button up
    left: 20,
    right: 20,
    backgroundColor: '#4CAF50',
    borderRadius: 10,
    padding: 15,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
  }
});

export default GymDetailScreen;