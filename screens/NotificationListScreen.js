import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

const notifications = [
  {
    id: '1',
    user: 'kiero_d',
    others: '26 others',
    action: 'liked your photo',
    time: '3h ago',
  },
  {
    id: '2',
    user: 'Josh',
    action: 'sent you a buddy request',
    time: 'Yesterday',
    type: 'buddyRequest',
  },
  {
    id: '3',
    user: 'Josh',
    action: 'invited you to join a workout',
    time: '2d ago',
    type: 'workoutRequestInvite',
  },
  {
    id: '4',
    user: 'Josh',
    action: 'accepted your invitation for workout',
    time: '2d ago',
    type: 'workoutSentInvite',
  },
  {
    id: '5',
    user: 'kiero_d',
    action: 'accepted your buddy request',
    time: '3h ago',
  }
];

const NotificationListScreen = ({ navigation }) => { // Accept navigation prop
  const renderItem = ({ item }) => (
    <View style={styles.notificationItem}>
      <View style={styles.notificationContent}>
        <Text style={styles.notificationText}>
          <Text style={styles.username}>{item.user}</Text> {item.others ? `, ${item.others}` : ''} {item.action}
        </Text>
        <Text style={styles.time}>{item.time}</Text>
      </View>
      <View style={styles.actionButtons}>
        {item.type === 'buddyRequest' && (
          <>
            <TouchableOpacity style={styles.acceptButton}>
              <Text style={styles.buttonText}>Accept</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.declineButton}>
              <Text style={styles.buttonText}>Decline</Text>
            </TouchableOpacity>
          </>
        )}
        {item.type === 'workoutRequestInvite' && (
          <TouchableOpacity 
            style={styles.viewButton} 
            onPress={() => navigation.navigate('WorkoutInvitation')} // Navigate to WorkoutInvitation screen
          >
            <Text style={styles.buttonText}>View Details</Text>
          </TouchableOpacity>
        )}
        {item.type === 'workoutSentInvite' && (
          <TouchableOpacity 
            style={styles.viewButton} 
            onPress={() => navigation.navigate('WorkoutRequest')} // Navigate to WorkoutInvitation screen
          >
            <Text style={styles.buttonText}>View Details</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Notifications</Text>
      <FlatList
        data={notifications}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  // Styles remain the same as your original code
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginVertical: 20,
  },
  listContent: {
    paddingBottom: 20,
  },
  notificationItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  notificationContent: {
    flex: 1,
  },
  notificationText: {
    fontSize: 16,
    color: '#555',
    marginBottom: 4,
  },
  username: {
    fontWeight: 'bold',
    color: '#333',
  },
  time: {
    fontSize: 12,
    color: '#888',
  },
  actionButtons: {
    flexDirection: 'row',
  },
  acceptButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 5,
    marginRight: 10,
  },
  declineButton: {
    backgroundColor: '#F44336',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 5,
  },
  viewButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
  },
});

export default NotificationListScreen;
