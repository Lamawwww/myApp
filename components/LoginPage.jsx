import { StyleSheet, Text, View, TextInput, TouchableOpacity, Animated, Pressable, Alert, Image } from 'react-native';
import { useState, useRef, useEffect } from 'react';
import { useAuth } from '../context/AuthContext.jsx';

export default function LoginPage({ navigation }) {
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isUsernameFocused, setIsUsernameFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);

  const usernameInputRef = useRef(null);
  const passwordInputRef = useRef(null);

  const usernameLabelAnim = useRef(new Animated.Value(0)).current;
  const passwordLabelAnim = useRef(new Animated.Value(0)).current;

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

  const handleLogin = () => {
    if (!username || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    const result = login(username, password);
    if (result.success) {
      navigation.navigate('Home');
    } else {
      Alert.alert('Login Failed', result.message);
    }
  };

  const handleSignUp = () => {
    navigation.navigate('SignUp');
  };

  const handleSocialLogin = (platform) => {
    console.log(`${platform} login pressed`);
  };

  const usernameLabelStyle = {
    top: usernameLabelAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [15, -10],
    }),
    fontSize: usernameLabelAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [16, 12],
    }),
    backgroundColor: usernameLabelAnim.interpolate({
      inputRange: [0, 1],
      outputRange: ['transparent', '#0a1628'],
    }),
  };

  const passwordLabelStyle = {
    top: passwordLabelAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [15, -10],
    }),
    fontSize: passwordLabelAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [16, 12],
    }),
    backgroundColor: passwordLabelAnim.interpolate({
      inputRange: [0, 1],
      outputRange: ['transparent', '#0a1628'],
    }),
  };

  return (
    <View style={styles.container}>
      {/* Title */}
      <Image source={require('../assets/images/PlayMi.png')} style={styles.logo} />

      {/* Username Input */}
      <Pressable style={styles.inputContainer} onPress={() => usernameInputRef.current?.focus()}>
        <Animated.Text style={[styles.inputLabel, usernameLabelStyle]} pointerEvents="none">
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
      </Pressable>

      {/* Password Input */}
      <Pressable style={styles.inputContainer} onPress={() => passwordInputRef.current?.focus()}>
        <Animated.Text style={[styles.inputLabel, passwordLabelStyle]} pointerEvents="none">
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
      </Pressable>

      {/* Sign Up Link */}
      <View style={styles.signUpContainer}>
        <Text style={styles.signUpText}>Don't have an account? </Text>
        <TouchableOpacity onPress={handleSignUp}>
          <Text style={styles.signUpLink}>Sign up here</Text>
        </TouchableOpacity>
      </View>

      {/* Login Button */}
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>

      {/* Social Login Section */}
      <Text style={styles.socialText}>Other ways to sign in:</Text>
      <View style={styles.socialContainer}>

        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
        <Image
          source={require('../assets/images/google_logo.png')}
          style={styles.socialButton}
                   
        />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
        <Image  
          source={require('../assets/images/fb_logo.png')}
          style={styles.socialButton}
                   
        />
        </TouchableOpacity>  

        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
        <Image
          source={require('../assets/images/discord_logo.png')}
          style={styles.socialButton}
                   
        />
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
  logo: {
  width: 230,
  height: 200,
  marginBottom: 20,
  resizeMode: 'contain',
  },
  title: {
    fontSize: 64,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 60,
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
  signUpContainer: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 30,
  },
  signUpText: {
    color: '#999',
    fontSize: 14,
  },
  signUpLink: {
    color: '#6b9ff5',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
  loginButton: {
    width: '50%',
    height: 50,
    backgroundColor: '#7986cb',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40,
  },
  loginButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
  },
  socialText: {
    color: '#ffffff',
    fontSize: 14,
    marginBottom: 20,
  },
  socialContainer: {
    flexDirection: 'row',
    gap: 30,
  },
  socialButton: {
    width: 60,
    height: 60,
  },
  socialIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  facebookIcon: {
    backgroundColor: '#1877f2',
    require: '../assets/images/google_logo.png',
  },
  discordIcon: {
    backgroundColor: '#5865f2',
  },
  socialIconText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
  },
});
