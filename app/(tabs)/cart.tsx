// Powered by OnSpace.AI
import React, { useState } from 'react';
import {
  View, Text, StyleSheet, FlatList, TouchableOpacity, Alert, Platform, Modal,
} from 'react-native';
import { Image } from 'expo-image';
import { MaterialIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors, Typography, Spacing, Radius, Shadows } from '@/constants/theme';
import { useMarket } from '@/hooks/useMarket';

export default function CartScreen() {
  const insets = useSafeAreaInsets();
  const { cartItems, removeFromCart, updateCartQuantity, clearCart, cartTotal } = useMarket();
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [webAlertVisible, setWebAlertVisible] = useState(false);

  const shipping = cartTotal > 0 ? (cartTotal > 2000 ? 0 : 99) : 0;
  const total = cartTotal + shipping;

  const handleCheckout = () => {
    if (cartItems.length === 0) return;
    if (Platform.OS === 'web') {
      setWebAlertVisible(true);
    } else {
      Alert.alert('Order Placed!', 'Your order has been received. We will contact you shortly.', [
        { text: 'OK', onPress: () => { clearCart(); setOrderPlaced(true); } },
      ]);
    }
  };

  if (orderPlaced) {
    return (
      <View style={[styles.container, styles.successContainer, { paddingTop: insets.top }]}>
        <MaterialIcons name="check-circle" size={80} color={Colors.success} />
        <Text style={styles.successTitle}>Order Confirmed!</Text>
        <Text style={styles.successSub}>Your furniture is on its way. Expected delivery in 5–7 business days.</Text>
        <TouchableOpacity style={styles.continueBtn} onPress={() => setOrderPlaced(false)} activeOpacity={0.85}>
          <Text style={styles.continueBtnText}>Continue Shopping</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Cart</Text>
        {cartItems.length > 0 ? (
          <TouchableOpacity onPress={clearCart} activeOpacity={0.8}>
            <Text style={styles.clearText}>Clear all</Text>
          </TouchableOpacity>
        ) : null}
      </View>

      {cartItems.length === 0 ? (
        <View style={styles.emptyState}>
          <Image source={require('@/assets/images/empty_cart.png')} style={styles.emptyImage} contentFit="contain" />
          <Text style={styles.emptyTitle}>Your cart is empty</Text>
          <Text style={styles.emptySubtitle}>Add items from the Explore tab to get started.</Text>
        </View>
      ) : (
        <>
          <FlatList
            data={cartItems}
            keyExtractor={item => item.product.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.list}
            renderItem={({ item }) => (
              <View style={styles.cartCard}>
                <Image source={{ uri: item.product.imageUri }} style={styles.cartImage} contentFit="cover" transition={200} />
                <View style={styles.cartInfo}>
                  <Text style={styles.cartBrand}>{item.product.brand}</Text>
                  <Text style={styles.cartName} numberOfLines={2}>{item.product.name}</Text>
                  <View style={styles.colorDot} style={[styles.colorDot, { backgroundColor: item.selectedColor }]} />
                  <Text style={styles.cartPrice}>${(item.product.price * item.quantity).toLocaleString()}</Text>
                  <View style={styles.qtyRow}>
                    <TouchableOpacity
                      onPress={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                      style={styles.qtyBtn}
                      activeOpacity={0.8}
                    >
                      <MaterialIcons name="remove" size={16} color={Colors.textPrimary} />
                    </TouchableOpacity>
                    <Text style={styles.qtyText}>{item.quantity}</Text>
                    <TouchableOpacity
                      onPress={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                      style={styles.qtyBtn}
                      activeOpacity={0.8}
                    >
                      <MaterialIcons name="add" size={16} color={Colors.textPrimary} />
                    </TouchableOpacity>
                  </View>
                </View>
                <TouchableOpacity
                  onPress={() => removeFromCart(item.product.id)}
                  style={styles.deleteBtn}
                  activeOpacity={0.8}
                  hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                >
                  <MaterialIcons name="delete-outline" size={22} color={Colors.error} />
                </TouchableOpacity>
              </View>
            )}
          />

          {/* Summary */}
          <View style={[styles.summary, { paddingBottom: insets.bottom + Spacing.base }]}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Subtotal</Text>
              <Text style={styles.summaryValue}>${cartTotal.toLocaleString()}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Shipping</Text>
              <Text style={[styles.summaryValue, shipping === 0 && { color: Colors.success }]}>
                {shipping === 0 ? 'FREE' : `$${shipping}`}
              </Text>
            </View>
            {shipping === 0 ? (
              <View style={styles.freeShippingBadge}>
                <MaterialIcons name="local-shipping" size={14} color={Colors.success} />
                <Text style={styles.freeShippingText}>Free shipping on orders over $2,000</Text>
              </View>
            ) : null}
            <View style={[styles.summaryRow, styles.totalRow]}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalValue}>${total.toLocaleString()}</Text>
            </View>
            <TouchableOpacity onPress={handleCheckout} style={styles.checkoutBtn} activeOpacity={0.85}>
              <MaterialIcons name="lock" size={18} color={Colors.textInverse} />
              <Text style={styles.checkoutText}>Secure Checkout</Text>
            </TouchableOpacity>
          </View>
        </>
      )}

      {/* Web Alert Modal */}
      {Platform.OS === 'web' ? (
        <Modal visible={webAlertVisible} transparent animationType="fade">
          <View style={styles.modalOverlay}>
            <View style={styles.modalBox}>
              <MaterialIcons name="check-circle" size={48} color={Colors.success} style={{ marginBottom: Spacing.md }} />
              <Text style={styles.modalTitle}>Order Placed!</Text>
              <Text style={styles.modalMsg}>Your order has been received. We will contact you shortly.</Text>
              <TouchableOpacity
                style={styles.modalBtn}
                onPress={() => { setWebAlertVisible(false); clearCart(); setOrderPlaced(true); }}
              >
                <Text style={styles.modalBtnText}>OK</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  successContainer: { alignItems: 'center', justifyContent: 'center', paddingHorizontal: Spacing.xxl },
  header: {
    flexDirection: 'row', alignItems: 'baseline', justifyContent: 'space-between',
    paddingHorizontal: Spacing.base, paddingVertical: Spacing.md,
  },
  headerTitle: { color: Colors.textPrimary, fontSize: Typography.sizes.xl, fontWeight: Typography.weights.bold },
  clearText: { color: Colors.error, fontSize: Typography.sizes.sm, fontWeight: Typography.weights.medium },
  list: { paddingHorizontal: Spacing.base, paddingBottom: Spacing.sm, gap: Spacing.sm },
  cartCard: {
    flexDirection: 'row', backgroundColor: Colors.surfaceCard, borderRadius: Radius.lg,
    overflow: 'hidden', ...Shadows.card, borderWidth: 1, borderColor: Colors.border,
  },
  cartImage: { width: 100, height: 120 },
  cartInfo: { flex: 1, padding: Spacing.md },
  cartBrand: { color: Colors.primary, fontSize: Typography.sizes.xs, fontWeight: Typography.weights.semibold, letterSpacing: 0.8, textTransform: 'uppercase', marginBottom: 2 },
  cartName: { color: Colors.textPrimary, fontSize: Typography.sizes.sm, fontWeight: Typography.weights.semibold, lineHeight: 18, marginBottom: Spacing.xs },
  colorDot: { width: 14, height: 14, borderRadius: 7, marginBottom: Spacing.xs, borderWidth: 1, borderColor: Colors.border },
  cartPrice: { color: Colors.primary, fontSize: Typography.sizes.base, fontWeight: Typography.weights.bold, marginBottom: Spacing.sm },
  qtyRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm },
  qtyBtn: { width: 28, height: 28, borderRadius: Radius.sm, backgroundColor: Colors.surface, borderWidth: 1, borderColor: Colors.border, alignItems: 'center', justifyContent: 'center' },
  qtyText: { color: Colors.textPrimary, fontSize: Typography.sizes.base, fontWeight: Typography.weights.bold, minWidth: 24, textAlign: 'center' },
  deleteBtn: { padding: Spacing.md, justifyContent: 'center' },
  summary: { backgroundColor: Colors.surfaceElevated, borderTopWidth: 1, borderTopColor: Colors.border, padding: Spacing.base },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: Spacing.sm },
  summaryLabel: { color: Colors.textSecondary, fontSize: Typography.sizes.base },
  summaryValue: { color: Colors.textPrimary, fontSize: Typography.sizes.base, fontWeight: Typography.weights.semibold },
  freeShippingBadge: { flexDirection: 'row', alignItems: 'center', gap: Spacing.xs, backgroundColor: 'rgba(76,175,130,0.1)', borderRadius: Radius.sm, padding: Spacing.sm, marginBottom: Spacing.sm },
  freeShippingText: { color: Colors.success, fontSize: Typography.sizes.xs, fontWeight: Typography.weights.medium },
  totalRow: { borderTopWidth: 1, borderTopColor: Colors.border, paddingTop: Spacing.sm, marginTop: Spacing.xs },
  totalLabel: { color: Colors.textPrimary, fontSize: Typography.sizes.md, fontWeight: Typography.weights.bold },
  totalValue: { color: Colors.primary, fontSize: Typography.sizes.xl, fontWeight: Typography.weights.heavy },
  checkoutBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: Colors.primary, borderRadius: Radius.lg, paddingVertical: Spacing.base, gap: Spacing.sm, marginTop: Spacing.md, ...Shadows.gold },
  checkoutText: { color: Colors.textInverse, fontSize: Typography.sizes.base, fontWeight: Typography.weights.bold },
  emptyState: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: Spacing.xxl },
  emptyImage: { width: 200, height: 200, marginBottom: Spacing.xl },
  emptyTitle: { color: Colors.textPrimary, fontSize: Typography.sizes.lg, fontWeight: Typography.weights.bold, marginBottom: Spacing.sm, textAlign: 'center' },
  emptySubtitle: { color: Colors.textSecondary, fontSize: Typography.sizes.base, textAlign: 'center', lineHeight: 22 },
  successTitle: { color: Colors.textPrimary, fontSize: Typography.sizes.xxl, fontWeight: Typography.weights.heavy, marginTop: Spacing.xl, marginBottom: Spacing.sm, textAlign: 'center' },
  successSub: { color: Colors.textSecondary, fontSize: Typography.sizes.base, textAlign: 'center', lineHeight: 22, marginBottom: Spacing.xxl },
  continueBtn: { backgroundColor: Colors.primary, paddingHorizontal: Spacing.xxl, paddingVertical: Spacing.md, borderRadius: Radius.full, ...Shadows.gold },
  continueBtnText: { color: Colors.textInverse, fontSize: Typography.sizes.base, fontWeight: Typography.weights.bold },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.7)', justifyContent: 'center', alignItems: 'center' },
  modalBox: { backgroundColor: Colors.surfaceElevated, borderRadius: Radius.xl, padding: Spacing.xxl, alignItems: 'center', width: 300, borderWidth: 1, borderColor: Colors.border },
  modalTitle: { color: Colors.textPrimary, fontSize: Typography.sizes.lg, fontWeight: Typography.weights.bold, marginBottom: Spacing.sm },
  modalMsg: { color: Colors.textSecondary, fontSize: Typography.sizes.base, textAlign: 'center', lineHeight: 22, marginBottom: Spacing.xl },
  modalBtn: { backgroundColor: Colors.primary, paddingHorizontal: Spacing.xxl, paddingVertical: Spacing.md, borderRadius: Radius.full, ...Shadows.gold },
  modalBtnText: { color: Colors.textInverse, fontWeight: Typography.weights.bold },
});
