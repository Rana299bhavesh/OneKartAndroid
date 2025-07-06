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
import auth from '@react-native-firebase/auth';
import { CommonActions } from '@react-navigation/native';
import { LoginSchema } from '../components/validationSchemas';
import { z } from 'zod';
const InputField = ({
  icon,
  placeholder,
  value,
  onChangeText,
  secureTextEntry,
  toggleVisibility,
  show,
  name,
  focusedField,
  setFocusedField,
}) => {
  const isFocused = focusedField === name;

  return (
    <View
      style={[
        styles.inputWrapper,
        {
          borderColor: isFocused ? '#4CAF50' : '#E5E7EB',
          borderWidth: 1.5,
        },
      ]}
    >
      <Icon
        name={icon}
        size={20}
        color={isFocused ? '#4CAF50' : '#6B7280'}
        style={styles.iconLeft}
      />
      <TextInput
        placeholder={placeholder}
        placeholderTextColor={isFocused ? '#4CAF50' : '#6B7280'}
        style={styles.inputField}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry && !show}
        onFocus={() => setFocusedField(name)}
        onBlur={() => setFocusedField(null)}
      />
      {secureTextEntry && (
        <TouchableOpacity onPress={toggleVisibility}>
          <Icon
            name={show ? 'eye-outline' : 'eye-off-outline'}
            size={20}
            color={isFocused ? '#4CAF50' : '#6B7280'}
            style={styles.iconRight}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [focusedField, setFocusedField] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);

  const onLogin = async () => {
  setErrorMessage('');
  try {
    const parsed = LoginSchema.parse({ email, password });

    await auth().signInWithEmailAndPassword(parsed.email, parsed.password);
    navigation.dispatch(CommonActions.reset({ index: 0, routes: [{ name: 'Home' }] }));
  } catch (error) {
    if (error instanceof z.ZodError) {
      setErrorMessage(error.errors[0].message);
    } else {
      setErrorMessage(error.message || 'Something went wrong.');
    }
  }
};

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign In</Text>

      <InputField
        icon="email-outline"
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        name="email"
        focusedField={focusedField}
        setFocusedField={setFocusedField}
      />

      <InputField
        icon="lock-outline"
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        toggleVisibility={() => setShowPassword(!showPassword)}
        show={showPassword}
        name="password"
        focusedField={focusedField}
        setFocusedField={setFocusedField}
      />

      {/* Show error message below input fields */}
      {errorMessage !== '' && (
        <Text style={styles.errorMessage}>{errorMessage}</Text>
      )}

      <TouchableOpacity
        onPress={() => navigation.navigate('ForgotPassword')}
        style={{ marginTop: 8 }}
      >
        <Text style={styles.forgotPassword}>Forgot Password?</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={onLogin} activeOpacity={0.8} style={styles.buttonWrapper}>
        <LinearGradient
          colors={['#2E7D32', '#4CAF50']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.register}
        >
          <Text style={styles.buttonText}>Login</Text>
        </LinearGradient>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
        <Text style={styles.signupLink}>
          Don't have an account?{' '}
          <Text style={{ color: '#2E7D32', fontWeight: '500' }}>Sign Up</Text>
        </Text>
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
    fontSize: 28,
    color: '#000000',
    fontWeight: '600',
    marginBottom: 40,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 9999,
    paddingHorizontal: 16,
    paddingVertical: 8,
    width: '90%',
    marginTop: 38,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },

  iconLeft: {
    marginRight: 10,
  },
  iconRight: {
    marginLeft: 8,
  },
  inputField: {
    flex: 1,
    fontSize: 14,
    color: '#000',
  },
  forgotPassword: {
    color: '#2E7D32',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 24,
  },
  buttonWrapper: {
    width: '90%',
    alignItems: 'center',
    marginTop: 40,
  },
  register: {
    width: '100%',
    paddingVertical: 20,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    fontWeight: '600',
  },
  signupLink: {
    marginTop: 20,
    color: 'black',
    fontSize: 16,
    fontWeight: '400',
  },
  errorMessage: {
    color: '#D32F2F',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 20,
  },
});

export default LoginScreen;
