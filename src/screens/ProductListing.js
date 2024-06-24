import React, { useState, useEffect, useContext } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemeContext } from '../components/ThemeContext';

const ProductListScreen = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const { isDarkMode } = useContext(ThemeContext);

  useEffect(() => {
    fetchProducts();
    loadWishlist();
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadWishlist();
    });
    return unsubscribe;
  }, [navigation]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('https://dummyjson.com/products/category/smartphones');
      setProducts(response.data.products);
    } catch (error) {
      console.error(error);
    }
  };

  const loadWishlist = async () => {
    try {
      const savedWishlist = await AsyncStorage.getItem('wishlist');
      if (savedWishlist) {
        setWishlist(JSON.parse(savedWishlist));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const toggleWishlist = async (product) => {
    let newWishlist = [];
    if (wishlist.includes(product.id)) {
      newWishlist = wishlist.filter((id) => id !== product.id);
    } else {
      newWishlist = [...wishlist, product.id];
    }
    setWishlist(newWishlist);
    await AsyncStorage.setItem('wishlist', JSON.stringify(newWishlist));
  };

  const renderProduct = ({ item }) => {
    const isWished = wishlist.includes(item.id);
    return (
      <View style={[styles.productContainer, { backgroundColor: isDarkMode ? '#31363F' : '#fff' }]}>
        <Image source={{ uri: item.thumbnail }} style={styles.productImage} />
        <View style={styles.productDetails}>
          <Text style={[styles.productTitle, { color: isDarkMode ? '#fff' : '#000' }]}>{item.title}</Text>
          <TouchableOpacity onPress={() => toggleWishlist(item)}>
            {isWished ? (
              <Icon name="heart" size={30} color="#EF4B4B" />
            ) : (
              <Icon name="heart-outline" size={30} color="#EF4B4B" />
            )}
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
        showsVerticalScrollIndicator={false}
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

export default ProductListScreen;
