import React, { useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    // Simulate loading time before moving to the next screen
    const timer = setTimeout(() => {
      navigation.replace('Home'); // Replace with the actual route name
    }, 3000); // Show splash screen for 3 seconds

    return () => clearTimeout(timer); // Clear timer on component unmount
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/Android full screen green.jpg')} // Your splash screen image
        style={styles.splashImage}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff', // Full screen white background
  },
  splashImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover', // Adjust the image to cover the full screen
  },
});

export default SplashScreen;
