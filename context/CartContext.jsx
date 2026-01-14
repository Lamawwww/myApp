import { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);

  const addToCart = (product) => {
    const existingItem = cartItems.find(item => item.id === product.id);
    
    if (existingItem) {
      setCartItems(cartItems.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId) => {
    setCartItems(cartItems.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
    } else {
      setCartItems(cartItems.map(item =>
        item.id === productId
          ? { ...item, quantity: newQuantity }
          : item
      ));
    }
  };

  const applyPromoCode = (code) => {
    setPromoCode(code);
    const upperCode = code.toUpperCase();
    
    // Check for valid promo codes
    if (upperCode === 'BKLNGNCLALTOP') {
      setDiscount(30);
      return { success: true, message: 'Valid promo code' };
    } else if (upperCode === 'ALLENKALBO') {
      setDiscount(20);
      return { success: true, message: 'Valid promo code' };
    } else if (upperCode === 'MSGYAT') {
      setDiscount(15);
      return { success: true, message: 'Valid promo code' };
    } else if (code) {
      setDiscount(0);
      return { success: false, message: 'Invalid promo code' };
    }
    setDiscount(0);
    return { success: false, message: '' };
  };

  const getSubtotal = () => {
    return cartItems.reduce((total, item) => {
      const price = parseFloat(item.price.replace(/[₱,]/g, ''));
      return total + (price * item.quantity);
    }, 0);
  };

  const getTotal = () => {
    const subtotal = getSubtotal();
    const deliveryFee = 500;
    const discountAmount = (subtotal * discount) / 100;
    return subtotal + deliveryFee - discountAmount;
  };

  const clearCart = () => {
    setCartItems([]);
    setPromoCode('');
    setDiscount(0);
  };

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      promoCode,
      discount,
      applyPromoCode,
      getSubtotal,
      getTotal,
      clearCart
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
