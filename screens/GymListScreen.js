import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';

const gyms = [
  { id: '1', name: 'Cult Fit, Gurugram', rating: '4.91', price: '₹ 289/session' },
  { id: '2', name: 'Gold’s Gym, Gurugram', rating: '4.91', price: '₹ 289/session' },
];

export default function GymListScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Search gyms or friends</Text>
      
      <FlatList
        data={gyms}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.gymItem} onPress={() => navigation.navigate('GymDetails', { gym: item })}>
            <Text style={styles.gymName}>{item.name}</Text>
            <Text style={styles.gymRating}>Rating: {item.rating}</Text>
            <Text style={styles.gymPrice}>{item.price}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={item => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  gymItem: {
    padding: 15,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  gymName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  gymRating: {
    color: 'gray',
  },
  gymPrice: {
    color: 'green',
  },
});
