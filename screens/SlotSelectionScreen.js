import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/Ionicons'; // Importing Ionicons for icons

const SlotSelectionScreen = ({ navigation }) => {
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDuration, setSelectedDuration] = useState(60); // Default duration
  const [selectedTime, setSelectedTime] = useState(null); // For storing selected time
  const [isTimeDropdownVisible, setIsTimeDropdownVisible] = useState(false); // For showing/hiding time dropdown

  const durations = [60, 90, 120, 180];

  const availableTimes = [];
  const currentDate = new Date();

  // Generate available times in 30-minute intervals for the next 24 hours
  for (let hour = 0; hour < 24; hour++) {
    for (let minute = 0; minute <= 30; minute += 30) {
      const time = new Date();
      time.setHours(hour);
      time.setMinutes(minute);
      if (time > currentDate) {
        availableTimes.push(time);
      }
    }
  }

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
  };

  const handleConfirm = () => {
    if (!selectedTime) {
      Alert.alert("Please select a time.");
      return;
    }

    // Prepare the slot details to pass to PaymentScreen
    const slotDetails = {
      date: date.toLocaleDateString(),
      time: selectedTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      duration: selectedDuration,
      gymName: 'Your Gym Name', // Replace with actual gym name if needed
      price: calculatePrice(selectedDuration) // Call a function to calculate price based on duration
    };

    // Navigate to PaymentScreen with slot details
    navigation.navigate('PaymentScreen', { slotDetails });
  };

  // Function to calculate price based on selected duration
  const calculatePrice = (duration) => {
    const pricePerMinute = 1; // Set your price per minute here
    return duration * pricePerMinute; // Return total price
  };

  const buttonColor = '#28a745'; // Set uniform button color to green

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select a Slot</Text>

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

      <Text style={styles.timeTitle}>Select Available Time:</Text>
      <TouchableOpacity
        onPress={() => setIsTimeDropdownVisible(!isTimeDropdownVisible)}
        style={[styles.button, { backgroundColor: buttonColor }]}>
        <Icon name="time-outline" size={20} color="#fff" style={styles.icon} />
        <Text style={styles.buttonText}>
          {selectedTime ? selectedTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Select Time'}
        </Text>
      </TouchableOpacity>

      {isTimeDropdownVisible && (
        <View style={styles.timeDropdown}>
          {availableTimes.map((time, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => {
                setSelectedTime(time);
                setIsTimeDropdownVisible(false); // Close dropdown on selection
              }}
              style={styles.timeOption}>
              <Text style={styles.timeOptionText}>
                {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

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

      <TouchableOpacity onPress={handleConfirm} style={[styles.button, { backgroundColor: buttonColor }]}>
        <Text style={styles.buttonText}>Confirm Slot</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ffffff', // Changed background color to white
  },
  title: {
    fontSize: 28,
    color: '#333', // Darker text for better readability
    marginBottom: 20,
    textAlign: 'center',
    fontFamily: 'Arial', // Set to a standard font for uniformity
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
    marginLeft: 1, // Spacing between icon and text
    fontFamily: 'Arial', // Set to a standard font for uniformity
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
