// Powered by OnSpace.AI
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors, Typography, Spacing, Radius, Shadows } from '@/constants/theme';
import { Product } from '@/services/productsData';
import { useMarket } from '@/hooks/useMarket';

interface ProductCardProps {
  product: Product;
  onPress: () => void;
  style?: object;
}

const BADGE_COLORS: Record<string, string> = {
  'New': Colors.success,
  'Sale': Colors.error,
  'Popular': Colors.warning,
  'Premium': Colors.primary,
};

export const ProductCard = React.memo(({ product, onPress, style }: ProductCardProps) => {
  const { isWishlisted, addToWishlist, removeFromWishlist, addToCart } = useMarket();
  const wishlisted = isWishlisted(product.id);

  const handleWishlist = () => {
    if (wishlisted) removeFromWishlist(product.id);
    else addToWishlist(product);
  };

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.9} style={[styles.card, style]}>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: product.imageUri }}
          style={styles.image}
          contentFit="cover"
          transition={200}
        />
        {product.badge ? (
          <View style={[styles.badge, { backgroundColor: BADGE_COLORS[product.badge] }]}>
            <Text style={styles.badgeText}>{product.badge}</Text>
          </View>
        ) : null}
        {discount ? (
          <View style={styles.discountBadge}>
            <Text style={styles.discountText}>-{discount}%</Text>
          </View>
        ) : null}
        <TouchableOpacity onPress={handleWishlist} style={styles.wishlistBtn} activeOpacity={0.8}>
          <MaterialIcons
            name={wishlisted ? 'favorite' : 'favorite-border'}
            size={20}
            color={wishlisted ? Colors.error : Colors.textSecondary}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.info}>
        <Text style={styles.brand}>{product.brand}</Text>
        <Text style={styles.name} numberOfLines={2}>{product.name}</Text>

        <View style={styles.ratingRow}>
          <MaterialIcons name="star" size={13} color={Colors.primary} />
          <Text style={styles.rating}>{product.rating.toFixed(1)}</Text>
          <Text style={styles.reviewCount}>({product.reviewCount})</Text>
        </View>

        <View style={styles.priceRow}>
          <View>
            <Text style={styles.price}>${product.price.toLocaleString()}</Text>
            {product.originalPrice ? (
              <Text style={styles.originalPrice}>${product.originalPrice.toLocaleString()}</Text>
            ) : null}
          </View>
          <TouchableOpacity
            onPress={() => addToCart(product)}
            style={styles.addBtn}
            activeOpacity={0.8}
          >
            <MaterialIcons name="add-shopping-cart" size={18} color={Colors.textInverse} />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surfaceCard,
    borderRadius: Radius.lg,
    overflow: 'hidden',
    ...Shadows.card,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  imageContainer: {
    position: 'relative',
    height: 180,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  badge: {
    position: 'absolute',
    top: Spacing.sm,
    left: Spacing.sm,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 3,
    borderRadius: Radius.sm,
  },
  badgeText: {
    color: '#fff',
    fontSize: Typography.sizes.xs,
    fontWeight: Typography.weights.bold,
    letterSpacing: 0.5,
  },
  discountBadge: {
    position: 'absolute',
    bottom: Spacing.sm,
    left: Spacing.sm,
    backgroundColor: Colors.error,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 3,
    borderRadius: Radius.sm,
  },
  discountText: {
    color: '#fff',
    fontSize: Typography.sizes.xs,
    fontWeight: Typography.weights.bold,
  },
  wishlistBtn: {
    position: 'absolute',
    top: Spacing.sm,
    right: Spacing.sm,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: Radius.full,
    padding: Spacing.xs,
  },
  info: {
    padding: Spacing.md,
  },
  brand: {
    color: Colors.primary,
    fontSize: Typography.sizes.xs,
    fontWeight: Typography.weights.semibold,
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    marginBottom: 3,
  },
  name: {
    color: Colors.textPrimary,
    fontSize: Typography.sizes.base,
    fontWeight: Typography.weights.semibold,
    lineHeight: Typography.sizes.base * 1.3,
    marginBottom: Spacing.xs,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.sm,
    gap: 3,
  },
  rating: {
    color: Colors.textPrimary,
    fontSize: Typography.sizes.sm,
    fontWeight: Typography.weights.medium,
  },
  reviewCount: {
    color: Colors.textMuted,
    fontSize: Typography.sizes.xs,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  price: {
    color: Colors.primary,
    fontSize: Typography.sizes.lg,
    fontWeight: Typography.weights.bold,
  },
  originalPrice: {
    color: Colors.textMuted,
    fontSize: Typography.sizes.sm,
    textDecorationLine: 'line-through',
  },
  addBtn: {
    backgroundColor: Colors.primary,
    borderRadius: Radius.md,
    padding: Spacing.sm,
    ...Shadows.gold,
  },
});
