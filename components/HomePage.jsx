import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, Image, SafeAreaView } from 'react-native';
import { useState } from 'react';

export default function HomePage({ navigation }) {
  const [selectedCategory, setSelectedCategory] = useState('All items');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All items', 'Nintendo', 'Xbox', 'Playstation'];

  const products = [
    { 
      id: 1, 
      name: 'PlayStation 5 Pro', 
      price: '₱ 44,385.00', 
      category: 'Playstation',
      description: 'The PlayStation®5 Pro delivers next-level performance with enhanced graphics, faster load times, and smoother gameplay. Enjoy stunning visuals, advanced ray tracing, and immersive 4k gaming powered by upgraded hardware, making it ideal for players who want the best PlayStation experience.'
    },
    { 
      id: 2, 
      name: 'Nintendo Switch v1', 
      price: '₱10,400.00', 
      category: 'Nintendo',
      description: 'The original Nintendo Switch offers the flexibility to play at home or on the go. With its innovative design, you can seamlessly transition between TV mode, tabletop mode, and handheld mode. Perfect for gaming anywhere with friends and family.'
    },
    { 
      id: 3, 
      name: 'Nintendo Switch v2', 
      price: '₱19,600.00', 
      category: 'Nintendo',
      description: 'The updated Nintendo Switch features improved battery life for extended gaming sessions and enhanced performance. Experience your favorite Nintendo games with better portability and longer playtime, making it the perfect companion for on-the-go gaming.'
    },
    { 
      id: 4, 
      name: 'Xbox 360 S Slim', 
      price: '₱7,105.00', 
      category: 'Xbox',
      description: 'The Xbox 360 S Slim features a sleek, compact design with built-in Wi-Fi and a quieter operation. Enjoy a vast library of classic games with improved cooling and reliability. A great entry point for retro gaming enthusiasts.'
    },
  ];

  const filteredProducts = selectedCategory === 'All items' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.logo}>Play Mi</Text>
        <View style={styles.profilePic}>
          <View style={styles.profileInner} />
        </View>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Text style={styles.searchIcon}>🔍</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Search here"
          placeholderTextColor="#999"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Category Buttons */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.categoryScroll}
      >
        <View style={styles.categoryContainer}>
          {categories.map((category) => (
            <TouchableOpacity
              key={category}
              style={[
                styles.categoryButton,
                selectedCategory === category && styles.categoryButtonActive
              ]}
              onPress={() => setSelectedCategory(category)}
            >
              <Text style={[
                styles.categoryText,
                selectedCategory === category && styles.categoryTextActive
              ]}>
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Products Grid */}
      <ScrollView 
        style={styles.productsScroll} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <Text style={styles.sectionTitle}>{selectedCategory}</Text>
        <View style={styles.productsGrid}>
          {filteredProducts.map((product) => (
            <TouchableOpacity 
              key={product.id} 
              style={styles.productCard}
              onPress={() => navigation.navigate('ProductDetails', { product })}
            >
              <View style={styles.productImagePlaceholder}>
                <Text style={styles.placeholderText}>📷</Text>
              </View>
              <View style={styles.productInfo}>
                <Text style={styles.productName}>{product.name}</Text>
                <Text style={styles.productPrice}>{product.price}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navButton}>
          <View style={[styles.navIcon, styles.navIconActive]}>
            <Text style={styles.navIconTextActive}>🏠</Text>
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
        <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('Profile')}>
          <View style={styles.navIcon}>
            <Text style={styles.navIconText}>👤</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a1628',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },
  logo: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#ffffff',
    textShadowColor: 'rgba(255, 255, 255, 0.3)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  profilePic: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  profileInner: {
    width: '100%',
    height: '100%',
    backgroundColor: '#d0d0d0',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#ffffff',
    borderRadius: 10,
    marginHorizontal: 20,
    marginBottom: 20,
    paddingHorizontal: 15,
    height: 50,
  },
  searchIcon: {
    fontSize: 18,
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    color: '#ffffff',
    fontSize: 16,
  },
  categoryScroll: {
    maxHeight: 50,
    marginBottom: 20,
  },
  categoryContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 10,
  },
  categoryButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#1e3a5f',
    marginRight: 10,
  },
  categoryButtonActive: {
    backgroundColor: '#6b7fd7',
  },
  categoryText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '500',
  },
  categoryTextActive: {
    color: '#ffffff',
    fontWeight: '600',
  },
  productsScroll: {
    flex: 1,
    paddingHorizontal: 20,
  },
  scrollContent: {
    paddingBottom: 120,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 20,
  },
  productsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  productCard: {
    width: '48%',
    backgroundColor: '#0a1628',
    borderRadius: 15,
    marginBottom: 15,
    borderWidth: 3,
    borderColor: '#6b7fd7',
    overflow: 'hidden',
  },
  productImagePlaceholder: {
    width: '100%',
    height: 140,
    backgroundColor: '#1e3a5f',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: 50,
  },
  productInfo: {
    padding: 12,
  },
  productName: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 5,
  },
  productPrice: {
    color: '#ffffff',
    fontSize: 16,
    fontht: 20,
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
