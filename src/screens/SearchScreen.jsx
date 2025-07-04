import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const productImage = require('../assets/Images/boofer.png'); // Replace with actual image path
const blinkitLogo = require('../assets/Images/blinkit.png');
const zeptoLogo = require('../assets/Images/zepto.png');

const platforms = [
  { name: 'blinkit', logo: blinkitLogo },
  { name: 'zepto', logo: zeptoLogo },
];

const SearchScreen = () => {
  const [selectedCards, setSelectedCards] = useState({});

  const toggleSelect = (index) => {
    setSelectedCards((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Icon name="map-marker" size={24} color="#000" />
        <View>
          <Text style={styles.city}>Zurich, love road</Text>
          <Text style={styles.country}>Switzerland</Text>
        </View>
      </View>

      <View style={styles.searchContainer}>
        <Icon name="magnify" size={24} color="gray" />
        <TextInput placeholder="Atta" style={styles.searchInput} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {platforms.map((platform, idx) => (
          <View key={idx} style={styles.platformSection}>
            <View style={styles.platformHeader}>
              <Image source={platform.logo} style={styles.platformLogo} />
              <Text style={styles.seeAll}>See All</Text>
            </View>

            {[1, 2].map((_, index) => {
              const cardIndex = `${idx}-${index}`;
              return (
                <View
                  key={cardIndex}
                  style={[
                    styles.card,
                    selectedCards[cardIndex] && styles.selectedCard,
                  ]}
                >
                  <TouchableOpacity onPress={() => toggleSelect(cardIndex)}>
                    <View
                      style={[
                        styles.circle,
                        selectedCards[cardIndex] && styles.checkedCircle,
                      ]}
                    >
                      {selectedCards[cardIndex] && (
                        <Icon name="check" color="#fff" size={16} />
                      )}
                    </View>
                  </TouchableOpacity>

                  <Image source={productImage} style={styles.productImage} />

                  <View style={styles.details}>
                    <Text style={styles.productTitle}>Fresh Green Beans</Text>
                    <Text style={styles.productDesc}>
                      Locally Sourced · Crisp & Nutritious
                    </Text>
                    <View style={styles.priceRow}>
                      <Text style={styles.price}>INR 50.66</Text>
                      <Text style={styles.cutPrice}>₹65.99</Text>
                    </View>
                    <View style={styles.buttonRow}>
                      <TouchableOpacity style={styles.knowMore}>
                        <Text style={styles.knowText}>Know More</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.cartBtn}>
                        <Text style={styles.cartText}>Add To Cart</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              );
            })}
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  city: { fontSize: 16, fontWeight: 'bold' },
  country: { fontSize: 12, color: 'gray' },

  searchContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  searchInput: { marginLeft: 8, flex: 1 },

  platformSection: { marginBottom: 20 },
  platformHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  platformLogo: { width: 80, height: 40, resizeMode: 'cover', borderRadius: 5 },
  seeAll: { color: 'green', fontWeight: 'bold' },

  card: {
    flexDirection: 'row',
    backgroundColor: '#f8f8f8',
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
    elevation: 2,
    borderWidth: 1.5,
    borderColor: '#e0e0e0',
  },
  selectedCard: {
    borderColor: 'green',
  },

  circle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: '#ccc',
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkedCircle: {
    backgroundColor: 'green',
    borderColor: 'green',
  },

  productImage: {
    width: 80,
    height: 100,
    resizeMode: 'contain',
    marginRight: 12,
  },

  details: { flex: 1 },
  productTitle: { fontSize: 16, fontWeight: 'bold' },
  productDesc: { fontSize: 12, color: 'gray', marginVertical: 4 },

  priceRow: { flexDirection: 'row', alignItems: 'center', marginVertical: 4 },
  price: { color: 'green', fontWeight: 'bold', fontSize: 16 },
  cutPrice: {
    textDecorationLine: 'line-through',
    marginLeft: 6,
    color: 'gray',
    fontSize: 12,
  },

  buttonRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 8,
  },
  knowMore: {
    borderColor: 'green',
    borderWidth: 1,
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  cartBtn: {
    backgroundColor: 'green',
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  knowText: { color: 'green', fontSize: 12 },
  cartText: { color: '#fff', fontSize: 12 },
});
