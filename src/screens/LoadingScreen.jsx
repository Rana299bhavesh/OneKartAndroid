import React, { useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet, Text } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const LoadingScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
 const { target, locationInput } = route.params || {};


  useEffect(() => {
    const timer = setTimeout(() => {
      if (target) {
  navigation.replace(target, { locationInput }); // ✅ pass location
} else {
  navigation.replace('Home', { locationInput });
}

    }, 2000);

    return () => clearTimeout(timer);
  }, [navigation, target]);

  return (
    <View style={styles.container}>
      <View style={styles.iconWrapper}>
        <Icon name="cart-outline" size={70} color="#4CAF50" />
      </View>
      <Text style={styles.title}>Smart Basket</Text>
      <Text style={styles.subtitle}>Compare Prices. Save More. Shop Smart.</Text>
      <ActivityIndicator size="large" color="#4CAF50" style={{ marginTop: 40 }} />
    </View>
  );
};

export default LoadingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  iconWrapper: {
    backgroundColor: '#E8F5E9',
    padding: 20,
    borderRadius: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#388E3C',
    fontFamily: 'Poppins-Bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#4E4E4E',
    textAlign: 'center',
    lineHeight: 24,
    fontFamily: 'Poppins-Regular',
  },
});
