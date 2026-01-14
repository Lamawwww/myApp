import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Toast from 'react-native-toast-message';
import { AuthProvider } from './context/AuthContext.jsx';
import { CartProvider } from './context/CartContext.jsx';
import LoginPage from './components/LoginPage.jsx';
import SignUpPage from './components/SignUpPage.jsx';
import HomePage from './components/HomePage.jsx';
import ProductDetailsPage from './components/ProductDetailsPage.jsx';
import CartPage from './components/CartPage.jsx';
import CheckoutPage from './components/CheckoutPage.jsx';
import ProfilePage from './components/ProfilePage.jsx';
import SettingsPage from './components/SettingsPage.jsx';

const Stack = createStackNavigator();

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <NavigationContainer>
          <StatusBar style="light" />
          <Stack.Navigator
            initialRouteName="Login"
            screenOptions={{
              headerShown: false,
              cardStyle: { backgroundColor: '#0a1628' },
            }}
          >
            <Stack.Screen name="Login" component={LoginPage} />
            <Stack.Screen name="SignUp" component={SignUpPage} />
            <Stack.Screen name="Home" component={HomePage} />
            <Stack.Screen name="ProductDetails" component={ProductDetailsPage} />
            <Stack.Screen name="Cart" component={CartPage} />
            <Stack.Screen name="Checkout" component={CheckoutPage} />
            <Stack.Screen name="Profile" component={ProfilePage} />
            <Stack.Screen name="Settings" component={SettingsPage} />
          </Stack.Navigator>
          <Toast />
        </NavigationContainer>
      </CartProvider>
    </AuthProvider>
  );
}
