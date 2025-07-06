import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ActivityIndicator, View } from 'react-native';
import auth from '@react-native-firebase/auth';
import { FirebaseAuthTypes } from '@react-native-firebase/auth';
// Screens
import SplashScreen from './src/screens/SplashScreen';
import LoginScreen from './src/screens/LoginScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import ForgotPasswordScreen from './src/screens/ForgotPasswordScreen';
import ResetScreen from './src/screens/ResetScreen';
import HomeScreen from './src/screens/HomeScreen';
import CurrentLocationScreen from './src/screens/CurrentLocationScreen';
import SearchScreen from './src/screens/SearchScreen';
import UserProfileScreen from './src/screens/UserProfileScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged((user) => {
      setUser(user);
      setInitializing(false);
    });

    return unsubscribe;
  }, []);

  if (initializing) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {user ? (
          <>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="CurrentLocation" component={CurrentLocationScreen} />
            <Stack.Screen name="Search" component={SearchScreen} />
            <Stack.Screen name="UserProfile" component={UserProfileScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name="Splash" component={SplashScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="SignUp" component={SignUpScreen} />
            <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
            <Stack.Screen name="Reset" component={ResetScreen} />
            
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
