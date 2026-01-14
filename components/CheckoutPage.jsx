import { Image, StyleSheet, Text, View, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
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
      <SafeAreaView style={{ flex: 1 }}>

        {/* HEADER */}
        <View style={styles.header}>
          <Text style={styles.back} onPress={() => navigation.goBack()}>‹</Text>
          <Text style={styles.htitle}>Checkout</Text>

          <TouchableOpacity style={styles.cartButton}>
            <Image
              source={require('../assets/images/cart.png')}
              style={styles.cartImage}
            />
            {cartItems.length > 0 && (
              <View style={styles.cartBadge}>
                <Text style={styles.cartBadgeText}>{cartItems.length}</Text>
              </View>
            )}
          </TouchableOpacity>

        </View>

        {/* PRODUCTS */}
        <View style={{ maxHeight: 300 }}> {/* adjust height as needed */}
          <ScrollView
            contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 10 }}
            showsVerticalScrollIndicator={true}
          >
            {cartItems.map(item => (
              <View key={item.id} style={styles.productCard}>
                <View style={styles.itemImagePlaceholder}>
                  <Text style={{ fontSize: 28 }}>🎮</Text>
                </View>

                <View style={styles.productInfo}>
                  <Text style={styles.productName}>{item.name}</Text>
                  <Text style={styles.productSub}>
                    {item.category === 'Playstation' ? '2TB' : item.category === 'Xbox' ? '4GB' : '32GB'}
                  </Text>
                  <Text style={styles.price}>₱ {item.price}</Text>
                </View>

                <Text style={styles.qty}>x{item.quantity}</Text>
              </View>
            ))}
          </ScrollView>
        </View>


        {/* DETAILS CARD */}
        <View style={styles.detailsCard}>

          {/* Delivery */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Delivery Address</Text>
              <Text style={styles.arrow}>›</Text>
            </View>

            <View style={styles.rowCard}>
              <Image source={require('../assets/images/location.png')} style={styles.icon} />
              <View style={{ flex: 1 }}>
                <Text style={styles.title}>Julio Dela Cruz St, Makati</Text>
                <Text style={styles.sub}>Makati</Text>
              </View>
              <View style={styles.check}><Text style={{ color: '#fff' }}>✓</Text></View>
            </View>
          </View>

          {/* Payment */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Payment Method</Text>
              <Text style={styles.arrow}>›</Text>
            </View>

            <View style={styles.rowCard}>
              <Image source={require('../assets/images/gcash.png')} style={styles.icon} />
              <View style={{ flex: 1 }}>
                <Text style={styles.title}>GCash</Text>
                <Text style={styles.sub}>**** 7890</Text>
              </View>
              <View style={styles.check}><Text style={{ color: '#fff' }}>✓</Text></View>
            </View>
          </View>

          {/* Order Info */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Order Info</Text>

            <View style={styles.infoRow}>
              <Text style={styles.label}>Subtotal</Text>
              <Text style={styles.value}>₱ {subtotal.toFixed(2)}</Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.label}>Delivery Fee</Text>
              <Text style={styles.value}>₱ {deliveryFee.toFixed(2)}</Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.label}>Discount</Text>
              <Text style={styles.value}>{discount}%</Text>
            </View>
          </View>
        </View>

        {/* BOTTOM BAR */}
        <View style={styles.bottomBar}>
          <View>
            <Text style={styles.total}>
              Total: ₱ {total.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            </Text>
            <Text style={styles.saved}>
              Saved: ₱ {saved.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            </Text>
          </View>

          <TouchableOpacity style={styles.orderBtn} onPress={handlePlaceOrder}>
            <Text style={styles.orderText}>Place Order</Text>
          </TouchableOpacity>
        </View>

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
    paddingTop: 20,
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

  cartItem: {
    flexDirection: 'row',
    backgroundColor: '#1b2a47',
    borderRadius: 16,
    padding: 14,
    marginBottom: 14,
    alignItems: 'center',

    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 6,
  },

  itemImagePlaceholder: {
    width: 60,
    height: 60,
    backgroundColor: '#243a5e',
    borderRadius: 12,
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
    fontSize: 15,
    fontWeight: '600',
    color: '#ffffff',
  },

  itemStorage: {
    fontSize: 11,
    color: '#9aa4c7',
    marginTop: 2,
  },

  itemPrice: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ffffff',
    marginTop: 4,
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
    backgroundColor: '#1b2a47',
    borderRadius: 16,
    padding: 14,
  },
  iconContainer: {
    width: 42,
    height: 42,
    backgroundColor: '#2c3e6e',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
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
    backgroundColor: '#1b2a47',
    borderRadius: 16,
    padding: 14,
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
  back: {
   fontSize: 56,
    color: '#ffffff',
    fontWeight: 'bold',
    marginRight: 10,
    marginBottom: 7
  },

  itemImagePlaceholder: {
    width: 70,
    height: 70,
    backgroundColor: '#243a5e',
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },

  qty: {
    color: '#6b7fd7',
    fontWeight: '600',
  },

detailsCard: {
  backgroundColor: '#1D293D',
  borderTopLeftRadius: 24,
  borderTopRightRadius: 24,
  padding: 24,
  paddingBottom: 16, // smaller bottom padding to connect with bottomBar
  borderBottomLeftRadius: 0,   // flat bottom
  borderBottomRightRadius: 0,
    // flat bottom
},

  rowCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#223252',
    borderRadius: 14,
    padding: 14,
  },
  htitle: {
    flex: 1,
    textAlign: 'center',
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
    
  },
  cartIcon: {
    paddingTop: 4,
    position: 'relative',
  },
  productCard: {
    flexDirection: 'row',
    backgroundColor: '#1b2a47',
    borderRadius: 18,
    padding: 20,
    marginBottom: 10,
    alignItems: 'center',
    height: 100,
  },

  productEmoji: {
    fontSize: 34,
    marginRight: 14,
  },

  productName: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
    paddingLeft: 20,
  },

  productSub: {
    color: '#9aa4c7',
    fontSize: 12,
    marginVertical: 2,
    paddingLeft: 20,
    paddingBottom: 10,
  },

  price: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    paddingLeft: 20,
  },
  arrow: {
    color: '#fff',
    fontSize: 18,
  },

  infoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1b2a47',
    borderRadius: 16,
    padding: 14,
    marginBottom: 14,
  },

  icon: {
    fontSize: 20,
    marginRight: 12,
  },

  infoTitle: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },

  infoSub: {
    color: '#9aa4c7',
    fontSize: 11,
  },

  check: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#4caf50',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
    fontWeight: '700',
  },

  orderCard: {
    backgroundColor: '#1b2a47',
    borderRadius: 18,
    padding: 18,
    marginTop: 10,
  },

  orderTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },

  rowLabel: {
    color: '#9aa4c7',
    fontSize: 14,
  },

  rowValue: {
    color: '#fff',
    fontSize: 14,
  },

  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#1b2a47',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 18,
  },

  total: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },

  saved: {
    color: '#4caf50',
    fontSize: 13,
    marginTop: 2,
  },

  orderBtn: {
    backgroundColor: '#6b7fd7',
    paddingHorizontal: 26,
    paddingVertical: 14,
    borderRadius: 14,
  },

  orderText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
  },
  productInfo: {
    flex: 1,
    justifyContent: 'space-between',
  },
  section: {
    marginBottom: 10,
  },
  sectionTitle: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 20,
  },

  rowCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1D293D',
    borderRadius: 14,
    padding: 14,
  },

  infoRow: {
    padding: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  label: {
    color: '#9aa4c7',
    fontSize: 14,
  },

  value: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '500',

  },
  title: {
    flex: 1,
    textAlign: 'left',
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
  },
  sub: {
    color: '#9aa4c7',
    fontSize: 12,
    marginTop: 4,
  },

});
