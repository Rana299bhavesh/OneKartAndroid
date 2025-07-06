import React from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

const UserIconWithModal = () => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={{ padding: 5, borderRadius: 20 }}
      onPress={() => navigation.navigate('UserProfile')} // ✅ Navigate to screen
    >
      <Icon name="account-circle" size={28} color="#000" />
    </TouchableOpacity>
  );
};

export default UserIconWithModal;
