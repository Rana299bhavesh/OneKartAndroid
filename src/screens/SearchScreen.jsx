import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import UserIconWithModal from '../components/UserIconWithModal';
import { useRoute } from '@react-navigation/native';

const products = [
  'Apples',
  'Bananas',
  'Tomatoes',
  'Milk',
  'Bread',
  'Butter',
  'Rice',
  'Wheat',
  'Oil',
  'Sugar',
];

const SearchScreen = () => {
  const route = useRoute();
  const locationFromParams = route.params?.locationInput || 'Loading location...';
  const [searchText, setSearchText] = useState('');

  const filteredProducts = products.filter(item =>
    item.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.locationBox}>
          <Icon name="map-marker" size={24} color="#000" style={{ marginRight: 8 }} />
          <View style={{ flexShrink: 1 }}>
            <Text style={styles.city} numberOfLines={1} ellipsizeMode="tail">
              {locationFromParams}
            </Text>
            <Text style={styles.country}>India</Text>
          </View>
        </View>
        <View style={styles.userButton}>
          <UserIconWithModal />
        </View>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Icon name="magnify" size={24} color="gray" />
        <TextInput
          placeholder="Search products..."
          value={searchText}
          onChangeText={setSearchText}
          style={styles.searchInput}
          returnKeyType="search"
        />
      </View>

      {/* Show results ONLY if text is entered */}
      {searchText.trim().length > 0 && (
        <ScrollView style={styles.resultContainer}>
          {filteredProducts.length > 0 ? (
            filteredProducts.map((item, index) => (
              <View key={index} style={styles.resultItem}>
                <Text style={styles.resultText}>{item}</Text>
              </View>
            ))
          ) : (
            <Text style={styles.noResult}>No products found</Text>
          )}
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  locationBox: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 8,
  },
  city: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  country: {
    fontSize: 12,
    color: 'gray',
  },
  userButton: {
    padding: 5,
    borderRadius: 10,
    backgroundColor: '#f0f0f0',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: 'green', // ✅ Green border
    marginBottom: 10,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    paddingVertical: 4,
  },
  resultContainer: {
    flex: 1,
  },
  resultItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  resultText: {
    fontSize: 16,
  },
  noResult: {
    marginTop: 20,
    textAlign: 'center',
    color: 'gray',
    fontSize: 16,
  },
});
