// Powered by OnSpace.AI
import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors, Typography, Spacing, Radius, Shadows } from '@/constants/theme';
import { useMarket } from '@/hooks/useMarket';
import { Product } from '@/services/productsData';

export default function WishlistScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { wishlist, removeFromWishlist, addToCart } = useMarket();

  const renderItem = ({ item }: { item: Product }) => (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.88}
      onPress={() => router.push({ pathname: '/product/[id]', params: { id: item.id } })}
    >
      <Image source={{ uri: item.imageUri }} style={styles.cardImage} contentFit="cover" transition={200} />
      <View style={styles.cardInfo}>
        <Text style={styles.cardBrand}>{item.brand}</Text>
        <Text style={styles.cardName} numberOfLines={2}>{item.name}</Text>
        <View style={styles.cardRating}>
          <MaterialIcons name="star" size={12} color={Colors.primary} />
          <Text style={styles.ratingText}>{item.rating.toFixed(1)}</Text>
        </View>
        <Text style={styles.cardPrice}>${item.price.toLocaleString()}</Text>
      </View>
      <View style={styles.cardActions}>
        <TouchableOpacity
          onPress={() => removeFromWishlist(item.id)}
          style={styles.removeBtn}
          activeOpacity={0.8}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <MaterialIcons name="favorite" size={20} color={Colors.error} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => addToCart(item)}
          style={styles.cartBtn}
          activeOpacity={0.8}
        >
          <MaterialIcons name="add-shopping-cart" size={18} color={Colors.textInverse} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Wishlist</Text>
        <Text style={styles.headerCount}>{wishlist.length} saved</Text>
      </View>

      {wishlist.length === 0 ? (
        <View style={styles.emptyState}>
          <Image source={require('@/assets/images/empty_wishlist.png')} style={styles.emptyImage} contentFit="contain" />
          <Text style={styles.emptyTitle}>Nothing saved yet</Text>
          <Text style={styles.emptySubtitle}>Tap the heart on any product to save it here for later.</Text>
          <TouchableOpacity style={styles.exploreBtn} onPress={() => router.push('/')} activeOpacity={0.85}>
            <Text style={styles.exploreBtnText}>Explore Products</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={wishlist}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: {
    flexDirection: 'row', alignItems: 'baseline', justifyContent: 'space-between',
    paddingHorizontal: Spacing.base, paddingVertical: Spacing.md,
  },
  headerTitle: { color: Colors.textPrimary, fontSize: Typography.sizes.xl, fontWeight: Typography.weights.bold },
  headerCount: { color: Colors.textMuted, fontSize: Typography.sizes.sm },
  list: { paddingHorizontal: Spacing.base, paddingBottom: Spacing.xxxl, gap: Spacing.sm },
  card: {
    flexDirection: 'row', backgroundColor: Colors.surfaceCard, borderRadius: Radius.lg,
    overflow: 'hidden', ...Shadows.card, borderWidth: 1, borderColor: Colors.border,
  },
  cardImage: { width: 110, height: 110 },
  cardInfo: { flex: 1, padding: Spacing.md, justifyContent: 'center' },
  cardBrand: { color: Colors.primary, fontSize: Typography.sizes.xs, fontWeight: Typography.weights.semibold, letterSpacing: 0.8, textTransform: 'uppercase', marginBottom: 2 },
  cardName: { color: Colors.textPrimary, fontSize: Typography.sizes.sm, fontWeight: Typography.weights.semibold, lineHeight: 18, marginBottom: Spacing.xs },
  cardRating: { flexDirection: 'row', alignItems: 'center', gap: 3, marginBottom: Spacing.xs },
  ratingText: { color: Colors.textSecondary, fontSize: Typography.sizes.xs },
  cardPrice: { color: Colors.primary, fontSize: Typography.sizes.base, fontWeight: Typography.weights.bold },
  cardActions: { justifyContent: 'space-between', alignItems: 'center', padding: Spacing.sm },
  removeBtn: { padding: Spacing.xs },
  cartBtn: { backgroundColor: Colors.primary, borderRadius: Radius.md, padding: Spacing.sm, ...Shadows.gold },
  emptyState: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: Spacing.xxl },
  emptyImage: { width: 200, height: 200, marginBottom: Spacing.xl },
  emptyTitle: { color: Colors.textPrimary, fontSize: Typography.sizes.lg, fontWeight: Typography.weights.bold, marginBottom: Spacing.sm, textAlign: 'center' },
  emptySubtitle: { color: Colors.textSecondary, fontSize: Typography.sizes.base, textAlign: 'center', lineHeight: 22, marginBottom: Spacing.xl },
  exploreBtn: { backgroundColor: Colors.primary, paddingHorizontal: Spacing.xxl, paddingVertical: Spacing.md, borderRadius: Radius.full, ...Shadows.gold },
  exploreBtnText: { color: Colors.textInverse, fontSize: Typography.sizes.base, fontWeight: Typography.weights.bold },
});
