import React from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useCart } from '../context/CartContext';
import { colors, radius, spacing } from '../theme';

export default function CartScreen() {
  const router = useRouter();
  const { cart, totalPrice, changeQuantity, removeFromCart } = useCart();

  return (
    <View style={styles.container}>
      <FlatList
        data={cart}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={cart.length === 0 ? styles.emptyList : styles.list}
        ListEmptyComponent={
          <View style={styles.emptyArea}>
            <View style={styles.emptyIcon}>
              <Ionicons name="bag-outline" size={28} color={colors.text} />
            </View>
            <Text style={styles.emptyText}>Sepetiniz boş.</Text>
            <Pressable style={styles.button} onPress={() => router.replace('/')}>
              <Ionicons name="arrow-back" size={18} color={colors.surface} />
              <Text style={styles.buttonText}>Ürünlere Git</Text>
            </Pressable>
          </View>
        }
        renderItem={({ item }) => (
          <View style={styles.row}>
            <View style={styles.info}>
              <Text style={styles.title} numberOfLines={2}>{item.title}</Text>
              <Text>${(item.price * item.quantity).toFixed(2)}</Text>
            </View>
            <View style={styles.actions}>
              <Pressable onPress={() => changeQuantity(item.id, -1)} style={styles.smallButton}>
                <Ionicons name="remove" size={16} color={colors.text} />
              </Pressable>
              <Text style={styles.quantity}>{item.quantity}</Text>
              <Pressable onPress={() => changeQuantity(item.id, 1)} style={styles.smallButton}>
                <Ionicons name="add" size={16} color={colors.text} />
              </Pressable>
              <Pressable onPress={() => removeFromCart(item.id)}>
                <Ionicons name="trash-outline" size={18} color={colors.text} />
              </Pressable>
            </View>
          </View>
        )}
      />
      {cart.length > 0 && (
        <View style={styles.footer}>
          <Text style={styles.total}>Toplam: ${totalPrice.toFixed(2)}</Text>
          <Pressable style={styles.button} onPress={() => router.replace('/')}>
            <Text style={styles.buttonText}>Alışverişe Devam Et</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: colors.background, flex: 1 },
  list: { padding: spacing.xl },
  emptyList: { flex: 1 },
  emptyArea: { alignItems: 'center', flex: 1, justifyContent: 'center', paddingHorizontal: spacing.xl },
  emptyIcon: {
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radius.pill,
    borderWidth: 1,
    height: 64,
    justifyContent: 'center',
    marginBottom: spacing.lg,
    width: 64,
  },
  emptyText: { color: colors.secondaryText, fontSize: 18, marginBottom: spacing.xl },
  row: {
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radius.lg,
    borderWidth: 1,
    flexDirection: 'row',
    marginBottom: spacing.md,
    padding: spacing.lg,
  },
  info: { flex: 1, marginRight: spacing.md, minWidth: 0 },
  title: { color: colors.text, fontWeight: '650', lineHeight: 20, marginBottom: spacing.sm },
  actions: { alignItems: 'center', flexDirection: 'row', gap: spacing.sm },
  smallButton: {
    alignItems: 'center',
    backgroundColor: colors.muted,
    borderRadius: radius.sm,
    height: 32,
    justifyContent: 'center',
    width: 32,
  },
  quantity: { minWidth: 20, textAlign: 'center' },
  remove: { color: colors.text, marginLeft: spacing.xs },
  footer: {
    backgroundColor: colors.surface,
    borderTopColor: colors.border,
    borderTopWidth: 1,
    padding: spacing.xl,
  },
  total: { color: colors.text, fontSize: 20, fontWeight: '750', marginBottom: spacing.md },
  button: {
    alignItems: 'center',
    backgroundColor: colors.text,
    borderRadius: radius.md,
    flexDirection: 'row',
    gap: spacing.sm,
    justifyContent: 'center',
    minHeight: 52,
  },
  buttonText: { color: colors.surface, fontWeight: '700' },
});
