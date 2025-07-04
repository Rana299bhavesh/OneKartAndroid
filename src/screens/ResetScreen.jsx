import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';

const ResetScreen = ({ navigation }) => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Forgot Password?</Text>

      {/* New Password */}
      <View style={[styles.inputContainer, { borderColor: '#4CAF50' }]}>
        <Icon name="lock-outline" size={22} color="#4CAF50" style={styles.icon} />
        <TextInput
          placeholder="New Password"
          placeholderTextColor="#4CAF50"
          secureTextEntry={!showNewPassword}
          value={newPassword}
          onChangeText={setNewPassword}
          style={styles.input}
        />
        <TouchableOpacity onPress={() => setShowNewPassword(!showNewPassword)}>
          <Icon
            name={showNewPassword ? 'eye-off-outline' : 'eye-outline'}
            size={22}
            color="#4CAF50"
          />
        </TouchableOpacity>
      </View>

      {/* Confirm Password */}
      <View style={styles.inputContainer}>
        <Icon name="lock-outline" size={22} color="#aaa" style={styles.icon} />
        <TextInput
          placeholder="Confirm Password"
          placeholderTextColor="#aaa"
          secureTextEntry={!showConfirmPassword}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          style={[styles.input, { color: '#aaa' }]}
        />
        <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
          <Icon
            name={showConfirmPassword ? 'eye-off-outline' : 'eye-outline'}
            size={22}
            color="#aaa"
          />
        </TouchableOpacity>
      </View>

      {/* Submit Button */}
      <TouchableOpacity style={styles.submitBtn}>
        <LinearGradient
          colors={['#2E7D32', '#4CAF50']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.gradient}>
          <Text style={styles.submitText}>Submit</Text>
        </LinearGradient>
      </TouchableOpacity>

      {/* Back Button */}
      <TouchableOpacity
        style={styles.backBtn}
        onPress={() => navigation.goBack()}>
        <Text style={styles.backText}>Back</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ResetScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginBottom: 30,
    color: '#000',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#ccc',
    borderRadius: 30,
    paddingHorizontal: 16,
    marginBottom: 18,
    backgroundColor: '#fff',
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 3 },
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
  },
  submitBtn: {
    marginTop: 10,
    marginBottom: 14,
    borderRadius: 30,
    overflow: 'hidden',
    elevation: 3,
  },
  gradient: {
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: 'center',
  },
  submitText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  backBtn: {
    borderWidth: 1.5,
    borderColor: '#4CAF50',
    borderRadius: 30,
    paddingVertical: 14,
    alignItems: 'center',
  },
  backText: {
    color: '#4CAF50',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
