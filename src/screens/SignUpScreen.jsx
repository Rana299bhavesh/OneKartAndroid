import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { CommonActions } from '@react-navigation/native';
import { signUpSchema } from '../components/validationSchemas';
const InputField = ({
  icon,
  placeholder,
  secureTextEntry = false,
  value,
  onChangeText,
  toggleVisibility,
  show = false,
  name,
  circleIcon = false,
  onFocus,
  isFocused,
}) => (
  <View
    style={[
      styles.inputWrapper,
      {
        borderWidth: 1.5,
        borderColor: isFocused ? '#4CAF50' : '#E5E7EB',
        backgroundColor: '#fff',
        borderRadius: 30,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 4,
      },
    ]}
  >
    {circleIcon ? (
      <View style={styles.iconCircle}>
        <Icon name={icon} size={18} color={isFocused ? '#4CAF50' : '#6B7280'} />
      </View>
    ) : (
      <Icon
        name={icon}
        size={20}
        color={isFocused ? '#4CAF50' : '#6B7280'}
        style={styles.iconLeft}
      />
    )}
    <TextInput
      placeholder={placeholder}
      placeholderTextColor={isFocused ? '#4CAF50' : '#6B7280'}
      style={styles.inputField}
      secureTextEntry={!!secureTextEntry && !show}
      value={value}
      onChangeText={onChangeText}
      onFocus={onFocus}
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

const SignUpScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

 const onRegister = async () => {
  setErrorMessage('');
  setSuccessMessage('');

  const result = signUpSchema.safeParse({
    name,
    email,
    password,
    confirmPassword,
  });

  if (!result.success) {
    const errorField = result.error.errors[0];
    setErrorMessage(errorField.message);
    return;
  }

  try {
    const userCredential = await auth().createUserWithEmailAndPassword(email, password);

    await userCredential.user.updateProfile({
      displayName: name,
    });

    await firestore().collection('users').doc(userCredential.user.uid).set({
      uid: userCredential.user.uid,
      name,
      email,
      createdAt: firestore.FieldValue.serverTimestamp(),
    });

    setSuccessMessage('User account created successfully!');
    setTimeout(() => {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'Home' }],
        })
      );
    }, 1500);
  } catch (error) {
    if (error.code === 'auth/email-already-in-use') {
      setErrorMessage('That email address is already in use!');
    } else if (error.code === 'auth/invalid-email') {
      setErrorMessage('That email address is invalid!');
    } else {
      setErrorMessage('Something went wrong: ' + error.message);
    }
  }
};


  return (
    <View style={styles.container}>
      <Text style={styles.signup}>Sign Up</Text>
      <Text style={styles.signupText}>
        Discover better prices, unlock exclusive{'\n'}deals and shop smarter — all in one place.
      </Text>

      <InputField
        icon="account"
        placeholder="Full Name"
        value={name}
        onChangeText={setName}
        name="name"
        circleIcon={true}
        onFocus={() => setFocusedField('name')}
        isFocused={focusedField === 'name'}
      />
      <InputField
        icon="email-outline"
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        name="email"
        onFocus={() => setFocusedField('email')}
        isFocused={focusedField === 'email'}
      />
      <InputField
        icon="lock-outline"
        placeholder="Set Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        toggleVisibility={() => setShowPassword(!showPassword)}
        show={showPassword}
        name="password"
        onFocus={() => setFocusedField('password')}
        isFocused={focusedField === 'password'}
      />
      <InputField
        icon="lock-outline"
        placeholder="Confirm Password"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        toggleVisibility={() => setShowConfirm(!showConfirm)}
        show={showConfirm}
        name="confirm"
        onFocus={() => setFocusedField('confirm')}
        isFocused={focusedField === 'confirm'}
      />

      {/* Error or Success message */}
      {errorMessage !== '' && <Text style={styles.errorMessage}>{errorMessage}</Text>}
      {successMessage !== '' && <Text style={styles.successMessage}>{successMessage}</Text>}

      <TouchableOpacity
        onPress={onRegister}
        activeOpacity={0.8}
        style={styles.registerTouchable}
      >
        <LinearGradient
          colors={['#2E7D32', '#4CAF50']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.register}
        >
          <Text style={styles.registerTitle}>Sign Up</Text>
        </LinearGradient>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.signinLink}>
          Already have an account?{' '}
          <Text style={{ color: '#2E7D32', fontWeight: 600 }}>Login</Text>
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
  signup: {
    fontSize: 28,
    color: '#000000',
    fontWeight: '700',
    marginBottom: 20,
    fontFamily: 'Poppins-Bold',
  },
  signupText: {
    fontSize: 15,
    color: '#757575',
    textAlign: 'center',
    fontWeight: '500',
    lineHeight: 20,
    paddingHorizontal: 20,
    marginBottom: 24,
    fontFamily: 'Poppins-Regular',
  },

  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 100,
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

  iconCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#E5E7EB',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
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
  registerTouchable: {
    width: '90%',
    alignItems: 'center',
  },
  register: {
    width: '100%',
    paddingVertical: 18,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    marginTop: 30,
  },
  registerTitle: {
    fontSize: 20,
    color: 'white',
    fontWeight: '700',
    fontFamily: 'Poppins-Bold',
  },
  signinLink: {
    marginTop: 20,
    color: 'black',
    fontSize: 16,
    fontWeight: '400',
  },
  errorMessage: {
    color: '#D32F2F',
    fontSize: 14,
    marginTop: 20,
    fontFamily: 'Poppins-Regular',
    textAlign: 'center',
  },
  successMessage: {
    color: '#388E3C',
    fontSize: 14,
    marginTop: 20,
    fontFamily: 'Poppins-Regular',
    textAlign: 'center',
  },
});

export default SignUpScreen;
