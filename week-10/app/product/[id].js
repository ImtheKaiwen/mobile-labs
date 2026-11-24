import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useCart } from '../../context/CartContext';
import { colors, radius, spacing } from '../../theme';

export default function ProductDetailsScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchProduct() {
      try {
        const response = await fetch(`https://dummyjson.com/products/${id}`);
        if (!response.ok) throw new Error('Ürün detayı alınamadı.');
        setProduct(await response.json());
      } catch (requestError) {
        setError(requestError instanceof Error ? requestError.message : 'Beklenmeyen bir hata oluştu.');
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [id]);

  if (loading) return <ActivityIndicator size="large" style={styles.loading} />;
  if (error) return <Text style={styles.error}>{error}</Text>;

  return (
    <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: product.thumbnail }} style={styles.image} resizeMode="contain" />
      </View>
      <View style={styles.details}>
        <Text style={styles.title}>{product.title}</Text>
        <Text style={styles.price}>${product.price.toFixed(2)}</Text>
        <View style={styles.divider} />
        <Text style={styles.sectionTitle}>Açıklama</Text>
        <Text style={styles.description}>{product.description}</Text>
        <View style={styles.ratingRow}>
          <Ionicons name="star" size={16} color={colors.text} />
          <Text style={styles.rating}>{product.rating} puan</Text>
        </View>
      </View>
      <Pressable
        style={styles.button}
        onPress={() => {
          addToCart(product);
          router.push('/cart');
        }}
      >
        <Text style={styles.buttonText}>Sepete Ekle</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: colors.background, padding: spacing.xl, paddingBottom: 40 },
  imageContainer: {
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radius.lg,
    borderWidth: 1,
    height: 300,
    justifyContent: 'center',
    marginBottom: spacing.xxl,
  },
  image: { height: 270, width: '90%' },
  details: { marginBottom: spacing.xxl },
  title: { color: colors.text, fontSize: 26, fontWeight: '750', letterSpacing: -0.5, lineHeight: 34, marginBottom: spacing.sm },
  price: { color: colors.text, fontSize: 22, fontWeight: '750', marginBottom: spacing.xl },
  divider: { backgroundColor: colors.border, height: 1, marginBottom: spacing.xl },
  sectionTitle: { color: colors.text, fontSize: 15, fontWeight: '700', marginBottom: spacing.sm },
  description: { color: colors.secondaryText, fontSize: 16, lineHeight: 24, marginBottom: spacing.lg },
  ratingRow: { alignItems: 'center', flexDirection: 'row', gap: spacing.sm },
  rating: { color: colors.secondaryText, fontSize: 14, fontWeight: '600' },
  button: {
    alignItems: 'center',
    backgroundColor: colors.text,
    borderRadius: radius.md,
    flexDirection: 'row',
    justifyContent: 'center',
    minHeight: 54,
  },
  buttonText: { color: colors.surface, fontSize: 16, fontWeight: '700' },
  loading: { flex: 1 },
  error: { color: colors.text, padding: 20, textAlign: 'center' },
});
