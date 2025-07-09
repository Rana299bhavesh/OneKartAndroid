import React, { useState, useEffect } from 'react';
import { PermissionsAndroid, Platform } from 'react-native';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,

  Alert,
} from 'react-native';
import { ActivityIndicator } from 'react-native';
import { useRoute } from '@react-navigation/native';

// Ensure you have .env set up correctly
import Toast from 'react-native-root-toast';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Geolocation from '@react-native-community/geolocation';

import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { Dimensions } from 'react-native';

import axios from 'axios';
import UserIconWithModal from '../components/UserIconWithModal';
const platforms = [
  { name: 'blinkit', image: require('../assets/Images/blinkit.png') },
  { name: 'zepto', image: require('../assets/Images/zepto.png') },
  { name: 'jioMart', image: require('../assets/Images/jiomart.png') },
  { name: 'dmart', image: require('../assets/Images/dmart.png') },
  { name: 'swiggy', image: require('../assets/Images/swiggy.png') },
];

const platformLogos = {
  blinkit: require('../assets/Images/blinkitsm.png'),
  zepto: require('../assets/Images/zepto.png'),
  jioMart: require('../assets/Images/jiomart.png'),
  dmart: require('../assets/Images/dmart.png'),
  swiggy: require('../assets/Images/swiggy.png'),
};

const productCardData = [
  {
    title: 'Fresh Green Beans',
    description: 'Locally sourced • Crisp & Nutritious',
    image: require('../assets/Images/product.png'),
    prices: {
      blinkit: { time: '15 mins', price: 'Rs 60' },
      zepto: { time: '20 mins', price: 'Rs 58' },
      jioMart: { time: '20 mins', price: 'Rs 61' },
      dmart: { time: '20 mins', price: 'Rs 59' },
      swiggy: { time: '25 mins', price: 'Rs 62' },
    },
  },

  {
    title: 'Fresh Green Beans',
    description: 'Locally sourced • Crisp & Nutritious',
    image: require('../assets/Images/product.png'),
    prices: {
      blinkit: { time: '15 mins', price: 'Rs 60' },
      zepto: { time: '20 mins', price: 'Rs 58' },
      jioMart: { time: '20 mins', price: 'Rs 61' },
      dmart: { time: '20 mins', price: 'Rs 59' },
      swiggy: { time: '25 mins', price: 'Rs 62' },
    },
  },

  {
    title: 'Fresh Green Beans',
    description: 'Locally sourced • Crisp & Nutritious',
    image: require('../assets/Images/product.png'),
    prices: {
      blinkit: { time: '15 mins', price: 'Rs 60' },
      zepto: { time: '20 mins', price: 'Rs 58' },
      jioMart: { time: '20 mins', price: 'Rs 61' },
      dmart: { time: '20 mins', price: 'Rs 59' },
      swiggy: { time: '25 mins', price: 'Rs 62' },
    },
  },

  {
    title: 'Fresh Green Beans',
    description: 'Locally sourced • Crisp & Nutritious',
    image: require('../assets/Images/product.png'),
    prices: {
      blinkit: { time: '15 mins', price: 'Rs 60' },
      zepto: { time: '20 mins', price: 'Rs 58' },
      jioMart: { time: '20 mins', price: 'Rs 61' },
      dmart: { time: '20 mins', price: 'Rs 59' },
      swiggy: { time: '25 mins', price: 'Rs 62' },
    },
  },
  // Duplicate this object as needed...
];


export default function HomeScreen() {
  const [selectedRows, setSelectedRows] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [username, setUsername] = useState('User');
  
  const [locationInput, setLocationInput] = useState('');
  const [loadingLocation, setLoadingLocation] = useState(true);

  const navigation = useNavigation();
  const screenWidth = Dimensions.get('window').width;
  const CARD_MARGIN = 12;
  const CARD_WIDTH = (screenWidth - CARD_MARGIN * 3) / 2;
  const route = useRoute();

useEffect(() => {
  if (route.params?.selectedLocation) {
    setLocationInput(route.params.selectedLocation);
  }
}, [route.params?.selectedLocation]);


  useEffect(() => {
    const user = auth().currentUser;
    if (user) {
      setUsername(user.displayName || user.email || 'User');
    }
  }, []);

  const handleLogout = async () => {
    try {
      await auth().signOut();
      Toast.show('Logged out successfully', {
        duration: Toast.durations.SHORT,
        position: Toast.positions.BOTTOM,
        backgroundColor: 'black',
        textColor: 'white',
      });
      navigation.replace('Login');
    } catch (error) {
      Toast.show('Logout failed', {
        duration: Toast.durations.SHORT,
        position: Toast.positions.BOTTOM,
        backgroundColor: 'red',
        textColor: 'white',
      });
    }
  };

  const requestLocationPermission = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }
    return true; // iOS asks automatically
  };

  const handleUseCurrentLocation = async () => {
    setLoadingLocation(true);

    const hasPermission = await requestLocationPermission();
    if (!hasPermission) {
      Alert.alert('Permission Denied', 'Location permission is required.');
      setLoadingLocation(false);
      return;
    }

    Geolocation.getCurrentPosition(
      async position => {
        const { latitude, longitude } = position.coords;
        console.log("Actual Location:", latitude, longitude);

        try {
          const response = await axios.get(
  `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyDuiG4188Rc0721956iF1ZO3nn6wyR2cg0`
);


          if (response.data.results.length > 0) {
            const address = response.data.results[0].formatted_address;

            setLocationInput(address);
          } else {
            Alert.alert('Location Error', 'Unable to retrieve address.');
          }

          setModalVisible(false);
        } catch (error) {
          if (__DEV__) {
            console.error('API Error:', error?.response?.data || error.message);
          }

          Alert.alert('API Error', 'Failed to fetch address.');
        } finally {
          setLoadingLocation(false);
        }
      },
      error => {
        console.error('Geolocation Error:', JSON.stringify(error));
        Alert.alert('Error', `Unable to access location'+ ${error.message}`);
        setLoadingLocation(false);
      },
      { enableHighAccuracy: true, timeout: 30000, maximumAge: 10000, forceRequestLocation: true, distanceFilter: 0, }
    );
  };
 useEffect(() => {
  if (route.params?.selectedLocation) {
    setLocationInput(route.params.selectedLocation);
    setLoadingLocation(false); // ✅ important!
  } else {
    handleUseCurrentLocation();
  }
}, [route.params?.selectedLocation]);



  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} style={styles.container}>
        {/* Location & User Bar */}
        <View style={styles.locationContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('Location')}>
  <Icon name="map-marker" size={22} color="#333" />
</TouchableOpacity>

          <View style={{ flex: 1, marginLeft: 8, marginRight: 8 }}>
  {loadingLocation ? (
    <ActivityIndicator size="small" color="green" />
  ) : (
    <TouchableOpacity onPress={() => navigation.navigate('Location')}>
      <Text
        style={styles.locationText}
        numberOfLines={1}
        ellipsizeMode="tail"
      >
        {locationInput || 'Tap to get location'}
      </Text>
    </TouchableOpacity>
  )}
  <Text style={styles.countryText}>India</Text>
</View>


          <TouchableOpacity style={styles.searchButton} onPress={() => navigation.navigate('Loading', { target: 'Search', locationInput })}>
            <Icon name="magnify" size={22} color="#000" />
          </TouchableOpacity>
          <View style={styles.userButton}>
            <UserIconWithModal />
          </View>

        </View>

        {/* Banner */}
        <Image
          source={require('../assets/Images/Voucher.png')}
          style={styles.banner}
          resizeMode="cover"
        />

        {/* Platforms */}
        <Text style={styles.sectionTitle}>Several Platforms</Text>
        <View style={styles.platformsRow}>
          {platforms.map((item, index) => (
            <View key={index} style={styles.platformWrapper}>
              <Image source={item.image} style={styles.platformIcon} />
            </View>
          ))}
        </View>

        {/* Compare and Save */}
        <View style={styles.compareHeader}>
          <Text style={styles.sectionTitle}>Compare And Save</Text>
          <TouchableOpacity>
            <Text style={styles.seeAll}>See All</Text>
          </TouchableOpacity>
        </View>

        {/* Product Cards */}
        <View style={styles.cardGrid}>
          {productCardData.map((item, index) => (
            <View
              key={index}
              style={[
                styles.card,
                {
                  width: CARD_WIDTH,
                  marginBottom: 20, // Add margin on both sides
                },
              ]}>


              <Image source={item.image} style={styles.productImage} />
              <View style={styles.cardInner}>
                <Text style={styles.productTitle}>{item.title}</Text>
                <Text style={styles.productDesc}>{item.description}</Text>
                <Text style={styles.availableText}>Available on:</Text>
                {Object.entries(item.prices).map(([platform, { time, price }], i) => {
                  const isSelected = selectedRows[index] === platform;
                  return (
                    <TouchableOpacity
                      key={i}
                      onPress={() =>
                        setSelectedRows(prev => ({
                          ...prev,
                          [index]: platform,
                        }))
                      }
                      style={[styles.priceRow, isSelected && styles.selectedRow]}
                    >
                      <Image source={platformLogos[platform]} style={styles.priceLogo} />
                      <View style={styles.timePriceRow}>
                        <View style={styles.timeBox}>
                          <Text style={styles.timeText}>{time}</Text>
                        </View>
                      </View>
                      <View style={styles.priceBox}>
                        <Text style={styles.priceText}>{price}</Text>
                      </View>
                    </TouchableOpacity>
                  );
                })}
                <TouchableOpacity style={styles.cartButton}>
                  <Text style={styles.cartButtonText}>Add To Cart</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* User Modal */}

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 15, backgroundColor: '#fff' },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
    flexWrap: 'nowrap',
  },
  locationText: { fontWeight: 'bold', fontSize: 16 },
  countryText: { fontSize: 12, color: '#666' },
  searchButton: {
    backgroundColor: '#eee',
    padding: 8,
    borderRadius: 8,
    marginHorizontal: 4,
  },
  userButton: {

    padding: 5,
    borderRadius: 10,
    backgroundColor: '#f0f0f0',
  },
  banner: {
    width: '100%',
    height: 120,
    borderRadius: 12,
    marginBottom: 20,
  },
  sectionTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 10,
    color: 'black',
  },
  platformsRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly', // evenly spaced icons
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 0,
  },
  platformWrapper: {
    width: 75,             // consistent box width
    height: 45,            // consistent box height
    borderWidth: 1.5,
    borderColor: '#ccc',
    borderRadius: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    marginHorizontal: 1,
    overflow: 'hidden',
    elevation: 1,
  },
  platformIcon: {
    width: 110,
    height: 60,
    resizeMode: 'contain',
    // consistent border radius
  },
  timePriceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
    marginLeft: 10, // spacing between logo and time box
    gap: 10,
  },
  compareHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  seeAll: {
    color: 'green',
    fontWeight: '600',
  },
  cardGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    backgroundColor: '#f2f2f2',
    borderRadius: 16,
    marginBottom: 20,
    marginTop: 5,
    elevation: 4,
    overflow: 'hidden',
    marginHorizontal: 0, // Add horizontal margin for spacing

  },
  productImage: {
    width: '100%',
    height: 100,
    resizeMode: 'cover',
  },
  cardInner: { padding: 8 },
  productTitle: { fontWeight: 'bold', fontSize: 15, color: 'black' },
  productDesc: { fontSize: 12, color: 'black', marginBottom: 8 },
  availableText: { fontWeight: '600', marginBottom: 4, color: 'black' },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
    paddingVertical: 4,
    paddingHorizontal: 6,
    borderRadius: 10,
    borderWidth: 1, // ✅ always present
    borderColor: '#ccc',
  },
  selectedRow: {
    backgroundColor: 'white',
    // borderWidth: 1,
    // borderColor: '#ccc',


  },
  priceLogo: {
    width: 50,
    height: 30,
    resizeMode: 'contain',
    borderRadius: 6,
  },
  timeBox: {
    backgroundColor: '#FFE4B5',
    paddingHorizontal: 6,
    paddingVertical: 2, // MATCHED
    borderRadius: 6,
    borderWidth: 1.5,
    borderColor: '#FB8C0080',
    alignItems: 'center',
    justifyContent: 'center',
  },
  timeText: { color: '#FF8C00', fontSize: 10, fontWeight: '500' },
  priceBox: {
    backgroundColor: '#E0F3E0',
    paddingHorizontal: 6,
    paddingVertical: 4, // MATCHED
    borderRadius: 6,
    borderWidth: 1.5,
    borderColor: '#A5D6A7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  priceText: { fontWeight: '500', fontSize: 11 },
  cartButton: {
    backgroundColor: 'green',
    marginTop: 8,
    paddingVertical: 8,
    borderRadius: 20,
    alignItems: 'center',
  },
  cartButtonText: { color: '#fff', fontWeight: '600' },
  modalOverlay: {
    position: 'absolute',
    top: 55,
    right: 15,
    zIndex: 1000,
  },
  userModalContent: {
    width: 200,
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  userNameText: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 10,
    marginBottom: 20,
    color: '#333',
  },
  logoutButton: {
    backgroundColor: 'red',
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 8,
    marginBottom: 15,
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
