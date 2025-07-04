import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MaskedView from '@react-native-masked-view/masked-view';

const { width, height } = Dimensions.get('window');

const SplashScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/Images/Cart.png')}
        style={styles.cartImage}
        resizeMode="contain"
      />
      <Image
        source={require('../assets/Images/onekart.png')}
        style={styles.logoImage}
        resizeMode="contain"
      />

      {/* 🌈 Gradient Text */}
      <MaskedView
        maskElement={
          <Text style={styles.subText}>
            Compare Prices Across All Top{'\n'}Grocery Apps Instantly
          </Text>
        }
      >
        <LinearGradient
          colors={['#2F9234', '#0E2C10']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          <Text style={[styles.subText, { opacity: 0 }]}>
            Compare Prices Across All Top{'\n'}Grocery Apps Instantly
          </Text>
        </LinearGradient>
      </MaskedView>

      <TouchableOpacity
        onPress={() => navigation.navigate('SignUp')}
        style={styles.skipButton}
      >
        <Text style={styles.skipText}>Skip</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    position: 'relative',
  },
  cartImage: {
    width: width * 0.35,     // Slightly smaller width
    height: height * 0.18,
    marginBottom: 10,
  },
  logoImage: {
    width: width * 0.5,
    height: height * 0.09,
    marginBottom: 20,
    resizeMode: 'contain',
  },
  subText: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 26,
    fontFamily: 'Poppins-Bold',
  },
  skipButton: {
    position: 'absolute',
    top: 50,
    right: 24,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  skipText: {
    color: '#34a853',
    fontSize: 16,
    fontWeight: '600',
  },
});
