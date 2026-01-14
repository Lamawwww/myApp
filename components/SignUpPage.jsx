import { StyleSheet, Text, View, TextInput, TouchableOpacity, Animated, Pressable, Alert } from 'react-native';
import { useState, useRef, useEffect } from 'react';
import Toast from 'react-native-toast-message';
import { useAuth } from '../context/AuthContext.jsx';

export default function SignUpPage({ navigation }) {
  const { signUp } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  
  const [isUsernameFocused, setIsUsernameFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [isConfirmPasswordFocused, setIsConfirmPasswordFocused] = useState(false);
  const [isEmailFocused, setIsEmailFocused] = useState(false);

  const usernameInputRef = useRef(null);
  const passwordInputRef = useRef(null);
  const confirmPasswordInputRef = useRef(null);
  const emailInputRef = useRef(null);

  const usernameLabelAnim = useRef(new Animated.Value(0)).current;
  const passwordLabelAnim = useRef(new Animated.Value(0)).current;
  const confirmPasswordLabelAnim = useRef(new Animated.Value(0)).current;
  const emailLabelAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(usernameLabelAnim, {
      toValue: isUsernameFocused || username ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [isUsernameFocused, username]);

  useEffect(() => {
    Animated.timing(passwordLabelAnim, {
      toValue: isPasswordFocused || password ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [isPasswordFocused, password]);

  useEffect(() => {
    Animated.timing(confirmPasswordLabelAnim, {
      toValue: isConfirmPasswordFocused || confirmPassword ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [isConfirmPasswordFocused, confirmPassword]);

  useEffect(() => {
    Animated.timing(emailLabelAnim, {
      toValue: isEmailFocused || email ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [isEmailFocused, email]);

  const handleSignUp = () => {
    // Validate all fields
    if (!username || !password || !confirmPassword || !email) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    // Validate username length
    if (username.length < 8) {
      Alert.alert('Error', 'Username must contain at least 8 characters');
      return;
    }

    // Validate password strength
    if (password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters');
      return;
    }

    // Validate password match
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    // Validate email
    if (!email.includes('@')) {
      Alert.alert('Error', 'Please enter a valid email address');
      return;
    }

    // Create account
    const result = signUp(username, password, email);
    if (result.success) {
      navigation.navigate('Login');
      Toast.show({
        type: 'success',
        text1: 'Account Created',
        text2: 'You can now log in with your credentials',
        position: 'top',
        visibilityTime: 3000,
      });
    } else {
      Alert.alert('Sign Up Failed', result.message);
    }
  };

  const handleLogin = () => {
    navigation.navigate('Login');
  };

  const createLabelStyle = (anim) => ({
    top: anim.interpolate({
      inputRange: [0, 1],
      outputRange: [15, -10],
    }),
    fontSize: anim.interpolate({
      inputRange: [0, 1],
      outputRange: [16, 12],
    }),
    backgroundColor: anim.interpolate({
      inputRange: [0, 1],
      outputRange: ['transparent', '#0a1628'],
    }),
  });

  // Validation messages
  const getUsernameValidation = () => {
    if (!username) return { message: 'Must contain 8 letters', color: '#999' };
    if (username.length < 8) return { message: 'Must contain 8 letters', color: '#999' };
    return { message: '✓ Valid username', color: '#4caf50' };
  };

  const getPasswordStrength = () => {
    if (!password) return { message: '', color: '#999' };
    if (password.length < 6) return { message: 'Password strength is weak', color: '#f44336' };
    if (password.length < 10) return { message: 'Password strength is medium', color: '#ff9800' };
    return { message: 'Password strength is strong', color: '#4caf50' };
  };

  const getPasswordMatch = () => {
    if (!confirmPassword) return { message: '', color: '#999' };
    if (password !== confirmPassword) return { message: 'Passwords do not match', color: '#f44336' };
    return { message: 'Passwords match', color: '#4caf50' };
  };

  const getEmailValidation = () => {
    if (!email) return { message: 'Must contain @address', color: '#999' };
    if (!email.includes('@')) return { message: 'Must contain @address', color: '#999' };
    return { message: '✓ Valid email', color: '#4caf50' };
  };

  const usernameValidation = getUsernameValidation();
  const passwordStrength = getPasswordStrength();
  const passwordMatch = getPasswordMatch();
  const emailValidation = getEmailValidation();

  return (
    <View style={styles.container}>
      {/* Title */}
      <Text style={styles.title}>Play Mi</Text>

      {/* Username Input */}
      <Pressable style={styles.inputContainer} onPress={() => usernameInputRef.current?.focus()}>
        <Animated.Text style={[styles.inputLabel, createLabelStyle(usernameLabelAnim)]} pointerEvents="none">
          Username
        </Animated.Text>
        <TextInput
          ref={usernameInputRef}
          style={styles.input}
          value={username}
          onChangeText={setUsername}
          onFocus={() => setIsUsernameFocused(true)}
          onBlur={() => setIsUsernameFocused(false)}
          placeholderTextColor="#666"
        />
        <Text style={[styles.validationText, { color: usernameValidation.color }]}>
          {usernameValidation.message}
        </Text>
      </Pressable>

      {/* Password Input */}
      <Pressable style={styles.inputContainer} onPress={() => passwordInputRef.current?.focus()}>
        <Animated.Text style={[styles.inputLabel, createLabelStyle(passwordLabelAnim)]} pointerEvents="none">
          Password
        </Animated.Text>
        <TextInput
          ref={passwordInputRef}
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          onFocus={() => setIsPasswordFocused(true)}
          onBlur={() => setIsPasswordFocused(false)}
          secureTextEntry
          placeholderTextColor="#666"
        />
        <Text style={[styles.validationText, { color: passwordStrength.color }]}>
          {passwordStrength.message}
        </Text>
      </Pressable>

      {/* Confirm Password Input */}
      <Pressable style={styles.inputContainer} onPress={() => confirmPasswordInputRef.current?.focus()}>
        <Animated.Text style={[styles.inputLabel, createLabelStyle(confirmPasswordLabelAnim)]} pointerEvents="none">
          Confirm Password
        </Animated.Text>
        <TextInput
          ref={confirmPasswordInputRef}
          style={styles.input}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          onFocus={() => setIsConfirmPasswordFocused(true)}
          onBlur={() => setIsConfirmPasswordFocused(false)}
          secureTextEntry
          placeholderTextColor="#666"
        />
        <Text style={[styles.validationText, { color: passwordMatch.color }]}>
          {passwordMatch.message}
        </Text>
      </Pressable>

      {/* Email Input */}
      <Pressable style={styles.inputContainer} onPress={() => emailInputRef.current?.focus()}>
        <Animated.Text style={[styles.inputLabel, createLabelStyle(emailLabelAnim)]} pointerEvents="none">
          Email
        </Animated.Text>
        <TextInput
          ref={emailInputRef}
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          onFocus={() => setIsEmailFocused(true)}
          onBlur={() => setIsEmailFocused(false)}
          keyboardType="email-address"
          autoCapitalize="none"
          placeholderTextColor="#666"
        />
        <Text style={[styles.validationText, { color: emailValidation.color }]}>
          {emailValidation.message}
        </Text>
      </Pressable>

      {/* Sign Up Button */}
      <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
        <Text style={styles.signUpButtonText}>Sign Up</Text>
      </TouchableOpacity>

      {/* Login Link */}
      <View style={styles.loginContainer}>
        <Text style={styles.loginText}>Already have an account? </Text>
        <TouchableOpacity onPress={handleLogin}>
          <Text style={styles.loginLink}>Login here</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a1628',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 64,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 40,
    textShadowColor: 'rgba(255, 255, 255, 0.3)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
    position: 'relative',
  },
  inputLabel: {
    position: 'absolute',
    left: 15,
    color: '#ffffff',
    paddingHorizontal: 4,
    zIndex: 1,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#ffffff',
    borderRadius: 8,
    paddingHorizontal: 15,
    color: '#ffffff',
    fontSize: 16,
  },
  validationText: {
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  },
  signUpButton: {
    width: '50%',
    height: 50,
    backgroundColor: '#7986cb',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  signUpButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
  },
  loginContainer: {
    flexDirection: 'row',
  },
  loginText: {
    color: '#999',
    fontSize: 14,
  },
  loginLink: {
    color: '#6b9ff5',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
});
