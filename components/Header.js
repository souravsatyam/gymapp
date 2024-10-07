import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import logo from "../assets/icon.png";
const CustomHeader = ({ onNotificationPress }) => {
  return (
    <View style={styles.headerContainer}>
      {/* Logo */}
      <Image
        source={logo} // Place your logo in the assets folder
        style={styles.logo}
      />

      {/* Notification */}
      {/* <TouchableOpacity onPress={onNotificationPress} style={styles.notificationContainer}>
        <Icon name="notifications" type="material" color="#333" size={24} />
      </TouchableOpacity> */}
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#fff',
    height: 30,
    marginTop: 0
  },
  logo: {
    width: 100,
    height: 40,
    resizeMode: 'contain',
  },
  notificationContainer: {
    padding: 5,
    color: "#333"
  },
});

export default CustomHeader;
