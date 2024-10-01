import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function BookingConfirmationScreen({ route, navigation }) {
  const { gym } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.confirmText}>Confirmed! Get ready to sweat.</Text>
      <Text style={styles.detailText}>Gym: {gym.name}</Text>
      <Text style={styles.detailText}>Date: September 15, 2024</Text>
      <Text style={styles.detailText}>Time: 9:00 AM - 10:00 AM</Text>
      <Text style={styles.detailText}>Location: Bhanshankari, Bengaluru, IN 560085</Text>
      
      <Button title="Got it" onPress={() => navigation.navigate('Home')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  confirmText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 40,
    textAlign: 'center',
  },
  detailText: {
    fontSize: 16,
    marginBottom: 10,
  },
});
