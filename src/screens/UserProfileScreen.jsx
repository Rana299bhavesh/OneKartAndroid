import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import auth from '@react-native-firebase/auth';
import Toast from 'react-native-root-toast';

const UserProfileScreen = ({ navigation }) => {
  const [userInfo, setUserInfo] = useState({ name: 'User', email: '' });

  useEffect(() => {
    const user = auth().currentUser;
    if (user) {
      setUserInfo({
        name: user.displayName || 'User',
        email: user.email || '',
      });
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
    // or change depending on your flow
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
    <SafeAreaView style={styles.container}>
      <Text style={styles.screenTitle}>Your Profile</Text>

      <View style={styles.profileBox}>
        <View style={styles.row}>
          <Text style={styles.label}>Name:</Text>
          <Text style={styles.value}>{userInfo.name}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Email:</Text>
          <Text style={styles.value}>{userInfo.email}</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default UserProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  screenTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 30,
    alignSelf: 'center',
  },
  profileBox: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    marginBottom: 40,
  },
  row: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: '#666',
    marginBottom: 4,
  },
  value: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  logoutButton: {
    backgroundColor: '#e53935',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
