import { StyleSheet, Text, View, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import Toast from 'react-native-toast-message';
import { useCart } from '../context/CartContext.jsx';

export default function CheckoutPage({ navigation }) {
  const { cartItems, getSubtotal, discount } = useCart();

  const subtotal = getSubtotal();
  const deliveryFee = 500;
  const discountAmount = (subtotal * discount) / 100;
  const total = subtotal + deliveryFee - discountAmount;
  const saved = discountAmount;
  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handlePlaceOrder = () => {
    Toast.show({
      type: 'success',
      text1: 'Order Placed!',
      text2: 'Your order has been successfully placed',
      position: 'top',
      visibilityTime: 3000,
    });
    
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Text style={styles.backIcon}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Checkout</Text>
          <TouchableOpacity style={styles.cartButton}>
            <Text style={styles.cartIcon}>🛒</Text>
            {cartItems.length > 0 && (
              <View style={styles.cartBadge}>
                <Text style={styles.cartBadgeText}>{cartItems.length}</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false} contentContainerStyle={styles.contentContainer}>
          {/* Cart Items */}
          <View style={styles.section}>
            <View style={styles.itemsHeader}>
              <Text style={styles.itemsCountText}>{cartItems.length} {cartItems.length === 1 ? 'Item' : 'Items'} in Checkout ({totalQuantity} {totalQuantity === 1 ? 'piece' : 'pieces'})</Text>
            </View>
            <ScrollView 
              style={[styles.cartItemsContainer, cartItems.length > 3 && styles.cartItemsScrollable]}
              scrollEnabled={cartItems.length > 3}
              showsVerticalScrollIndicator={cartItems.length > 3}
            >
              {cartItems.map((item) => (
                <View key={item.id} style={styles.cartItem}>
                  <View style={styles.itemImagePlaceholder}>
                    <Text style={styles.placeholderText}>📷</Text>
                  </View>
                  
                  <View style={styles.itemDetails}>
                    <Text style={styles.itemName}>{item.name}</Text>
                    <Text style={styles.itemStorage}>
                      {item.category === 'Playstation' ? '2TB' : item.category === 'Xbox' ? '4GB' : '32GB'}
                    </Text>
                    <Text style={styles.itemPrice}>{item.price}</Text>
                  </View>

                  <View style={styles.itemQuantity}>
                    <Text style={styles.itemQuantityText}>x{item.quantity}</Text>
                  </View>
                </View>
              ))}
            </ScrollView>
          </View>

          {/* Delivery Address */}
          <TouchableOpacity style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Delivery Address</Text>
              <Text style={styles.arrowIcon}>›</Text>
            </View>
            <View style={styles.addressCard}>
              <View style={styles.iconContainer}>
                <Text style={styles.locationIcon}>📍</Text>
              </View>
              <View style={styles.addressInfo}>
                <Text style={styles.addressStreet}>Julio Dela Cruz St, Makati</Text>
                <Text style={styles.addressCity}>Makati</Text>
              </View>
              <View style={styles.checkmarkContainer}>
                <Text style={styles.checkmark}>✓</Text>
              </View>
            </View>
          </TouchableOpacity>

          {/* Payment Method */}
          <TouchableOpacity style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Payment Method</Text>
              <Text style={styles.arrowIcon}>›</Text>
            </View>
            <View style={styles.paymentCard}>
              <View style={styles.iconContainer}>
                <Text style={styles.cardIcon}>💳</Text>
              </View>
              <View style={styles.paymentInfo}>
                <Text style={styles.cardName}>MMMM</Text>
                <Text style={styles.cardNumber}>**** 7890</Text>
              </View>
              <View style={styles.checkmarkContainer}>
                <Text style={styles.checkmark}>✓</Text>
              </View>
            </View>
          </TouchableOpacity>

          {/* Order Info */}
          <View style={styles.orderInfoSection}>
            <Text style={styles.orderInfoTitle}>Order Info</Text>
            
            <View style={styles.orderInfoRow}>
              <Text style={styles.orderInfoLabel}>Subtotal</Text>
              <Text style={styles.orderInfoValue}>₱ {subtotal.toFixed(2)}</Text>
            </View>
            
            <View style={styles.orderInfoRow}>
              <Text style={styles.orderInfoLabel}>Delivery Fee</Text>
              <Text style={styles.orderInfoValue}>₱ {deliveryFee.toFixed(2)}</Text>
            </View>
            
            <View style={styles.orderInfoRow}>
              <Text style={styles.orderInfoLabel}>Discount</Text>
              <Text style={styles.orderInfoValue}>{discount}%</Text>
            </View>

            <View style={styles.totalSection}>
              <View>
                <Text style={styles.totalLabel}>Total: <Text style={styles.totalValue}>₱ {total.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Text></Text>
                <Text style={styles.savedText}>Saved: ₱ {saved.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Text>
              </View>
              <TouchableOpacity style={styles.placeOrderButton} onPress={handlePlaceOrder}>
                <Text style={styles.placeOrderText}>Place Order</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Bottom padding */}
          <View style={styles.bottomPadding} />
        </ScrollView>
      </SafeAreaView>
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
  cartButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  cartIcon: {
    fontSize: 24,
  },
  cartBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: '#ff4444',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  cartBadgeText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  section: {
    marginBottom: 12,
  },
  itemsHeader: {
    marginBottom: 10,
  },
  itemsCountText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ffffff',
  },
  cartItemsContainer: {
  },
  cartItemsScrollable: {
    maxHeight: 210,
  },
  cartItem: {
    flexDirection: 'row',
    backgroundColor: '#1e3a5f',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    alignItems: 'center',
  },
  itemImagePlaceholder: {
    width: 50,
    height: 50,
    backgroundColor: '#2a4a6f',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: 25,
  },
  itemDetails: {
    flex: 1,
    marginLeft: 10,
  },
  itemName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 2,
  },
  itemStorage: {
    fontSize: 10,
    color: '#999',
    marginBottom: 4,
  },
  itemPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  itemQuantity: {
    marginLeft: 10,
    justifyContent: 'center',
  },
  itemQuantityText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6b7fd7',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#ffffff',
  },
  arrowIcon: {
    fontSize: 18,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  addressCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1e3a5f',
    borderRadius: 10,
    padding: 8,
  },
  iconContainer: {
    width: 35,
    height: 35,
    backgroundColor: '#ff8c66',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  locationIcon: {
    fontSize: 18,
  },
  addressInfo: {
    flex: 1,
  },
  addressStreet: {
    fontSize: 13,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 1,
  },
  addressCity: {
    fontSize: 11,
    color: '#999',
  },
  checkmarkContainer: {
    width: 20,
    height: 20,
    backgroundColor: '#4caf50',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmark: {
    fontSize: 12,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  paymentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1e3a5f',
    borderRadius: 10,
    padding: 8,
  },
  cardIcon: {
    fontSize: 18,
  },
  paymentInfo: {
    flex: 1,
  },
  cardName: {
    fontSize: 13,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 1,
  },
  cardNumber: {
    fontSize: 11,
    color: '#999',
  },
  orderInfoSection: {
    backgroundColor: '#1e3a5f',
    borderRadius: 15,
    padding: 20,
    marginTop: 40,
  },
  orderInfoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 15,
  },
  orderInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  orderInfoLabel: {
    fontSize: 15,
    color: '#b0b0b0',
  },
  orderInfoValue: {
    fontSize: 15,
    color: '#ffffff',
    fontWeight: '500',
  },
  totalSection: {
    marginTop: 15,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#2a4a6f',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#b0b0b0',
  },
  totalValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  savedText: {
    fontSize: 14,
    color: '#4caf50',
    marginTop: 4,
  },
  placeOrderButton: {
    backgroundColor: '#6b7fd7',
    borderRadius: 12,
    paddingHorizontal: 28,
    paddingVertical: 14,
  },
  placeOrderText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
  bottomPadding: {
    height: 20,
  },
});
