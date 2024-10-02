import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Modal, ScrollView } from 'react-native';
import Footer from '../components/Footer';
import DateTimePicker from '@react-native-community/datetimepicker';

const GymDetailScreen = ({navigation}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || new Date();
    setShowDatePicker(Platform.OS === 'ios'); // For iOS keep it open until user picks a date
    setSelectedDate(currentDate);
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <TouchableOpacity style={styles.closeButton}>
          <Text style={styles.closeButtonText}>✕</Text>
        </TouchableOpacity>

        <View style={styles.imageContainer}>
          <Image source={{ uri: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Z3ltfGVufDB8fDB8fHww" }} style={styles.image} />
        </View>

        <Text style={styles.gymName}>Cult Fit, Gurugram</Text>
        <Text style={styles.price}>₹ 289/session</Text>
        <Text style={styles.availability}>Available</Text>
        <Text style={styles.rating}>⭐ 4.91</Text>

        <Text style={styles.amenitiesHeader}>What this gym offers</Text>
        <View style={styles.amenitiesContainer}>
          <Text style={styles.amenity}>Cold/Hot Shower</Text>
          <Text style={styles.amenity}>Dumbbells</Text>
          <Text style={styles.amenity}>Parking Space</Text>
          <Text style={styles.amenity}>Treadmills</Text>
        </View>
        <TouchableOpacity style={styles.showAllButton}>
          <Text style={styles.showAllButtonText}>Show all 21 amenities</Text>
        </TouchableOpacity>

        <Text style={styles.sessionPrice}>₹ 289/session</Text>
        <Text style={styles.slotTime}>7 Sept 7:00-8:00 PM</Text>
        <TouchableOpacity style={styles.selectSlotButton} onPress={() => setModalVisible(true)}>
          <Text style={styles.selectSlotButtonText}>Select Slot</Text>
        </TouchableOpacity>
      </View>

      <Footer navigation={navigation} />

      {/* Modal for Slot Selection */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <TouchableOpacity
              style={styles.closeModalButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>

            {/* Slot Selection Content */}
            <ScrollView>
              <Text style={styles.modalTitle}>Pick Your Session</Text>

              <View style={styles.dateRow}>
                <Text style={styles.dateText}>SEPT. 13 Fri.</Text>
                <Text style={styles.dateText}>SEPT. 14 Sat.</Text>
                <Text style={styles.selectedDateText}>SEPT. 15 Sun.</Text>
                <Text style={styles.dateText}>SEPT. 16 Mon.</Text>
                <Text style={styles.dateText}>SEPT. 17 Tue.</Text>
              </View>

              {/* Add a Date Picker button */}
              <TouchableOpacity
                style={styles.datePickerButton}
                onPress={() => setShowDatePicker(true)}
              >
                <Text style={styles.datePickerButtonText}>Pick a Date</Text>
              </TouchableOpacity>

              {/* Show DateTimePicker */}
              {showDatePicker && (
                <DateTimePicker
                  value={selectedDate || new Date()}
                  mode="date"
                  display="default"
                  onChange={onDateChange}
                />
              )}

              {selectedDate && (
                <Text style={styles.selectedDateDisplay}>
                  Selected Date: {selectedDate.toDateString()}
                </Text>
              )}

              <Text style={styles.sectionHeader}>Duration</Text>
              <View style={styles.durationRow}>
                <Text style={styles.selectedDuration}>60 MIN.</Text>
                <Text style={styles.durationText}>90 MIN.</Text>
                <Text style={styles.durationText}>120 MIN.</Text>
              </View>

              <Text style={styles.sectionHeader}>Available time slots</Text>
              <View style={styles.timeSlotsRow}>
                <Text style={styles.timeSlot}>08:00</Text>
                <Text style={styles.timeSlot}>09:00</Text>
                <Text style={styles.timeSlot}>10:00</Text>
                <Text style={styles.timeSlot}>11:00</Text>
                <Text style={styles.timeSlot}>13:00</Text>
                <Text style={styles.selectedTimeSlot}>15:00</Text>
                <Text style={styles.timeSlot}>17:00</Text>
                <Text style={styles.timeSlot}>20:00</Text>
              </View>

              <TouchableOpacity style={styles.reserveButton}>
                <Text style={styles.reserveButtonText}>Reserve</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333', // Background color similar to home screen
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    margin: 16,
    elevation: 4,
  },
  closeButton: {
    alignSelf: 'flex-end',
  },
  closeButtonText: {
    fontSize: 24,
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  image: {
    width: '100%',
    height: 150, // Adjust height as needed
    borderRadius: 12,
  },
  gymName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  price: {
    fontSize: 16,
    color: '#888',
  },
  availability: {
    fontSize: 14,
    color: '#4CAF50',
  },
  rating: {
    fontSize: 14,
    color: '#FFD700',
  },
  amenitiesHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
  },
  amenitiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  amenity: {
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
    padding: 8,
    margin: 4,
  },
  showAllButton: {
    alignItems: 'center',
    marginBottom: 16,
  },
  showAllButtonText: {
    color: '#007BFF',
  },
  sessionPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  slotTime: {
    fontSize: 14,
    color: '#888',
    marginBottom: 16,
  },
  selectSlotButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },
  selectSlotButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  closeModalButton: {
    alignSelf: 'flex-end',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  dateRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  dateText: {
    padding: 8,
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
    textAlign: 'center',
  },
  selectedDateText: {
    padding: 8,
    backgroundColor: '#4CAF50',
    color: 'white',
    borderRadius: 8,
    textAlign: 'center',
  },
  sectionHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  durationRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  durationText: {
    padding: 8,
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
    textAlign: 'center',
  },
  selectedDuration: {
    padding: 8,
    backgroundColor: '#4CAF50',
    color: 'white',
    borderRadius: 8,
    textAlign: 'center',
  },
  timeSlotsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  timeSlot: {
    padding: 8,
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
    textAlign: 'center',
    marginBottom: 8,
    marginLeft: 2
  },
  selectedTimeSlot: {
    padding: 8,
    backgroundColor: '#4CAF50',
    color: 'white',
    borderRadius: 8,
    textAlign: 'center',
    marginBottom: 8,
  },
  reserveButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },
  reserveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  datePickerButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    marginBottom: 16,
  },
  datePickerButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  selectedDateDisplay: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 16,
    color: '#4CAF50',
  },
});

export default GymDetailScreen;
