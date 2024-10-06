import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { fetchIndividualGymData } from '../api/apiService'; // Adjust the import path as needed
import Svg, { Path } from 'react-native-svg';

const AmenitiesListPopup = ({ gymId, onClose }) => {
  const [amenities, setAmenities] = React.useState([]);

  React.useEffect(() => {
    const fetchAmenities = async () => {
      try {
        const data = await fetchIndividualGymData(gymId); // Fetch amenities using gymId
        setAmenities(data.equipment_list || []); // Set amenities list
      } catch (error) {
        console.error('Error fetching amenities:', error);
      }
    };

    fetchAmenities();
  }, [gymId]);

  const renderSvg = (svgString) => {
    const regex = /<svg[^>]*>(.*?)<\/svg>/s; // Regex to extract SVG content
    const match = svgString.match(regex);

    if (match) {
      const svgContent = match[1];
      const pathRegex = /<path[^>]*\/?>/g; // Extract paths from the SVG
      const paths = svgContent.match(pathRegex);

      if (paths) {
        return paths.map((path, index) => {
          const attributes = path.match(/(\w+)="([^"]*)"/g) || []; // Extract attributes
          const props = {};
          attributes.forEach(attr => {
            const [key, value] = attr.split('=');
            props[key] = value.replace(/"/g, '');
          });
          return <Path key={index} {...props} />;
        });
      }
    }

    return null;
  };

  return (
    <View style={styles.overlay}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Text style={styles.closeButtonText}>✖️</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Amenities</Text>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {amenities.length > 0 ? (
            amenities.map((amenity, index) => (
              <View key={index} style={styles.amenityItem}>
                <View style={styles.iconContainer}>
                  <Svg height="24" width="24" style={styles.icon}>
                    {renderSvg(amenity.equipment_icon_svg)}
                  </Svg>
                </View>
                <Text style={styles.amenityText}>{amenity.equipment_name || 'Unnamed Equipment'}</Text>
              </View>
            ))
          ) : (
            <Text style={styles.noAmenitiesText}>No amenities listed.</Text>
          )}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center', // Centers the modal vertically
    alignItems: 'center', // Centers the modal horizontally
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  container: {
    width: '85%', // Width of the pop-up as a percentage of screen width
    maxHeight: '90%', // Ensures the pop-up doesn't occupy the entire screen height
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    elevation: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  closeButton: {
    alignSelf: 'flex-end',
    color: '#4CAF50',
  },
  closeButtonText: {
    fontSize: 20,
    color: '#4CAF50',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 15,
    textAlign: 'center',
    fontFamily: 'Roboto', // Updated font style
  },
  scrollContent: {
    paddingBottom: 10, // Padding inside scroll area
  },
  amenityItem: {
    paddingVertical: 8, // Reduced padding between list items
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    marginRight: 8, // Space between icon and text
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    color: '#4CAF50', // Set icon color to green
  },
  amenityText: {
    fontSize: 16,
    color: '#4CAF50',
    fontFamily: 'Roboto',
    fontWeight: 'bold', // Professional and clean font style
  },
  noAmenitiesText: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
    marginVertical: 20,
    fontFamily: 'Roboto', // Consistent styling
  },
});

export default AmenitiesListPopup;
