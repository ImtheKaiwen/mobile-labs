import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import ProductCard from '../components/ProductCard';
import { useCart } from '../context/CartContext';
import { colors, radius, spacing } from '../theme';

export default function HomeScreen() {
  const router = useRouter();
  const { totalQuantity } = useCart();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  async function fetchProducts() {
    try {
      setLoading(true);
      setError('');
      const response = await fetch('https://dummyjson.com/products?limit=20');
      if (!response.ok) throw new Error('Ürünler alınamadı.');
      const data = await response.json();
      setProducts(data.products);
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'Beklenmeyen bir hata oluştu.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <SafeAreaView style={styles.container} edges={['bottom', 'left', 'right']}>
      <View style={styles.header}>
        <Text style={styles.title}>E-Ticaret Mağazam</Text>
        <Pressable
          style={styles.cartButton}
          onPress={() => router.push('/cart')}
          accessibilityLabel={`Sepetim, ${totalQuantity} ürün`}
        >
          <Ionicons name="bag-outline" size={20} color={colors.surface} />
          {totalQuantity > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{totalQuantity}</Text>
            </View>
          )}
        </Pressable>
      </View>
      {loading ? (
        <ActivityIndicator size="large" color={colors.text} style={styles.loading} />
      ) : error ? (
        <View style={styles.messageArea}>
          <Text style={styles.error}>{error}</Text>
          <Pressable style={styles.retryButton} onPress={fetchProducts}>
            <Text style={styles.buttonText}>Tekrar Dene</Text>
          </Pressable>
        </View>
      ) : (
        <FlatList
          data={products}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.list}
          ListEmptyComponent={<Text>Gösterilecek ürün bulunamadı.</Text>}
          renderItem={({ item }) => (
            <ProductCard product={item} onPress={() => router.push(`/product/${item.id}`)} />
          )}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: colors.background, flex: 1 },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.lg,
  },
  title: { color: colors.text, flex: 1, fontSize: 22, fontWeight: '750', letterSpacing: -0.4 },
  cartButton: {
    alignItems: 'center',
    backgroundColor: colors.text,
    borderRadius: radius.pill,
    height: 48,
    justifyContent: 'center',
    width: 48,
  },
  badge: {
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radius.pill,
    height: 18,
    justifyContent: 'center',
    minWidth: 18,
    position: 'absolute',
    right: -2,
    top: -2,
  },
  badgeText: { color: colors.text, fontSize: 10, fontWeight: '800', paddingHorizontal: 3 },
  buttonText: { color: colors.surface, fontWeight: '700' },
  list: { paddingBottom: spacing.xxl, paddingHorizontal: spacing.xl },
  loading: { flex: 1, justifyContent: 'center' },
  messageArea: { alignItems: 'center', marginHorizontal: spacing.xl, marginTop: 48 },
  error: { color: colors.text, lineHeight: 22, marginBottom: spacing.lg, textAlign: 'center' },
  retryButton: {
    alignItems: 'center',
    backgroundColor: colors.text,
    borderRadius: radius.md,
    justifyContent: 'center',
    minHeight: 48,
    paddingHorizontal: spacing.xxl,
  },
});
