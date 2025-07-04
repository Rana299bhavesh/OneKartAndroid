import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SplashScreen from './src/screens/SplashScreen';

import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import ForgotPasswordScreen from './src/screens/ForgotPasswordScreen';
import ResetScreen from './src/screens/ResetScreen';
import CurrentLocationScreen from './src/screens/CurrentLocationScreen';
import SearchScreen from './src/screens/SearchScreen';




const Stack = createNativeStackNavigator();

export default function App() {
  return (
  
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
        <Stack.Screen name="Reset" component={ResetScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="CurrentLocation" component={CurrentLocationScreen} />
        <Stack.Screen name="Search" component={SearchScreen} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
