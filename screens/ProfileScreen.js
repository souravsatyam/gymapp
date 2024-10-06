import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { ProgressBar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as ImagePicker from 'expo-image-picker'; // Using expo-image-picker
import Footer from '../components/Footer';
import {
  userDetails,
  uploadProfileImage,
  fetchUploadedImages,
  uploadImages,
} from '../api/apiService'; // Ensure you have the correct path

const ProfileScreen = ({ navigation }) => {
  const [profileImage, setProfileImage] = useState('https://via.placeholder.com/150');
  const [images, setImages] = useState([]);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await userDetails();
        setUserData(data);
        setProfileImage(data.profile_pic || profileImage);
      } catch (error) {
        console.error('Error fetching user data:', error);
        Alert.alert('Error', 'Could not fetch user data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    const fetchImages = async () => {
      try {
        const uploadedImages = await fetchUploadedImages();
        setImages(uploadedImages);
      } catch (error) {
        console.error('Error fetching images:', error);
        Alert.alert('Error', 'Could not fetch images. Please try again later.');
      }
    };

    fetchUserData();
    // fetchImages();
  }, []);

  const selectProfileImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const selectedImage = result.assets[0].uri;
      setProfileImage(selectedImage);

      // Upload the selected image to the server
      try {
        setUploading(true);
        await uploadProfileImage(selectedImage); // Ensure this API is defined
        Alert.alert('Success', 'Profile image uploaded successfully.');
      } catch (error) {
        console.error('Error uploading profile image:', error);
        Alert.alert('Upload Error', 'Failed to upload profile image.');
      } finally {
        setUploading(false);
      }
    }
  };

  const selectImages = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 0.5,
      selectionLimit: 0, // 0 for unlimited selection
    });

    if (!result.canceled) {
      const selectedImages = result.assets.map(asset => ({ uri: asset.uri }));
      setImages((prevImages) => [...prevImages, ...selectedImages]);

      try {
        setUploading(true);
        await uploadImages(selectedImages); // Ensure this API handles array of images
        Alert.alert('Success', 'Images uploaded successfully.');
      } catch (error) {
        console.error('Upload Error:', error);
        Alert.alert('Upload Error', 'Failed to upload images.');
      } finally {
        setUploading(false);
      }
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.gridItem}>
      <Image source={{ uri: item.url }} style={styles.gridImage} />
    </View>
  );

  if (loading || uploading) {
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
            <Image source={{ uri: profileImage }} style={styles.profileImage} />
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
          <TouchableOpacity onPress={() => navigation.navigate("InviteFriendBuddy")}>
            <Text style={styles.statValue}>{userData?.followers_count || 0}</Text>
            <Text style={styles.statLabel}>Friends</Text>
          </TouchableOpacity>
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
        numColumns={3}
        columnWrapperStyle={styles.columnWrapper}
        style={styles.imageGrid}
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
  },
  settingsButton: {
    padding: 10,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 12,
    paddingHorizontal: 10,
  },
  statCard: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  statLabel: {
    fontSize: 12,
    color: '#777',
  },
  statValueTime: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  progressBar: {
    width: '100%',
    height: 10,
    borderRadius: 5,
    marginTop: 4,
  },
  buttonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
    backgroundColor: '#f9f9f9',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    marginLeft: 5,
  },
  addButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 50,
  },
  imageGrid: {
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
  gridItem: {
    flex: 1,
    margin: 5,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#f0f0f0',
    elevation: 2,
  },
  gridImage: {
    width: '100%',
    height: 100,
    borderRadius: 10,
  },
});

export default ProfileScreen;
