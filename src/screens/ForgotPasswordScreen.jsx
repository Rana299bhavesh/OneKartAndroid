// ForgotPasswordScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import LinearGradient from 'react-native-linear-gradient';

const ForgotPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'error' or 'success'

  const showMessage = (text, type = 'error') => {
    setMessage(text);
    setMessageType(type);
    setTimeout(() => setMessage(''), 5000);
  };

  const handleResetPassword = async () => {
    if (!email) {
      showMessage('Please enter your email', 'error');
      return;
    }

    try {
      await auth().sendPasswordResetEmail(email);
      showMessage('Reset link sent! Check your Inbox and Spam folder.', 'success');
      setTimeout(() => navigation.goBack(), 3000);
    } catch (error) {
  console.log('Reset password error:', error.code, error.message);
  showMessage(error.message || 'Something went wrong', 'error');
}

  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reset Password</Text>

      <Text style={styles.label}>Enter your registered email</Text>

      <TextInput
        placeholder="Email"
        placeholderTextColor="#6B7280"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      {/* ✅ Inline message display */}
      {message !== '' && (
        <Text style={[styles.message, messageType === 'error' ? styles.errorText : styles.successText]}>
          {message}
        </Text>
      )}

      <TouchableOpacity onPress={handleResetPassword} activeOpacity={0.8} style={{ width: '90%' }}>
        <LinearGradient
          colors={['#2E7D32', '#4CAF50']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.register}
        >
          <Text style={styles.buttonText}>Send Reset Link</Text>
        </LinearGradient>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.backText}>Back to Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#000',
    marginBottom: 30,
  },
  label: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 10,
  },
  input: {
    width: '90%',
    padding: 14,
    borderRadius: 30,
    backgroundColor: '#fff',
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    fontSize: 14,
    color: '#000',
    marginBottom: 10,
  },
  message: {
    fontSize: 13,
    textAlign: 'center',
    marginBottom: 10,
  },
  errorText: {
    color: '#D32F2F',
  },
  successText: {
    color: '#2E7D32',
  },
  register: {
    paddingVertical: 16,
    borderRadius: 30,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    marginBottom: 20,
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
  backText: {
    color: '#2E7D32',
    fontWeight: '500',
    fontSize: 14,
  },
});

export default ForgotPasswordScreen;
