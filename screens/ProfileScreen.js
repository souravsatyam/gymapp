import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert, FlatList, ScrollView, ActivityIndicator } from 'react-native';
import { ProgressBar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ImagePicker from 'react-native-image-picker';
import Footer from '../components/Footer';
import { userDetails } from '../api/apiService'; // Ensure you have the correct path

const ProfileScreen = ({ navigation }) => {
  const [profileImage, setProfileImage] = useState('https://via.placeholder.com/150');
  const [images, setImages] = useState([]);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch user data from the API
    const fetchUserData = async () => {
      try {
        const data = await userDetails();
        console.log("Data is", data);
        setUserData(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const selectProfileImage = () => {
    const options = {
      title: 'Select Profile Photo',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        Alert.alert('Error', 'Error picking image');
      } else {
        const source = { uri: response.uri };
        setProfileImage(source.uri);
      }
    });
  };

  const selectImages = () => {
    const options = {
      title: 'Select Images',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
      quality: 0.5,
      allowsEditing: false,
      mediaType: 'photo',
      selectionLimit: 0, // 0 for unlimited selection
    };

    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        Alert.alert('Error', 'Error picking images');
      } else {
        const selectedImages = response.uri ? [{ uri: response.uri }] : [];
        setImages((prevImages) => [...prevImages, ...selectedImages]);
      }
    });
  };

  const renderItem = ({ item }) => (
    <View style={styles.gridItem}>
      <Image source={item} style={styles.gridImage} />
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#4CAF50" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Profile Header with Stats */}
      <View style={styles.headerContainer}>
        <View style={styles.profileHeader}>
          <View style={styles.profileImageContainer}>
            <Image source={{ uri: userData?.profile_pic || profileImage }} style={styles.profileImage} />
            <TouchableOpacity style={styles.addPhotoButton} onPress={selectProfileImage}>
              <Icon name="plus" size={20} color="#4CAF50" />
            </TouchableOpacity>
          </View>
          <View style={styles.profileDetails}>
            <Text style={styles.fullName}>{userData?.full_name || 'N/A'}</Text>
            <Text style={styles.username}>@{userData?.username || 'N/A'}</Text>
            <Text style={styles.mobileNumber}>{userData?.mobile_number || 'N/A'}</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.settingsButton} onPress={() => navigation.navigate('Settings')}>
          <Icon name="cog" size={20} color="#4CAF50" />
        </TouchableOpacity>
      </View>

      {/* Combined Stats Container */}
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{userData?.upload_count || 0}</Text>
          <Text style={styles.statLabel}>Posts</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{userData?.followers_count || 0}</Text>
          <Text style={styles.statLabel}>Friends</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValueTime}>{userData?.total_work_out_time || 0} h.</Text>
          <Text style={styles.statLabel}>Workout Time</Text>
          <ProgressBar progress={0.75} color="#4CAF50" style={styles.progressBar} />
        </View>
      </View>

      {/* Action Buttons */}
      <View style={styles.buttonsRow}>
        <TouchableOpacity style={styles.button}>
          <Icon name="dumbbell" size={20} color="#fff" />
          <Text style={styles.buttonText}>Visited Gyms</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Icon name="account-group" size={20} color="#fff" />
          <Text style={styles.buttonText}>Gym Buddies</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.addButton} onPress={selectImages}>
          <Icon name="plus" size={16} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Image Grid using FlatList */}
      <FlatList
        data={images}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        numColumns={3} // Set number of columns to 3 for grid layout
        columnWrapperStyle={styles.columnWrapper} // Style for the column wrapper
        style={styles.imageGrid} // Style for the FlatList
      />

      {/* Footer at the Bottom */}
      <Footer navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    alignItems: 'center',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImageContainer: {
    position: 'relative',
    borderRadius: 50,
    padding: 5,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  profileImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 2,
    borderColor: '#4CAF50',
  },
  addPhotoButton: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    backgroundColor: '#ffffff',
    borderRadius: 50,
    padding: 2,
    elevation: 2,
  },
  profileDetails: {
    marginLeft: 12,
  },
  fullName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  username: {
    fontSize: 14,
    color: '#777',
    marginTop: 2,
  },
  mobileNumber: {
    fontSize: 12,
    color: '#555',
    marginTop: 2,
  },
  settingsButton: {
    padding: 8,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    marginTop: 8,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    elevation: 2,
  },
  statCard: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  statValueTime: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginTop: 4,
  },
  statLabel: {
    fontSize: 15,
    color: '#777',
    marginTop: 2,
  },
  progressBar: {
    width: '90%',
    height: 10,
    borderRadius: 5,
    marginTop: 4,
    backgroundColor: '#e0e0e0',
  },
  buttonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginHorizontal: 5,
  },
  buttonText: {
    color: '#fff',
    marginLeft: 8,
  },
  addButton: {
    backgroundColor: '#4CAF50',
    padding: 8,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageGrid: {
    flex: 1,
    padding: 12,
  },
  gridItem: {
    flex: 1,
    margin: 5,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#f0f0f0',
  },
  gridImage: {
    width: '100%',
    height: 100,
    borderRadius: 10,
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
});

export default ProfileScreen;
