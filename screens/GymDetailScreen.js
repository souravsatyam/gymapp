import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, Modal, Dimensions } from 'react-native';
import { fetchIndividualGymData } from '../api/apiService';
import Svg, { Path } from 'react-native-svg';
import SlotSelectionScreen from './SlotSelectionScreen';

const GymDetailScreen = ({ navigation, route }) => {
  const [gymData, setGymData] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showAllAmenities, setShowAllAmenities] = useState(false);
  const [isSlotSelectionVisible, setSlotSelectionVisible] = useState(false);

  const { gym_id } = route.params; // Assuming gym_id is passed via route params
  console.log("Gym Id", gym_id);
  
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

  if (!gymData) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  const renderSvg = (svgString) => {
    const regex = /<svg[^>]*>(.*?)<\/svg>/s; // Regex to extract SVG content
    const match = svgString.match(regex);
    
    if (match) {
      const svgContent = match[1];
      const pathRegex = /<path[^>]*\/?>/g; // Extract paths from the SVG
      const paths = svgContent.match(pathRegex);
      
      return paths.map((path, index) => {
        const attributes = path.match(/(\w+)="([^"]*)"/g); // Extract attributes
        const props = {};
        attributes.forEach(attr => {
          const [key, value] = attr.split('=');
          props[key] = value.replace(/"/g, '');
        });
        return <Path key={index} {...props} />;
      });
    }
  
    return null;
  };

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

          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={handleScroll}
            scrollEventThrottle={16} // Ensure smooth scrolling
            style={styles.imageScroll}
          >
            {(gymData.images || []).map((image, index) => (
              <TouchableOpacity key={index} onPress={() => openModal(image)}>
                <Image source={{ uri: image }} style={styles.image} />
              </TouchableOpacity>
            )) || (
                <Image
                  source={{
                    uri: 'https://example.com/default_image.png', // Provide a default image URL
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

        <View style={styles.card}>
          <Text style={styles.gymName}>{gymData.name}</Text>
          <Text>{gymData.description}</Text>
          <View style={styles.priceAvailabilityContainer}>
            <Text style={styles.city}>City: {gymData.city}</Text>
            <Text style={styles.state}>State: {gymData.state}</Text>
          </View>
        </View>

        <Text style={styles.amenitiesTitle}>What this gym offers:</Text>
        <View style={styles.amenities}>
          {gymData?.equipment_list?.length > 0 ? (
            gymData.equipment_list.slice(0, showAllAmenities ? undefined : 4).map((amenity, index) => (
              <View key={index} style={styles.amenityContainer}>
                <Svg height="24" width="24" style={styles.icon}>
                  {renderSvg(amenity.equipment_icon_svg)}
                </Svg>
                <Text style={styles.amenityText}>
                  {amenity.equipment_name || 'Unnamed Equipment'}
                </Text>
              </View>
            ))
          ) : (
            <Text style={styles.noAmenitiesText}>No amenities listed by gym.</Text>
          )}
        </View>

        <TouchableOpacity onPress={toggleShowAll}>
          <Text style={styles.showAllText}>{showAllAmenities ? 'Show Less' : 'Show All'}</Text>
        </TouchableOpacity>

        {/* Additional spacing at the bottom */}
        <View style={styles.bottomSpacing} />
      </ScrollView>

      {/* Fixed Select Slot Button */}
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
          {/* Render slot selection screen */}
          <SlotSelectionScreen navigation={navigation} gym={gymData}/>
        </View>
      </Modal>
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
    padding: 20,
  },
  scrollContent: {
    paddingBottom: 100, // Space for the button
  },
  headerContainer: {
    marginBottom: 20,
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
    backgroundColor: '#4CAF50',
  },
  userName: {
    color: '#000',
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  bookingPrompt: {
    color: '#000',
    fontSize: 18,
    marginBottom: 10,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    elevation: 3,
  },
  gymName: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  priceAvailabilityContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  amenitiesTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  amenities: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  amenity: {
    fontSize: 16, // Increased font size
    color: '#4CAF50', // Green color for amenities
    marginBottom: 10,
    marginRight: 15,
    fontWeight: '500', // Semi-bold for better emphasis
  },
  showAllText: {
    color: '#1E90FF', // Brighter blue color to stand out
    fontSize: 18, // Slightly larger font size
    fontWeight: 'bold', // Make it bold
    textAlign: 'center',
    marginVertical: 20,
    textDecorationLine: 'underline', // Underline for emphasis
    letterSpacing: 1.5, // Add spacing between letters
    fontFamily: 'Cochin', // Use a more elegant font (iOS) or set a custom one
  
  },
  bottomSpacing: {
    height: 100, // Space for the button
  },
  button: {
    position: 'absolute',
    bottom: 20, // Reduced bottom value to move the button up
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
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalImage: {
    width: '90%',
    height: '90%',
  },
  closeButton: {
    position: 'absolute',
    top: 40,
    right: 20,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 24,
  },
  slotSelectionModal: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    padding: 20,
  },
});

export default GymDetailScreen;
