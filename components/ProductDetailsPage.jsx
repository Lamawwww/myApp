import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image } from 'react-native';
import { useState } from 'react';
import Toast from 'react-native-toast-message';
import { useCart } from '../context/CartContext.jsx';

export default function ProductDetailsPage({ route, navigation }) {
  const { product } = route.params || {};
  const [isBookmarked, setIsBookmarked] = useState(false);
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product);
    Toast.show({
      type: 'success',
      text1: 'Added to Cart',
      text2: `${product.name} has been added to your cart`,
      position: 'top',
      visibilityTime: 2000,
    });
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{product?.name || 'Product Details'}</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Product Image */}
        <View style={styles.imageContainer}>
          <View style={styles.productImagePlaceholder}>
            <Text style={styles.placeholderText}>📷</Text>
          </View>
        </View>

        {/* Product Info */}
        <View style={styles.infoContainer}>
          <Text style={styles.productName}>{product?.name || 'Product Name'}</Text>
          
          {/* Rating */}
          <View style={styles.ratingContainer}>
            <Text style={styles.stars}>⭐⭐⭐⭐⭐</Text>
            <Text style={styles.ratingCount}>(108)</Text>
          </View>

          {/* Price */}
          <Text style={styles.price}>{product?.price || '₱ 0.00'}</Text>

          {/* Description */}
          <Text style={styles.description}>
            {product?.description || 'No description available.'}
          </Text>
        </View>
      </ScrollView>

      {/* Bottom Action Bar */}
      <View style={styles.bottomBar}>
        <TouchableOpacity 
          style={styles.bookmarkButton}
          onPress={() => setIsBookmarked(!isBookmarked)}
        >
          <Text style={styles.bookmarkIcon}>{isBookmarked ? '🔖' : '📑'}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.addToCartButton} onPress={handleAddToCart}>
          <Text style={styles.addToCartText}>Add to Cart</Text>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 50,
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
  },
  imageContainer: {
    alignItems: 'center',
    paddingVertical: 30,
  },
  productImagePlaceholder: {
    width: 250,
    height: 250,
    backgroundColor: '#1e3a5f',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: 80,
  },
  infoContainer: {
    paddingHorizontal: 30,
    paddingBottom: 100,
  },
  productName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 10,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  stars: {
    fontSize: 16,
    marginRight: 8,
  },
  ratingCount: {
    fontSize: 14,
    color: '#ffffff',
    fontWeight: '500',
  },
  price: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 20,
  },
  description: {
    fontSize: 14,
    color: '#b0b0b0',
    lineHeight: 22,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingVertical: 20,
    backgroundColor: '#0a1628',
    borderTopWidth: 1,
    borderTopColor: '#1e3a5f',
  },
  bookmarkButton: {
    width: 60,
    height: 60,
    backgroundColor: '#1e3a5f',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  bookmarkIcon: {
    fontSize: 28,
  },
  addToCartButton: {
    flex: 1,
    height: 60,
    backgroundColor: '#6b7fd7',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addToCartText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
  },
});
