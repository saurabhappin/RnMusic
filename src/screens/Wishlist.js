// screens/WishlistScreen.js
import React, { useState, useEffect, useContext } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Icon from 'react-native-vector-icons/Ionicons';
import { ThemeContext } from '../components/ThemeContext';

const WishlistScreen = ({ navigation }) => {
  const [wishlist, setWishlist] = useState([]);
  const [products, setProducts] = useState([]);
  const { isDarkMode } = useContext(ThemeContext);

  useEffect(() => {
    loadWishlist();
  }, []);

  const loadWishlist = async () => {
    try {
      const savedWishlist = await AsyncStorage.getItem('wishlist');
      if (savedWishlist) {
        const wishlistIds = JSON.parse(savedWishlist);
        const response = await axios.get('https://dummyjson.com/products/category/smartphones');
        const allProducts = response.data.products;
        const wishlistProducts = allProducts.filter(product => wishlistIds.includes(product.id));
        setProducts(wishlistProducts);
        setWishlist(wishlistIds);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const toggleWishlist = async (product) => {
    let newWishlist = wishlist.filter((id) => id !== product.id);
    setWishlist(newWishlist);
    setProducts(products.filter(item => item.id !== product.id));
    await AsyncStorage.setItem('wishlist', JSON.stringify(newWishlist));
  };

  const renderProduct = ({ item }) => {
    return (
      <View style={[styles.productContainer, { backgroundColor: isDarkMode ? '#31363F' : '#fff' }]}>
        <Image source={{ uri: item.thumbnail }} style={styles.productImage} />
        <View style={styles.productDetails}>
          <Text style={[styles.productTitle, { color: isDarkMode ? '#fff' : '#000' }]}>{item.title}</Text>
          <TouchableOpacity onPress={() => toggleWishlist(item)}>
            <Icon name="heart" size={30} color="#EF4B4B" />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? '#222831' : '#fff' }]}>
      <FlatList
        data={products}
        renderItem={renderProduct}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        contentContainerStyle={styles.flatList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  flatList: {
    paddingTop: 16,
  },
  productContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 16,
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
    marginHorizontal: 8,
  },
  productImage: {
    width: 120,
    height: 120,
    marginBottom: 8,
    borderRadius: 8,
  },
  productDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  productTitle: {
    flex: 1,
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  wishlistIcon: {
    width: 50,
    height: 50,
  },
});

export default WishlistScreen;
