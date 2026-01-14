import { StyleSheet, Text, View, TouchableOpacity, ScrollView, TextInput, SafeAreaView } from 'react-native';
import { useState } from 'react';
import { useCart } from '../context/CartContext.jsx';

export default function CartPage({ navigation }) {
  const { cartItems, removeFromCart, updateQuantity, promoCode, discount, applyPromoCode, getSubtotal } = useCart();
  const [promoInput, setPromoInput] = useState('');
  const [promoMessage, setPromoMessage] = useState('');
  const [isPromoValid, setIsPromoValid] = useState(false);

  const handlePromoChange = (text) => {
    setPromoInput(text);
    if (text) {
      const result = applyPromoCode(text);
      setPromoMessage(result.message);
      setIsPromoValid(result.success);
    } else {
      setPromoMessage('');
      setIsPromoValid(false);
      applyPromoCode('');
    }
  };

  const subtotal = getSubtotal();
  const deliveryFee = 500;
  const discountAmount = (subtotal * discount) / 100;
  const total = subtotal + deliveryFee - discountAmount;

  const handleCheckout = () => {
    navigation.navigate('Checkout');
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Text style={styles.backIcon}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>My Cart</Text>
          <View style={styles.headerSpacer} />
        </View>

        <View style={styles.content}>
          {cartItems.length === 0 ? (
            <View style={styles.emptyCart}>
              <Text style={styles.emptyCartText}>Your cart is empty</Text>
            </View>
          ) : (
            <>
              {/* Cart Items ScrollView */}
              <ScrollView style={styles.cartItemsContainer} showsVerticalScrollIndicator={false} contentContainerStyle={styles.cartItemsContent}>
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

                    <View style={styles.itemActions}>
                      <TouchableOpacity 
                        style={styles.removeButton}
                        onPress={() => removeFromCart(item.id)}
                      >
                        <Text style={styles.removeIcon}>✕</Text>
                      </TouchableOpacity>
                      
                      <View style={styles.quantityControls}>
                        <TouchableOpacity 
                          style={styles.quantityButton}
                          onPress={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <Text style={styles.quantityButtonText}>−</Text>
                        </TouchableOpacity>
                        
                        <Text style={styles.quantityText}>{item.quantity}</Text>
                        
                        <TouchableOpacity 
                          style={[styles.quantityButton, styles.quantityButtonPlus]}
                          onPress={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Text style={styles.quantityButtonTextPlus}>+</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                ))}
              </ScrollView>

              {/* Fixed Bottom Section */}
              <View style={styles.bottomSection}>
                {/* Promo Code */}
                <View style={styles.promoSection}>
                  <View style={styles.promoContainer}>
                    <TextInput
                      style={styles.promoInput}
                      placeholder="Enter promo code"
                      placeholderTextColor="#999"
                      value={promoInput}
                      onChangeText={handlePromoChange}
                    />
                    {promoMessage && (
                      <View style={styles.promoValidation}>
                        <Text style={[styles.promoMessageText, { color: isPromoValid ? '#4caf50' : '#f44336' }]}>
                          {promoMessage}
                        </Text>
                        {isPromoValid && <Text style={styles.checkIcon}>✓</Text>}
                      </View>
                    )}
                  </View>
                </View>

                {/* Summary */}
                <View style={styles.summary}>
                  <View style={styles.summaryRow}>
                    <Text style={styles.summaryLabel}>Subtotal:</Text>
                    <Text style={styles.summaryValue}>₱ {subtotal.toFixed(2)}</Text>
                  </View>
                  <View style={styles.summaryRow}>
                    <Text style={styles.summaryLabel}>Delivery Fee:</Text>
                    <Text style={styles.summaryValue}>₱ {deliveryFee.toFixed(2)}</Text>
                  </View>
                  {discount > 0 && (
                    <View style={styles.summaryRow}>
                      <Text style={styles.summaryLabel}>Discount:</Text>
                      <Text style={styles.summaryValue}>{discount}%</Text>
                    </View>
                  )}
                </View>

                {/* Checkout Button */}
                <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckout}>
                  <Text style={styles.checkoutButtonText}>Proceed to checkout</Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </View>
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
        <TouchableOpacity style={styles.navButton}>
          <View style={[styles.navIcon, styles.navIconActive]}>
            <Text style={styles.navIconTextActive}>🛒</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('Profile')}>
          <View style={styles.navIcon}>
            <Text style={styles.navIconText}>👤</Text>
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
  headerSpacer: {
    width: 40,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  cartItemsContainer: {
    maxHeight: 380,
  },
  cartItemsContent: {
    paddingBottom: 10,
  },
  bottomSection: {
    paddingBottom: 100,
  },
  emptyCart: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 100,
  },
  emptyCartText: {
    fontSize: 18,
    color: '#999',
  },
  cartItem: {
    flexDirection: 'row',
    backgroundColor: '#1e3a5f',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    alignItems: 'center',
  },
  itemImagePlaceholder: {
    width: 80,
    height: 80,
    backgroundColor: '#2a4a6f',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: 40,
  },
  itemDetails: {
    flex: 1,
    marginLeft: 15,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 4,
  },
  itemStorage: {
    fontSize: 12,
    color: '#999',
    marginBottom: 8,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  itemActions: {
    alignItems: 'flex-end',
  },
  removeButton: {
    marginBottom: 10,
    padding: 5,
  },
  removeIcon: {
    fontSize: 20,
    color: '#ffffff',
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    width: 30,
    height: 30,
    borderRadius: 5,
    backgroundColor: '#2a4a6f',
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityButtonPlus: {
    backgroundColor: '#6b7fd7',
  },
  quantityButtonText: {
    fontSize: 18,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  quantityButtonTextPlus: {
    fontSize: 18,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  quantityText: {
    fontSize: 16,
    marginBottom: 15,
    color: '#ffffff',
    marginHorizontal: 12,
    fontWeight: '600',
  },
  promoSection: {
    marginVertical: 20,
  },
  promoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#1e3a5f',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderWidth: 2,
    borderColor: '#2a4a6f',
  },
  promoInput: {
    flex: 1,
    color: '#ffffff',
    fontSize: 16,
    padding: 0,
  },
  promoValidation: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
  },
  promoMessageText: {
    fontSize: 14,
    fontWeight: '500',
    marginRight: 8,
  },
  checkIcon: {
    fontSize: 18,
    color: '#4caf50',
  },
  summary: {
    marginBottom: 20,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  summaryLabel: {
    fontSize: 16,
    color: '#b0b0b0',
  },
  summaryValue: {
    fontSize: 16,
    color: '#ffffff',
    fontWeight: '600',
  },
  checkoutButton: {
    backgroundColor: '#6b7fd7',
    borderRadius: 15,
    paddingVertical: 18,
    alignItems: 'center',
    marginBottom: 20,
  },
  checkoutButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
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
