import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Toast from 'react-native-root-toast';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';

const UserIconWithModal = () => {
  const [userModalVisible, setUserModalVisible] = useState(false);
  const [username, setUsername] = useState('User');
  const navigation = useNavigation();

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

  return (
    <>
      <TouchableOpacity
        style={{ padding: 5, borderRadius: 20 }}
        onPress={() => setUserModalVisible(true)}
      >
        <Icon name="account-circle" size={28} color="#000" />
      </TouchableOpacity>

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
    </>
  );
};

export default UserIconWithModal;

const styles = StyleSheet.create({
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
