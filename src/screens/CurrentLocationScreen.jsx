import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Geolocation from '@react-native-community/geolocation';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const CurrentLocationScreen = () => {
  const navigation = useNavigation();
  const [locationInput, setLocationInput] = useState('');

  const requestLocationPermission = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }
    return true;
  };

  const getCurrentLocation = async () => {
    const hasPermission = await requestLocationPermission();
    console.log('Permission result:', hasPermission);
    if (!hasPermission) {
      Alert.alert('Permission Denied', 'Location permission is required.');
      return;
    }

    Geolocation.getCurrentPosition(
      async position => {
        const { latitude, longitude } = position.coords;
        try {
          const response = await axios.get(
            `https://api.opencagedata.com/geocode/v1/json?q=${latitude},${longitude}&key=936f3bcd520843d99ff3fe2311fce72c`
          );
          if (response.data.results.length > 0) {
            setLocationInput(response.data.results[0].formatted);
          } else {
            Alert.alert('Location Error', 'Unable to retrieve address.');
          }
        } catch (error) {
          Alert.alert('API Error', 'Failed to fetch address.');
        }
      },
      error => {
        Alert.alert('Error', 'Unable to access location');
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };

  const handleSubmit = () => {
    if (!locationInput.trim()) {
      Alert.alert('Invalid Input', 'Please enter or fetch a location.');
      return;
    }
    navigation.navigate('Home', { locationName: locationInput.trim() });
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/Images/maps.png')}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <LinearGradient
          colors={['#2E7D32', '#1D4E1F']}
          style={styles.gradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
        />
      </ImageBackground>

      <TouchableOpacity
        style={styles.skipButton}
        onPress={() => navigation.navigate('Home')}
        hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}
        activeOpacity={0.7}
      >
        <Text style={styles.skipText}>Skip</Text>
      </TouchableOpacity>

      <View style={styles.bottomCard}>
        <Text style={styles.heading}>Select Your Location</Text>
        <Text style={styles.subheading}>
          We need your location to show accurate prices and delivery options.
        </Text>

        <TextInput
          placeholder="Enter Location"
          placeholderTextColor="#999"
          style={styles.input}
          value={locationInput}
          onChangeText={setLocationInput}
        />

        <TouchableOpacity style={styles.button} onPress={getCurrentLocation}>
          <Text style={styles.buttonText}>Use Current Location</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { marginTop: 10, backgroundColor: '#555' }]}
          onPress={handleSubmit}
        >
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CurrentLocationScreen;

const styles = StyleSheet.create({
  container: { flex: 1 },
  backgroundImage: { flex: 1 },
  gradient: { ...StyleSheet.absoluteFillObject, opacity: 0.4 },
  skipButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 100,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 20,
  },
  skipText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  bottomCard: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#fff',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    padding: 25,
    alignItems: 'center',
  },
  heading: {
    fontWeight: 'bold',
    fontSize: 22,
    marginBottom: 12,
    color: '#222',
  },
  subheading: {
    fontSize: 14,
    marginBottom: 20,
    color: '#555',
    textAlign: 'center',
  },
  input: {
    width: '100%',
    height: 48,
    borderRadius: 25,
    borderColor: '#aaa',
    borderWidth: 1,
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 20,
    color: '#333',
  },
  button: {
    width: '100%',
    backgroundColor: '#2E7D32',
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});
