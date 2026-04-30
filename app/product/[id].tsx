// Powered by OnSpace.AI
import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  Dimensions, StatusBar, Platform, Modal,
} from 'react-native';
import { Image } from 'expo-image';
import { MaterialIcons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors, Typography, Spacing, Radius, Shadows } from '@/constants/theme';
import { PRODUCTS } from '@/services/productsData';
import { useMarket } from '@/hooks/useMarket';

const { width } = Dimensions.get('window');

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { isWishlisted, addToWishlist, removeFromWishlist, addToCart } = useMarket();
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedImage, setSelectedImage] = useState(0);
  const [addedToast, setAddedToast] = useState(false);

  const product = PRODUCTS.find(p => p.id === id);
  if (!product) {
    return (
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <Text style={{ color: Colors.textPrimary, textAlign: 'center', marginTop: 40 }}>Product not found.</Text>
      </View>
    );
  }

  const wishlisted = isWishlisted(product.id);

  const handleAddToCart = () => {
    addToCart(product, product.colors[selectedColor]);
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 2000);
  };

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.background} />

      {/* Back + Actions bar */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn} activeOpacity={0.8}>
          <MaterialIcons name="arrow-back" size={22} color={Colors.textPrimary} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => wishlisted ? removeFromWishlist(product.id) : addToWishlist(product)}
          style={styles.backBtn}
          activeOpacity={0.8}
        >
          <MaterialIcons name={wishlisted ? 'favorite' : 'favorite-border'} size={22} color={wishlisted ? Colors.error : Colors.textPrimary} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Main Image */}
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: product.images[selectedImage] || product.imageUri }}
            style={styles.mainImage}
            contentFit="cover"
            transition={200}
          />
          {discount ? (
            <View style={styles.discountTag}>
              <Text style={styles.discountTagText}>-{discount}%</Text>
            </View>
          ) : null}
        </View>

        {/* Thumbnails */}
        {product.images.length > 1 ? (
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.thumbBar}>
            <View style={styles.thumbRow}>
              {product.images.map((img, idx) => (
                <TouchableOpacity
                  key={idx}
                  onPress={() => setSelectedImage(idx)}
                  style={[styles.thumb, selectedImage === idx && styles.thumbActive]}
                  activeOpacity={0.8}
                >
                  <Image source={{ uri: img }} style={styles.thumbImage} contentFit="cover" transition={100} />
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        ) : null}

        <View style={styles.detailContent}>
          {/* Brand + Name */}
          <Text style={styles.brand}>{product.brand}</Text>
          <Text style={styles.name}>{product.name}</Text>

          {/* Rating + Reviews */}
          <View style={styles.ratingRow}>
            {[1, 2, 3, 4, 5].map(s => (
              <MaterialIcons key={s} name={s <= Math.round(product.rating) ? 'star' : 'star-border'} size={18} color={Colors.primary} />
            ))}
            <Text style={styles.ratingVal}>{product.rating.toFixed(1)}</Text>
            <Text style={styles.reviewCount}>({product.reviewCount} reviews)</Text>
          </View>

          {/* Price */}
          <View style={styles.priceRow}>
            <Text style={styles.price}>${product.price.toLocaleString()}</Text>
            {product.originalPrice ? (
              <Text style={styles.originalPrice}>${product.originalPrice.toLocaleString()}</Text>
            ) : null}
          </View>

          {/* Color Selection */}
          <Text style={styles.sectionLabel}>Color</Text>
          <View style={styles.colorRow}>
            {product.colors.map((color, idx) => (
              <TouchableOpacity
                key={idx}
                onPress={() => setSelectedColor(idx)}
                activeOpacity={0.8}
                style={[
                  styles.colorCircle,
                  { backgroundColor: color },
                  selectedColor === idx && styles.colorCircleSelected,
                ]}
              />
            ))}
          </View>

          {/* Description */}
          <Text style={styles.sectionLabel}>Description</Text>
          <Text style={styles.description}>{product.description}</Text>

          {/* Features */}
          <Text style={styles.sectionLabel}>Features</Text>
          {product.features.map((f, i) => (
            <View key={i} style={styles.featureRow}>
              <MaterialIcons name="check-circle" size={16} color={Colors.success} />
              <Text style={styles.featureText}>{f}</Text>
            </View>
          ))}

          {/* Specs */}
          <Text style={styles.sectionLabel}>Specifications</Text>
          <View style={styles.specsCard}>
            <View style={styles.specRow}>
              <Text style={styles.specLabel}>Dimensions</Text>
              <Text style={styles.specValue}>{product.dimensions}</Text>
            </View>
            <View style={styles.specDivider} />
            <View style={styles.specRow}>
              <Text style={styles.specLabel}>Material</Text>
              <Text style={styles.specValue}>{product.material}</Text>
            </View>
            <View style={styles.specDivider} />
            <View style={styles.specRow}>
              <Text style={styles.specLabel}>Category</Text>
              <Text style={styles.specValue}>{product.category}</Text>
            </View>
            <View style={styles.specDivider} />
            <View style={styles.specRow}>
              <Text style={styles.specLabel}>Availability</Text>
              <Text style={[styles.specValue, { color: product.inStock ? Colors.success : Colors.error }]}>
                {product.inStock ? 'In Stock' : 'Out of Stock'}
              </Text>
            </View>
          </View>

          <View style={{ height: 120 }} />
        </View>
      </ScrollView>

      {/* Bottom CTA */}
      <View style={[styles.bottomBar, { paddingBottom: insets.bottom + Spacing.base }]}>
        <View style={styles.bottomPrice}>
          <Text style={styles.bottomPriceLabel}>Total Price</Text>
          <Text style={styles.bottomPriceValue}>${product.price.toLocaleString()}</Text>
        </View>
        <TouchableOpacity onPress={handleAddToCart} style={styles.addToCartBtn} activeOpacity={0.85}>
          <MaterialIcons name="add-shopping-cart" size={20} color={Colors.textInverse} />
          <Text style={styles.addToCartText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>

      {/* Toast */}
      {addedToast ? (
        <View style={[styles.toast, { bottom: insets.bottom + 90 }]}>
          <MaterialIcons name="check-circle" size={16} color={Colors.success} />
          <Text style={styles.toastText}>Added to cart!</Text>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  topBar: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: Spacing.base, paddingVertical: Spacing.sm },
  backBtn: { width: 44, height: 44, borderRadius: Radius.full, backgroundColor: Colors.surface, borderWidth: 1, borderColor: Colors.border, alignItems: 'center', justifyContent: 'center' },
  imageContainer: { position: 'relative', height: 320, marginBottom: Spacing.sm },
  mainImage: { width: '100%', height: '100%' },
  discountTag: { position: 'absolute', top: Spacing.base, right: Spacing.base, backgroundColor: Colors.error, paddingHorizontal: Spacing.sm, paddingVertical: 4, borderRadius: Radius.sm },
  discountTagText: { color: '#fff', fontSize: Typography.sizes.sm, fontWeight: Typography.weights.bold },
  thumbBar: { marginBottom: Spacing.sm },
  thumbRow: { flexDirection: 'row', paddingHorizontal: Spacing.base, gap: Spacing.sm },
  thumb: { width: 64, height: 64, borderRadius: Radius.md, overflow: 'hidden', borderWidth: 2, borderColor: 'transparent' },
  thumbActive: { borderColor: Colors.primary },
  thumbImage: { width: '100%', height: '100%' },
  detailContent: { paddingHorizontal: Spacing.base },
  brand: { color: Colors.primary, fontSize: Typography.sizes.sm, fontWeight: Typography.weights.bold, letterSpacing: 1, textTransform: 'uppercase', marginBottom: Spacing.xs },
  name: { color: Colors.textPrimary, fontSize: Typography.sizes.xxl, fontWeight: Typography.weights.heavy, lineHeight: Typography.sizes.xxl * 1.2, marginBottom: Spacing.md },
  ratingRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginBottom: Spacing.md },
  ratingVal: { color: Colors.textPrimary, fontSize: Typography.sizes.base, fontWeight: Typography.weights.semibold, marginLeft: 4 },
  reviewCount: { color: Colors.textMuted, fontSize: Typography.sizes.sm },
  priceRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md, marginBottom: Spacing.lg },
  price: { color: Colors.primary, fontSize: Typography.sizes.xxl, fontWeight: Typography.weights.heavy },
  originalPrice: { color: Colors.textMuted, fontSize: Typography.sizes.base, textDecorationLine: 'line-through' },
  sectionLabel: { color: Colors.textSecondary, fontSize: Typography.sizes.xs, fontWeight: Typography.weights.bold, letterSpacing: 1, textTransform: 'uppercase', marginBottom: Spacing.sm, marginTop: Spacing.md },
  colorRow: { flexDirection: 'row', gap: Spacing.sm },
  colorCircle: { width: 32, height: 32, borderRadius: 16, borderWidth: 2, borderColor: 'transparent' },
  colorCircleSelected: { borderColor: Colors.primary },
  description: { color: Colors.textSecondary, fontSize: Typography.sizes.base, lineHeight: Typography.sizes.base * 1.7 },
  featureRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm, marginBottom: Spacing.sm },
  featureText: { color: Colors.textSecondary, fontSize: Typography.sizes.base },
  specsCard: { backgroundColor: Colors.surfaceCard, borderRadius: Radius.lg, borderWidth: 1, borderColor: Colors.border, ...Shadows.card },
  specRow: { flexDirection: 'row', justifyContent: 'space-between', padding: Spacing.base, alignItems: 'flex-start' },
  specLabel: { color: Colors.textMuted, fontSize: Typography.sizes.sm },
  specValue: { color: Colors.textPrimary, fontSize: Typography.sizes.sm, fontWeight: Typography.weights.medium, flex: 1, textAlign: 'right' },
  specDivider: { height: 1, backgroundColor: Colors.border },
  bottomBar: { position: 'absolute', bottom: 0, left: 0, right: 0, flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.surfaceElevated, borderTopWidth: 1, borderTopColor: Colors.border, paddingHorizontal: Spacing.base, paddingTop: Spacing.base, gap: Spacing.base },
  bottomPrice: { flex: 1 },
  bottomPriceLabel: { color: Colors.textMuted, fontSize: Typography.sizes.xs },
  bottomPriceValue: { color: Colors.primary, fontSize: Typography.sizes.xl, fontWeight: Typography.weights.heavy },
  addToCartBtn: { flex: 2, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: Colors.primary, borderRadius: Radius.lg, paddingVertical: Spacing.base, gap: Spacing.sm, ...Shadows.gold },
  addToCartText: { color: Colors.textInverse, fontSize: Typography.sizes.base, fontWeight: Typography.weights.bold },
  toast: { position: 'absolute', left: Spacing.xxl, right: Spacing.xxl, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: Spacing.sm, backgroundColor: Colors.surfaceElevated, borderRadius: Radius.full, paddingVertical: Spacing.sm, borderWidth: 1, borderColor: Colors.success, ...Shadows.card },
  toastText: { color: Colors.textPrimary, fontSize: Typography.sizes.sm, fontWeight: Typography.weights.semibold },
});
