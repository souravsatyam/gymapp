import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, FlatList, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Footer from '../components/Footer';
import { fetchAllNearByUser } from '../api/apiService';
import { addFriend } from '../api/apiService'; // Import the addFriend function
//import CustomHeader from '../components/Header';

const InviteBuddiesScreen = ({ navigation }) => {
  const [searchText, setSearchText] = useState('');
  const [buddyList, setBuddyList] = useState([]);

  // Fetch nearby users from the API
  const fetchNearbyUsers = async () => {
    try {
      const data = await fetchAllNearByUser(searchText);
      // Ensure data is an array before setting the buddy list
      setBuddyList(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching nearby users:', error);
    }
  };

  useEffect(() => {
    // Fetch users on component mount
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
  };

  // Render a buddy
  const renderBuddy = ({ item }) => (
    <View style={styles.buddyItem}>
      <Image source={{ uri: item.image }} style={styles.buddyImage} />
      <View style={styles.buddyInfo}>
        <Text style={styles.buddyName}>{item.name}</Text>
        <Text style={styles.username}>{item.username}</Text>
      </View>
      {(item?.invited?.sent && item?.invited?.accepted) && (
        <TouchableOpacity style={styles.invitedButton}>
          <Text style={styles.invitedButtonText}>Friends</Text>
        </TouchableOpacity>
      )}
      {(item?.invited?.sent && !item?.invited?.accepted) && (
        <TouchableOpacity style={styles.invitedButton}>
          <Text style={styles.invitedButtonText}>Invited</Text>
        </TouchableOpacity>
      )}
      {(!item?.invited?.sent && !item?.invited?.accepted) && (
        <TouchableOpacity style={styles.inviteButton} onPress={() => handleInvite(item.id)}>
          <Text style={styles.invitedButtonText}>Add Friend</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      {/* <CustomHeader /> */}
      <View style={styles.header}>
        <Text><Icon name="dumbbell" size={40} color="#fff" /></Text>
        <View>
          {/* Optional header text can go here */}
        </View>
      </View>

      {/* Search bar */}
      <View style={styles.searchContainer}>
        {/* <Text><Icon name="magnify" size={24} color="#888" /></Text> */}
        <TextInput
          style={styles.searchInput}
          value={searchText}
          placeholder="Add users to collaborate for better gyming"
          placeholderTextColor="#ccc"
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    padding: 6,
    margin: 16,
    borderRadius: 8,
    height: 40,
    borderWidth: 1,
    borderColor: '#4CAF50',
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 14,
    color: '#333',
    fontWeight: 'normal', // No bold font weight
  },
  buddyList: {
    padding: 16,
  },
  buddyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 6,
    borderRadius: 8,
    marginBottom: 4,
  },
  buddyImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  buddyInfo: {
    flex: 1,
  },
  buddyName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  username: {
    fontSize: 12,
    color: '#66BB6A',
    fontWeight: 'bold',
  },
  inviteButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  inviteButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  invitedButton: {
    backgroundColor: '#B0BEC5',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  invitedButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default InviteBuddiesScreen;
