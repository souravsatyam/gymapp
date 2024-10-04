import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import the hook for navigation

const WorkoutInvitation = () => {
  const navigation = useNavigation(); // Get the navigation object

  const handleAccept = () => {
    // Logic to handle acceptance of the invitation
    console.log('Invitation accepted!');
  };

  const handleDecline = () => {
    // Logic to handle declining the invitation
    console.log('Invitation declined!');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        You're <Text style={styles.highlightedText}>Invited</Text> to a Workout!
      </Text>

      <View style={styles.detailsContainer}>
        <Text style={styles.label}>Invitation Details:</Text>
        
        {/* Make the username clickable */}
        <Text style={styles.detailText}>
          You've been invited by{' '}
          <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
            <Text style={styles.username}>John</Text>
          </TouchableOpacity>
          {' '}to join them for a gym session.
        </Text>
        
        <Text style={styles.detailText}>Session Date & Time: <Text style={styles.bold}>September 15, 2024, 9:00 AM - 10:00 AM</Text></Text>
        <Text style={styles.detailText}>Session Duration: <Text style={styles.bold}>1 hour</Text></Text>
        <Text style={styles.detailText}>Gym Location: <Text style={styles.bold}>Bhanshankari, Bengaluru, IN 560085</Text></Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.button, styles.acceptButton]} onPress={handleAccept}>
          <Text style={styles.buttonText}>Accept</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.declineButton]} onPress={handleDecline}>
          <Text style={styles.buttonText}>Decline</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.footerText}>We look forward to seeing you there!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#F3F4F6',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2C3E50',
    textAlign: 'center',
    marginBottom: 20,
    textTransform: 'uppercase',
  },
  detailsContainer: {
    marginBottom: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    width: '100%',
  },
  label: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#34495E',
  },
  detailText: {
    fontSize: 16,
    marginBottom: 5,
    color: '#333',
  },
  highlightedText: {
    fontWeight: 'bold',
    color: '#28A745', // Green color for "Invited"
  },
  username: {
    fontWeight: 'bold',
    color: '#28A745', // Green color for emphasis
    textDecorationLine: 'underline', // Add underline to indicate it's clickable
  },
  bold: {
    fontWeight: 'bold',
    color: '#28A745',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    borderRadius: 10,
    padding: 15,
    flex: 1,
    marginHorizontal: 10,
    elevation: 3,
  },
  acceptButton: {
    backgroundColor: '#4CAF50',
  },
  declineButton: {
    backgroundColor: '#F44336',
  },
  buttonText: {
    color: '#ffffff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  footerText: {
    marginTop: 20,
    fontSize: 16,
    color: '#7F8C8D',
    textAlign: 'center',
  },
});

export default WorkoutInvitation;
