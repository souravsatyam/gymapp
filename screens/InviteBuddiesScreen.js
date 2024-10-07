import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, FlatList, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Footer from '../components/Footer';
import { fetchAllNearByUser } from '../api/apiService';
import { addFriend } from '../api/apiService'; // Import the addFriend function
import CustomHeader from '../components/Header';

const InviteBuddiesScreen = ({ navigation }) => {
  const [searchText, setSearchText] = useState('');
  const [buddyList, setBuddyList] = useState([]);
  const [typedText, setTypedText] = useState(''); // State for typed text
  const message = "Add users to collaborate for better gyming"; // The message to type out
  const fadeAnim = useRef(new Animated.Value(1)).current; // Animated value for fading

  // Fetch nearby users from the API
  const fetchNearbyUsers = async () => {
    try {
      const data = await fetchAllNearByUser(searchText);
      setBuddyList(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching nearby users:', error);
    }
  };

  useEffect(() => {
    fetchNearbyUsers();
    typeMessage();
  }, []);

  const typeMessage = (index = 0) => {
    if (index < message.length) {
      setTypedText(prev => prev + message[index]);
      setTimeout(() => typeMessage(index + 1), 100);
    }
  };

  const handleInvite = async (id) => {
    try {
      const response = await addFriend(id); 
      console.log('Friend request sent:', response);
      fetchNearbyUsers();
    } catch (error) {
      console.error('Error inviting friend:', error);
    }
  };

  const searchUser = async (user) => {
    setSearchText(user);
    fetchNearbyUsers();

    if (user) {
      setTypedText('');
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      setTypedText(message);
      fadeAnim.setValue(1);
    }
  };

  const renderBuddy = ({ item }) => (
    <View style={styles.buddyItem}>
      <Image source={{ uri: item.image }} style={styles.buddyImage} />
      <View style={styles.buddyInfo}>
        <Text style={styles.buddyName}>{item.name}</Text>
        <Text style={styles.username}>{item.username}</Text>
      </View>
   
      {(item?.invited?.accepted) && (
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

  const renderEmptyList = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>No users found</Text>
      <Icon name="emoticon-sad-outline" size={48} color="#66BB6A" />
    </View>
  );

  return (
    <View style={styles.container}>
      <CustomHeader />
      <View style={styles.header}>
        <Text><Icon name="dumbbell" size={40} color="#fff" /></Text>
      </View>

      {/* Search bar */}
      <View style={styles.searchContainer}>
        <Text><Icon name="magnify" size={24} color="#888" /></Text>
        <TextInput
          style={styles.searchInput}
          value={searchText}
          onChangeText={(text) => searchUser(text)}
        />
        <Animated.Text style={[styles.movingText, { opacity: fadeAnim }]}>{typedText}</Animated.Text>
      </View>

      {/* Buddy List */}
      {buddyList.length > 0 ? (
        <FlatList
          data={buddyList.filter((buddy) => buddy.name.toLowerCase().includes(searchText.toLowerCase()))}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderBuddy}
          contentContainerStyle={styles.buddyList}
        />
      ) : (
        renderEmptyList()
      )}

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
  },
  movingText: {
    color: '#D3D3D3',
    fontSize: 14,
    marginLeft: 4,
    position: 'absolute',
    left: 50,
    top: 10,
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
    backgroundColor: '#F5F5F5',
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
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  emptyText: {
    fontSize: 18,
    color: '#333',
    marginBottom: 10,
    fontWeight: 'bold',
  },
});

export default InviteBuddiesScreen;
