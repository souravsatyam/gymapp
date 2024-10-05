import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Footer from '../components/Footer';
import { fetchAllNearByUser } from '../api/apiService';
import { addFriend } from '../api/apiService'; // Import the addFriend function

const InviteBuddiesScreen = ({ navigation }) => {
  const [searchText, setSearchText] = useState('');
  const [buddyList, setBuddyList] = useState([]);

  // Fetch nearby users from the API

  const fetchNearbyUsers = async () => {
    try {
      const data = await fetchAllNearByUser(searchText);
      setBuddyList(data);
    } catch (error) {
      console.error('Error fetching nearby users:', error);
    }
  };

  useEffect(() => {
    

    fetchNearbyUsers();
  }, []);

  // Handle inviting a buddy
  const handleInvite = async (id) => {
    try {
      const response = await addFriend(id); // Call the API to send a friend request
      console.log('Friend request sent:', response);

      // Update the invited status in the UI
      
      fetchNearbyUsers();
    } catch (error) {
      console.error('Error inviting friend:', error);
    }
  };


  const searchUser = async (user) => {
    setSearchText(user);
    fetchNearbyUsers();
  }

  // Render a buddy
  const renderBuddy = ({ item }) => (
    <View style={styles.buddyItem}>
      <Image source={{ uri: item.image }} style={styles.buddyImage} />
      <View style={styles.buddyInfo}>
        <Text style={styles.buddyName}>{item.name}</Text>
        <Text style={[styles.buddyStatus, { color: item.inGym ? 'green' : 'red' }]}>
          {item.status}
        </Text>
      </View>
      {(item?.invited?.sent && item?.invited?.accepted)  && (
        <TouchableOpacity style={styles.invitedButton}>
          <Text style={styles.invitedButtonText}>Friends</Text>
        </TouchableOpacity>
      )}
      
      {(item?.invited?.sent && !item?.invited?.accepted)  && (
        <TouchableOpacity style={styles.invitedButton}>
          <Text style={styles.invitedButtonText}>Invited</Text>
        </TouchableOpacity>
      )}
      
      {(!item?.invited?.sent && !item?.invited?.accepted)  && (
        <TouchableOpacity style={styles.inviteButton} onPress={() => handleInvite(item.id)}>
          <Text style={styles.invitedButtonText}>Add Friend</Text>
        </TouchableOpacity>
      )}
      
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header with Invite buddies */}
      <View style={styles.header}>
        <Text><Icon name="dumbbell" size={40} color="#fff" /></Text>
        <View>
          <Text style={styles.headerTitle}>Add your friends and Invite as buddy</Text>
          <Text style={styles.headerSubtitle}>Team up with friends for a better workout!</Text>
        </View>
      </View>

      {/* Search bar */}
      <View style={styles.searchContainer}>
        <Text><Icon name="magnify" size={24} color="#888" /></Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Search Friend"
          placeholderTextColor="#888"
          value={searchText}
          onChangeText={(text) => searchUser(text)}
        />
      </View>

      {/* Buddy List */}
      <FlatList
        data={buddyList?.filter((buddy) => buddy.name.toLowerCase().includes(searchText.toLowerCase()))}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderBuddy}
        contentContainerStyle={styles.buddyList}
      />
      <Footer navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#000',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: 10,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#66BB6A',
    marginLeft: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    padding: 12,
    margin: 16,
    borderRadius: 8,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    color: '#333',
  },
  buddyList: {
    padding: 16,
  },
  buddyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#F9F9F9',
    borderRadius: 8,
    marginBottom: 12,
  },
  buddyImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  buddyInfo: {
    flex: 1,
  },
  buddyName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  buddyStatus: {
    fontSize: 14,
    color: '#666',
  },
  inviteButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  inviteButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  invitedButton: {
    backgroundColor: '#B0BEC5',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  invitedButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default InviteBuddiesScreen;
