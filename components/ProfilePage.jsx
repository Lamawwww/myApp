import { StyleSheet, Text, View, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { useAuth } from '../context/AuthContext.jsx';

export default function ProfilePage({ navigation }) {
  const { user } = useAuth();

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Text style={styles.backIcon}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Profile</Text>
          <TouchableOpacity style={styles.settingsButton} onPress={() => navigation.navigate('Settings')}>
            <Text style={styles.settingsIcon}>⚙️</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false} contentContainerStyle={styles.contentContainer}>
          {/* Profile Section */}
          <View style={styles.profileSection}>
            <View style={styles.profileImageContainer}>
              <View style={styles.profileImage}>
                <Text style={styles.profileImageText}>👤</Text>
              </View>
              <TouchableOpacity style={styles.cameraButton}>
                <Text style={styles.cameraIcon}>📷</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.username}>{user?.email?.split('@')[0] || 'Username'}</Text>
          </View>

          {/* Stats Cards */}
          <View style={styles.statsContainer}>
            <View style={styles.statCard}>
              <Text style={styles.statLabel}>Balance</Text>
              <Text style={styles.statValue}>₱ 00.00</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statLabel}>Orders</Text>
              <Text style={styles.statValue}>3</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statLabel}>Total Spent</Text>
              <Text style={styles.statValue}>₱ 50,113</Text>
            </View>
          </View>

          {/* My Orders Section */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>My Orders</Text>
              <TouchableOpacity>
                <Text style={styles.viewAllText}>View All Orders ›</Text>
              </TouchableOpacity>
            </View>
            
            <View style={styles.ordersGrid}>
              <TouchableOpacity style={styles.orderItem}>
                <View style={styles.orderIcon}>
                  <Text style={styles.orderIconText}>💳</Text>
                </View>
                <Text style={styles.orderLabel}>To Pay</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.orderItem}>
                <View style={styles.orderIcon}>
                  <Text style={styles.orderIconText}>📦</Text>
                </View>
                <Text style={styles.orderLabel}>To Ship</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.orderItem}>
                <View style={styles.orderIcon}>
                  <Text style={styles.orderIconText}>🚚</Text>
                </View>
                <Text style={styles.orderLabel}>To Receive</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.orderItem}>
                <View style={styles.orderIcon}>
                  <Text style={styles.orderIconText}>✍️</Text>
                </View>
                <Text style={styles.orderLabel}>To Review</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.orderItem}>
                <View style={styles.orderIcon}>
                  <Text style={styles.orderIconText}>↩️</Text>
                </View>
                <Text style={styles.orderLabel}>Returns &{'\n'}Cancellations</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Support Section */}
          <View style={styles.section}>
            <View style={styles.sectionHeaderSimple}>
              <Text style={styles.sectionTitle}>Support</Text>
              <Text style={styles.supportIcon}>🛠️</Text>
            </View>

            <TouchableOpacity style={styles.supportItem}>
              <View style={styles.supportLeft}>
                <View style={styles.supportIconContainer}>
                  <Text style={styles.supportItemIcon}>❓</Text>
                </View>
                <Text style={styles.supportItemText}>Help Center</Text>
              </View>
              <Text style={styles.arrowIcon}>›</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.supportItem}>
              <View style={styles.supportLeft}>
                <View style={styles.supportIconContainer}>
                  <Text style={styles.supportItemIcon}>🎧</Text>
                </View>
                <Text style={styles.supportItemText}>Chat with Play MI</Text>
              </View>
              <Text style={styles.arrowIcon}>›</Text>
            </TouchableOpacity>
          </View>

          {/* Bottom padding */}
          <View style={styles.bottomPadding} />
        </ScrollView>
      </SafeAreaView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('Home')}>
          <View style={styles.navIcon}>
            <Text style={styles.navIconText}>🏠</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton}>
          <View style={styles.navIcon}>
            <Text style={styles.navIconText}>🔍</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('Cart')}>
          <View style={styles.navIcon}>
            <Text style={styles.navIconText}>🛒</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton}>
          <View style={[styles.navIcon, styles.navIconActive]}>
            <Text style={styles.navIconTextActive}>👤</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a1628',
  },
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backIcon: {
    fontSize: 32,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
    flex: 1,
    textAlign: 'center',
  },
  settingsButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  settingsIcon: {
    fontSize: 24,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 25,
  },
  profileImageContainer: {
    position: 'relative',
    marginBottom: 15,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#6b7fd7',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#8ed9d4',
  },
  profileImageText: {
    fontSize: 50,
  },
  cameraButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#8ed9d4',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#0a1628',
  },
  cameraIcon: {
    fontSize: 16,
  },
  username: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 25,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#1e3a5f',
    borderRadius: 12,
    padding: 15,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 12,
    color: '#b0b0b0',
    marginBottom: 8,
  },
  statValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  section: {
    marginBottom: 25,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionHeaderSimple: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
    flex: 1,
  },
  supportIcon: {
    fontSize: 20,
  },
  viewAllText: {
    fontSize: 14,
    color: '#6b7fd7',
    fontWeight: '500',
  },
  ordersGrid: {
    flexDirection: 'row',
    backgroundColor: '#1e3a5f',
    borderRadius: 12,
    padding: 15,
    justifyContent: 'space-around',
  },
  orderItem: {
    alignItems: 'center',
    width: 55,
  },
  orderIcon: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: '#2a4a6f',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  orderIconText: {
    fontSize: 24,
  },
  orderLabel: {
    fontSize: 10,
    color: '#ffffff',
    textAlign: 'center',
    lineHeight: 12,
  },
  supportItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1e3a5f',
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
  },
  supportLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  supportIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#2a4a6f',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  supportItemIcon: {
    fontSize: 20,
  },
  supportItemText: {
    fontSize: 16,
    color: '#ffffff',
    fontWeight: '500',
  },
  arrowIcon: {
    fontSize: 24,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  bottomPadding: {
    height: 20,
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#0a1628',
    paddingVertical: 12,
    paddingBottom: 20,
    borderTopWidth: 1,
    borderTopColor: '#1e3a5f',
  },
  navButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  navIcon: {
    width: 55,
    height: 55,
    borderRadius: 28,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  navIconActive: {
    backgroundColor: '#6b7fd7',
  },
  navIconText: {
    fontSize: 26,
  },
  navIconTextActive: {
    fontSize: 26,
  },
});
