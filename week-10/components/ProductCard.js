import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, radius, spacing } from '../theme';

export default function ProductCard({ product, onPress }) {
  return (
    <Pressable style={styles.card} onPress={onPress}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: product.thumbnail }} style={styles.image} resizeMode="contain" />
      </View>
      <View style={styles.details}>
        <View style={styles.textArea}>
          <Text style={styles.title} numberOfLines={2}>{product.title}</Text>
          <Text style={styles.price}>${product.price.toFixed(2)}</Text>
        </View>
        <View style={styles.arrowContainer}>
          <Ionicons name="chevron-forward" size={18} color={colors.text} />
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radius.lg,
    borderWidth: 1,
    flexDirection: 'row',
    marginBottom: spacing.md,
    padding: spacing.md,
  },
  imageContainer: {
    alignItems: 'center',
    backgroundColor: colors.muted,
    borderRadius: radius.md,
    height: 96,
    justifyContent: 'center',
    marginRight: spacing.lg,
    width: 96,
  },
  image: { height: 84, width: 84 },
  details: { alignItems: 'center', flex: 1, flexDirection: 'row' },
  textArea: { flex: 1, paddingRight: spacing.sm },
  title: { color: colors.text, fontSize: 16, fontWeight: '650', lineHeight: 22, marginBottom: spacing.sm },
  price: { color: colors.text, fontSize: 17, fontWeight: '700' },
  arrowContainer: {
    alignItems: 'center',
    borderColor: colors.border,
    borderRadius: radius.pill,
    borderWidth: 1,
    height: 36,
    justifyContent: 'center',
    width: 36,
  },
});
