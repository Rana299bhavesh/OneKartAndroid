import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Modal,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native';

import auth from '@react-native-firebase/auth';
import Toast from 'react-native-root-toast';
import axios from 'axios';

const platforms = [
  { name: 'blinkit', image: require('../assets/Images/blinkit.png') },
  { name: 'zepto', image: require('../assets/Images/zepto.png') },
  { name: 'jioMart', image: require('../assets/Images/jiomart.png') },
  { name: 'dmart', image: require('../assets/Images/dmart.png') },
];

const platformLogos = {
  blinkit: require('../assets/Images/blinkitsm.png'),
  zepto: require('../assets/Images/zepto.png'),
  jioMart: require('../assets/Images/jiomart.png'),
  dmart: require('../assets/Images/dmart.png'),
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
    },
  },
];

export default function HomeScreen() {
  const navigation = useNavigation();
  const route = useRoute();

  const [selectedRows, setSelectedRows] = useState({});
  const [userModalVisible, setUserModalVisible] = useState(false);
  const [username, setUsername] = useState('User');
  const [locationName, setLocationName] = useState('Your Location');

  // Set username from auth user on mount
  useEffect(() => {
    const user = auth().currentUser;
    if (user) {
      setUsername(user.displayName || user.email || 'User');
    }
  }, []);

  // Update locationName if passed from CurrentLocationScreen
  useFocusEffect(
    useCallback(() => {
      if (route.params?.locationName) {
        setLocationName(route.params.locationName);
      }
    }, [route.params?.locationName])
  );

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

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} style={styles.container}>
        {/* Location & User Bar */}
        <View style={styles.locationContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('CurrentLocation')}>
            <Icon name="map-marker" size={22} color="#333" />
          </TouchableOpacity>
          <View>
            <Text style={styles.locationText}>{locationName}</Text>
            <Text style={styles.countryText}>India</Text>
          </View>
          <TouchableOpacity
            style={styles.searchButton}
            onPress={() => navigation.navigate('Search')}
          >
            <Icon name="magnify" size={22} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.userButton}
            onPress={() => setUserModalVisible(true)}
          >
            <Icon name="account-circle" size={28} color="#000" />
          </TouchableOpacity>
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
            <View key={index} style={styles.card}>
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
                      <View style={styles.timeBox}>
                        <Text style={styles.timeText}>{time}</Text>
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
      <Modal
        visible={userModalVisible}
        animationType="fade"
        transparent
        onRequestClose={() => setUserModalVisible(false)}
      >
        <TouchableOpacity
          activeOpacity={1}
          style={styles.modalOverlay}
          onPressOut={() => setUserModalVisible(false)}
        >
          <View style={styles.userModalContent}>
            <Text style={styles.userNameText}>{username}</Text>
            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
              <Text style={styles.logoutText}>Logout</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 15, backgroundColor: '#fff' },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 15,
  },
  locationText: { fontWeight: 'bold', fontSize: 16 },
  countryText: { fontSize: 12, color: '#666' },
  searchButton: {
    marginLeft: 'auto',
    backgroundColor: '#eee',
    padding: 8,
    borderRadius: 8,
  },
  userButton: {
    marginLeft: 10,
    padding: 5,
    borderRadius: 20,
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
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 5,
  },
  platformWrapper: {
    width: 80,
    height: 50,
    borderColor: '#ccc',
    borderRadius: 12,
    backgroundColor: '#fff',
    elevation: 3,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
  },
  platformIcon: {
    width: '120%',
    height: '130%',
    resizeMode: 'cover',
    borderRadius: 8,
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
    width: '48%',
    backgroundColor: '#f2f2f2',
    borderRadius: 16,
    marginBottom: 15,
    elevation: 4,
    overflow: 'hidden',
  },
  productImage: {
    width: '100%',
    height: 100,
    resizeMode: 'cover',
  },
  cardInner: { padding: 10 },
  productTitle: { fontWeight: 'bold', fontSize: 15, color: 'black' },
  productDesc: { fontSize: 12, color: 'black', marginBottom: 8 },
  availableText: { fontWeight: '600', marginBottom: 4, color: 'black' },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 6,
  },
  selectedRow: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 4,
  },
  priceLogo: {
    width: 40,
    height: 25,
    resizeMode: 'contain',
    borderRadius: 10,
  },
  timeBox: {
    backgroundColor: '#FFE4B5',
    paddingHorizontal: 3,
    paddingVertical: 2,
    borderRadius: 6,
    marginLeft: 8,
    borderWidth: 1.5,
    borderColor: '#FB8C0080',
  },
  timeText: { color: '#FF8C00', fontSize: 12, fontWeight: '600' },
  priceBox: {
    backgroundColor: '#E0F3E0',
    paddingHorizontal: 2,
    paddingVertical: 2,
    borderRadius: 6,
    borderWidth: 1.5,
    borderColor: '#A5D6A7',
  },
  priceText: { fontWeight: '500', fontSize: 13 },
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
