import React, { useRef, useState } from 'react';
import { StyleSheet, View, Text, Dimensions } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

const Location = ({ navigation }) => {
//   const [locationText, setLocationText] = useState('');
  const googlePlacesRef = useRef();
  const [isFocused, setIsFocused] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Choose Your Location</Text>
      </View>

      <GooglePlacesAutocomplete
        ref={googlePlacesRef}
        placeholder="Search for location"
        fetchDetails={true}
        minLength={2}
        onPress={(data, details = null) => {
          const { lat, lng } = details.geometry.location;
          console.log("=== PLACE SELECTED ===");
          console.log("DATA:", data);
          console.log("DETAILS:", details);
          console.log("Latitude:", lat);
          console.log("Longitude:", lng);
          navigation.navigate('Home', { selectedLocation: data.description });
        }}
        onFail={error => console.log('Places API error:', error)}
        query={{
          key: 'AIzaSyDuiG4188Rc0721956iF1ZO3nn6wyR2cg0',
          language: 'en',
        }}
        enablePoweredByContainer={false}
        keyboardShouldPersistTaps="handled"
        listViewDisplayed={false}
        keepResultsAfterBlur={true}
        styles={{
          container: {
            flex: 0,
            paddingHorizontal: width * 0.05, // Responsive horizontal padding
            marginTop: width * 0.03,
          },
          textInputContainer: {
            backgroundColor: '#fff',
            borderRadius: 10,
          },
          textInput: {
            height: 50,
            color: '#333',
            fontSize: width < 380 ? 14 : 16, // Responsive font size
            borderRadius: 10,
            backgroundColor: '#f5f5f5',
            paddingHorizontal: 10,
            borderWidth: 1,
            borderColor: isFocused ? 'green' : '#f5f5f5',

            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 3,
          },
          listView: {
            backgroundColor: '#fff',
            borderRadius: 10,
            marginTop: 5,
            elevation: 3,
            position: 'relative',
            zIndex: 1000,
          },
          row: {
            padding: 13,
            height: 50,
            flexDirection: 'row',
            alignItems: 'center',
            borderBottomWidth: 0.3,
            borderColor: '#ccc',
          },
          description: {
            fontSize: width < 380 ? 13 : 14,
            color: '#333',
          },
          separator: {
            height: 0.5,
            backgroundColor: '#ccc',
          },
        }}
        predefinedPlaces={[]}
        currentLocation={false}
        currentLocationLabel="Current location"
        nearbyPlacesAPI="GooglePlacesSearch"
        debounce={300}
        textInputProps={{
          autoCorrect: false,
          onFocus: () => setIsFocused(true),
          onBlur: () => {
            // Delay the blur to allow for tap selection
            setTimeout(() => setIsFocused(false), 150);
          },
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    backgroundColor: '#f0f2f5',
  },
  headerContainer: {
    paddingHorizontal: width * 0.05,
    paddingBottom: 10,
  },
  headerText: {
    fontSize: width < 380 ? 20 : 22,
    fontWeight: '600',
    color: '#1a1a1a',
  },
});

export default Location;