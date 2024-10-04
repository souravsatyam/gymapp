import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/Ionicons'; // Importing Ionicons for icons

const SlotSelectionScreen = ({ navigation, gym }) => {
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDuration, setSelectedDuration] = useState(60); // Default duration
  const [selectedSlot, setSelectedSlot] = useState(null); // For storing selected slot
  const [isTimeDropdownVisible, setIsTimeDropdownVisible] = useState(false); // For showing/hiding time dropdown

  const durations = [60, 90, 120, 180];

  // Extract available slots from gymData
  const availableSlots = gym.slots;

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
  };

  const handleConfirm = () => {
    if (!selectedSlot) {
      Alert.alert("Please select a time.");
      return;
    }
    console.log("selectedSlot.price", selectedSlot.price);
    // Prepare the slot details to pass to PaymentScreen
    const slotDetails = {
      date: date.toLocaleDateString(),
      time: selectedSlot.startTime,
      duration: selectedDuration,
      gymName: gym.name,
      price: selectedSlot.price,
      slotId: selectedSlot.id,
      capacity: selectedSlot.capacity,
      pricePerSlot: selectedSlot.price,
    };

    // Navigate to PaymentScreen with slot details
    navigation.navigate('PaymentScreen', { slotDetails });
  };

  // Function to calculate price based on selected duration
  const calculatePrice = (duration) => {
    // Assuming price is based on slot's price and duration
    if (selectedSlot) {
      const pricePerMinute = selectedSlot.price / selectedSlot.timePeriod; // price per minute based on slot's price and time period
      return duration * pricePerMinute;
    }
    return 0;
  };

  const buttonColor = '#28a745'; // Set uniform button color to green

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Select a Slot</Text>

      {/* Date Picker */}
      <TouchableOpacity onPress={() => setShowDatePicker(true)} style={[styles.button, { backgroundColor: buttonColor }]}>
        <Icon name="calendar-outline" size={20} color="#fff" style={styles.icon} />
        <Text style={styles.buttonText}>{`Date: ${date.toLocaleDateString()}`}</Text>
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={onDateChange}
          minimumDate={new Date()} // Prevent past dates
        />
      )}

      {/* Time Selection */}
      <Text style={styles.timeTitle}>Select Available Time:</Text>
      <TouchableOpacity
        onPress={() => setIsTimeDropdownVisible(!isTimeDropdownVisible)}
        style={[styles.button, { backgroundColor: buttonColor }]}>
        <Icon name="time-outline" size={20} color="#fff" style={styles.icon} />
        <Text style={styles.buttonText}>
          {selectedSlot ? selectedSlot.startTime : 'Select Time'}
        </Text>
      </TouchableOpacity>

      {isTimeDropdownVisible && (
        <View style={styles.timeDropdown}>
          {availableSlots.map((slot) => (
            <TouchableOpacity
              key={slot.id}
              onPress={() => {
                setSelectedSlot(slot);
                setIsTimeDropdownVisible(false); // Close dropdown on selection
              }}
              style={styles.timeOption}>
              <Text style={styles.timeOptionText}>
                {slot.startTime}
              </Text>
              {/* Optionally, display capacity or price */}
              <Text style={styles.slotDetailsText}>
                Capacity: {slot.capacity} | Price: ₹{slot.price}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {/* Duration Selection */}
      <Text style={styles.durationTitle}>Select Duration:</Text>
      <View style={styles.durationsContainer}>
        <View style={styles.row}>
          {durations.slice(0, 2).map((duration) => (
            <TouchableOpacity
              key={duration}
              onPress={() => setSelectedDuration(duration)}
              style={[
                styles.durationButton,
                selectedDuration === duration && styles.selectedDurationButton
              ]}>
              <Text style={[styles.durationText, { color: selectedDuration === duration ? '#fff' : '#333' }]}>{duration} mn</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.row}>
          {durations.slice(2).map((duration) => (
            <TouchableOpacity
              key={duration}
              onPress={() => setSelectedDuration(duration)}
              style={[
                styles.durationButton,
                selectedDuration === duration && styles.selectedDurationButton
              ]}>
              <Text style={[styles.durationText, { color: selectedDuration === duration ? '#fff' : '#333' }]}>{duration} mn</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <Text style={styles.selectedDuration}>{`Selected Duration: ${selectedDuration} mn`}</Text>

      {/* Confirm Button */}
      <TouchableOpacity onPress={handleConfirm} style={[styles.button, { backgroundColor: buttonColor }]}>
        <Text style={styles.buttonText}>Confirm Slot</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1, // Allow scrolling
    padding: 20,
    backgroundColor: '#ffffff', // Changed background color to white
  },
  title: {
    fontSize: 28,
    color: '#333', // Darker text for better readability
    marginBottom: 20,
    textAlign: 'center',
    fontFamily: 'Roboto', // Set to a standard font for uniformity
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 3, // Shadow for the button
  },
  buttonText: {
    color: '#fff',
    fontSize: 15,
    textAlign: 'center',
    marginLeft: 10, // Spacing between icon and text
    fontFamily: 'Roboto', // Set to a standard font for uniformity
    flex: 1,
  },
  icon: {
    marginRight: 10,
  },
  timeTitle: {
    color: '#333',
    fontSize: 18,
    marginVertical: 10,
    textAlign: 'center',
  },
  timeDropdown: {
    backgroundColor: '#f8f9fa', // Light background for dropdown
    borderRadius: 5,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#28a745', // Border color matching button color
    padding: 10,
    elevation: 2, // Slight elevation for dropdown
  },
  timeOption: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#28a745', // Uniform border color for options
  },
  timeOptionText: {
    color: '#333', // Darker text for better visibility
    fontSize: 18,
  },
  slotDetailsText: {
    color: '#666',
    fontSize: 14,
    marginTop: 5,
  },
  durationTitle: {
    color: '#333',
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center',
  },
  durationsContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  durationButton: {
    width: 80, // Set a fixed width for square layout
    height: 80, // Set a fixed height for square layout
    backgroundColor: '#28a745', // Uniform color for duration buttons
    borderRadius: 10,
    margin: 5, // Add margin around buttons for spacing
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3, // Shadow for the button
  },
  selectedDurationButton: {
    backgroundColor: '#218838', // Darker green for the selected button
  },
  durationText: {
    fontSize: 20, // Increased font size for visibility
    fontWeight: 'bold', // Bold font for emphasis
    color: '#333',
  },
  selectedDuration: {
    color: '#333',
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  confirmButton: {
    padding: 15,
    backgroundColor: '#28a745', // Confirm button matches others
    borderRadius: 10,
    alignItems: 'center',
    elevation: 3, // Shadow for the button
  },
});

export default SlotSelectionScreen;
