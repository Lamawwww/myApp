import { StyleSheet, Text, View, TouchableOpacity, Switch, SafeAreaView } from 'react-native';
import { useState } from 'react';
import Toast from 'react-native-toast-message';
import { useAuth } from '../context/AuthContext.jsx';

export default function SettingsPage({ navigation }) {
  const [pushNotifications, setPushNotifications] = useState(true);
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    Toast.show({
      type: 'success',
      text1: 'Logged Out',
      text2: 'You have been successfully logged out',
      position: 'top',
      visibilityTime: 2000,
    });
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        {/* Header */}
        <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backArrow}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Settings</Text>
        <Text></Text>
      </View>

        <View style={styles.content}>
          {/* Account Settings Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Account Settings</Text>

            <TouchableOpacity style={styles.menuItem}>
              <Text style={styles.menuItemText}>Edit profile</Text>
              <Text style={styles.arrowIcon}>›</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem}>
              <Text style={styles.menuItemText}>Change password</Text>
              <Text style={styles.arrowIcon}>›</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem}>
              <Text style={styles.menuItemText}>Add a payment method</Text>
              <Text style={styles.plusIcon}>+</Text>
            </TouchableOpacity>

            <View style={styles.menuItem}>
              <Text style={styles.menuItemText}>Push notifications</Text>
              <Switch
                value={pushNotifications}
                style={{ transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }] }}
                onValueChange={setPushNotifications}
                trackColor={{ false: '#767577', true: '#6b7fd7' }}
                thumbColor={pushNotifications ? '#ffffff' : '#f4f3f4'}
              />
            </View>
          </View>
          <View style={styles.divider} />
          {/* More Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>More</Text>

            <TouchableOpacity style={styles.menuItem}>
              <Text style={styles.menuItemText}>About us</Text>
              <Text style={styles.arrowIcon}>›</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem}>
              <Text style={styles.menuItemText}>Privacy policy</Text>
              <Text style={styles.arrowIcon}>›</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem}>
              <Text style={styles.menuItemText}>Rate & Review</Text>
              <Text style={styles.arrowIcon}>›</Text>
            </TouchableOpacity>
          </View>

          {/* Logout Button */}
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutButtonText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172B',
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginBottom: 30,
  },
  backArrow: {
    fontSize: 56,
    color: '#ffffff',
    fontWeight: 'bold',
    marginRight: 10,
    marginBottom: 7
  },
  headerTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: '600',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#b0b0b0',
    marginBottom: 15,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,

  },
  menuItemText: {
    fontSize: 22,
    color: '#ffffff',
  },
  arrowIcon: {
    fontSize: 26,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  plusIcon: {
    fontSize: 24,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  logoutButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#ffffff',
    borderRadius: 25,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 30,
    width: '60%',
    alignSelf: 'center',
    marginHorizontal: 20,
  },
  logoutButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
  divider: {
    height: 1,
    backgroundColor: '#1E293B',
    marginVertical: 15,
  },
});
