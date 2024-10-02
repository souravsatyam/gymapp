import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import GymListScreen from './screens/GymListScreen';
import BookingConfirmationScreen from './screens/BookingConfirmationScreen';
import OTPVerificationScreen from './screens/OTPVerificationScreen';
import GymDetailScreen from './screens/GymDetailScreen';
import ProfileScreen from './screens/ProfileScreen';
import InviteBuddiesScreen from './screens/InviteBuddiesScreen';
import AmenitiesListScreen from './screens/AmenitiesListScreen';
import NotificationListScreen from './screens/NotificationListScreen';
import WorkoutInvitation from './screens/WorkoutInvitation';
import WorkoutRequest from './screens/WorkoutRequest';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="GymList" component={GymListScreen} />
        <Stack.Screen name="BookingConfirmation" component={BookingConfirmationScreen} />
        <Stack.Screen name="OTPVerification" component={OTPVerificationScreen} />
        <Stack.Screen name="GymDetails" component={GymDetailScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="InviteBuddy" component={InviteBuddiesScreen} />
        <Stack.Screen name="AmenitiesListScreen" component={AmenitiesListScreen} />
        <Stack.Screen name="NotificationListScreen" component={NotificationListScreen} />
        <Stack.Screen name="WorkoutInvitation" component={WorkoutInvitation} />
        <Stack.Screen name="WorkoutRequest" component={WorkoutRequest} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
