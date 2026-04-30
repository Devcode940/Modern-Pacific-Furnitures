// Powered by OnSpace.AI
import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  Dimensions, StatusBar, Platform,
} from 'react-native';
import { Image } from 'expo-image';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors, Typography, Spacing, Radius, Shadows } from '@/constants/theme';
import { PRODUCTS, CATEGORIES, FEATURED_COLLECTIONS, Category } from '@/services/productsData';
import { ProductCard } from '@/components/feature/ProductCard';
import { CategoryChip } from '@/components/ui/CategoryChip';
import { useMarket } from '@/hooks/useMarket';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - Spacing.base * 2 - Spacing.sm) / 2;

export default function ExploreScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { cartCount } = useMarket();
  const [selectedCategory, setSelectedCategory] = useState<Category>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = PRODUCTS.filter(p =>
    (selectedCategory === 'All' || p.category === selectedCategory) &&
    (searchQuery === '' || p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.brand.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.background} />

      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerSub}>Welcome back</Text>
          <Text style={styles.headerTitle}>Furnish Your World</Text>
        </View>
        <View style={styles.headerActions}>
          <TouchableOpacity onPress={() => router.push('/cart')} style={styles.iconBtn} activeOpacity={0.8}>
            <MaterialIcons name="shopping-bag" size={24} color={Colors.textPrimary} />
            {cartCount > 0 ? (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{cartCount}</Text>
              </View>
            ) : null}
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>

        {/* Hero Banner */}
        <TouchableOpacity activeOpacity={0.95} style={styles.heroBanner}>
          <Image
            source={require('@/assets/images/hero_banner.jpg')}
            style={styles.heroImage}
            contentFit="cover"
            transition={300}
          />
          <View style={styles.heroOverlay} />
          <View style={styles.heroContent}>
            <View style={styles.heroTag}>
              <Text style={styles.heroTagText}>NEW COLLECTION</Text>
            </View>
            <Text style={styles.heroTitle}>Autumn{'\n'}Living 2026</Text>
            <TouchableOpacity style={styles.heroBtn} activeOpacity={0.8}>
              <Text style={styles.heroBtnText}>Explore Now</Text>
              <MaterialIcons name="arrow-forward" size={16} color={Colors.textInverse} />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>

        {/* Featured Collections */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Collections</Text>
          <TouchableOpacity><Text style={styles.seeAll}>See all</Text></TouchableOpacity>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.collectionsRow}>
            {FEATURED_COLLECTIONS.map(col => (
              <TouchableOpacity key={col.id} style={styles.collectionCard} activeOpacity={0.85}>
                <Image source={{ uri: col.imageUri }} style={styles.collectionImage} contentFit="cover" transition={200} />
                <View style={styles.collectionOverlay} />
                <View style={styles.collectionInfo}>
                  <Text style={styles.collectionTitle}>{col.title}</Text>
                  <Text style={styles.collectionSub}>{col.subtitle}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

        {/* Category Filter */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Products</Text>
          <Text style={styles.productCount}>{filtered.length} items</Text>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryBar}>
          <View style={styles.categoryRow}>
            {CATEGORIES.map(cat => (
              <CategoryChip
                key={cat}
                label={cat}
                isSelected={selectedCategory === cat}
                onPress={() => setSelectedCategory(cat)}
              />
            ))}
          </View>
        </ScrollView>

        {/* Product Grid */}
        <View style={styles.grid}>
          {filtered.map((product, i) => (
            <ProductCard
              key={product.id}
              product={product}
              onPress={() => router.push({ pathname: '/product/[id]', params: { id: product.id } })}
              style={{ width: CARD_WIDTH }}
            />
          ))}
        </View>

        <View style={{ height: Spacing.xxxl }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: Spacing.base, paddingVertical: Spacing.md,
  },
  headerSub: { color: Colors.textMuted, fontSize: Typography.sizes.sm },
  headerTitle: { color: Colors.textPrimary, fontSize: Typography.sizes.xl, fontWeight: Typography.weights.bold },
  headerActions: { flexDirection: 'row', gap: Spacing.sm },
  iconBtn: { width: 44, height: 44, alignItems: 'center', justifyContent: 'center', backgroundColor: Colors.surface, borderRadius: Radius.md, borderWidth: 1, borderColor: Colors.border },
  badge: { position: 'absolute', top: -4, right: -4, backgroundColor: Colors.primary, borderRadius: Radius.full, minWidth: 18, height: 18, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 4 },
  badgeText: { color: Colors.textInverse, fontSize: 10, fontWeight: Typography.weights.bold },
  scrollContent: { paddingHorizontal: Spacing.base },
  heroBanner: { borderRadius: Radius.xl, overflow: 'hidden', height: 220, marginBottom: Spacing.xl, ...Shadows.heavy },
  heroImage: { width: '100%', height: '100%' },
  heroOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.45)' },
  heroContent: { position: 'absolute', bottom: Spacing.xl, left: Spacing.xl },
  heroTag: { backgroundColor: Colors.primaryMuted, borderWidth: 1, borderColor: Colors.primary, borderRadius: Radius.sm, paddingHorizontal: Spacing.sm, paddingVertical: 3, alignSelf: 'flex-start', marginBottom: Spacing.sm },
  heroTagText: { color: Colors.primary, fontSize: Typography.sizes.xs, fontWeight: Typography.weights.bold, letterSpacing: 1 },
  heroTitle: { color: '#fff', fontSize: Typography.sizes.xxl, fontWeight: Typography.weights.heavy, lineHeight: Typography.sizes.xxl * 1.2, marginBottom: Spacing.md },
  heroBtn: { flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.primary, paddingHorizontal: Spacing.base, paddingVertical: Spacing.sm, borderRadius: Radius.full, gap: Spacing.xs, alignSelf: 'flex-start' },
  heroBtnText: { color: Colors.textInverse, fontSize: Typography.sizes.sm, fontWeight: Typography.weights.bold },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: Spacing.md },
  sectionTitle: { color: Colors.textPrimary, fontSize: Typography.sizes.md, fontWeight: Typography.weights.bold },
  seeAll: { color: Colors.primary, fontSize: Typography.sizes.sm, fontWeight: Typography.weights.semibold },
  productCount: { color: Colors.textMuted, fontSize: Typography.sizes.sm },
  collectionsRow: { flexDirection: 'row', paddingBottom: Spacing.xl, gap: Spacing.sm },
  collectionCard: { width: 140, height: 100, borderRadius: Radius.lg, overflow: 'hidden', ...Shadows.card },
  collectionImage: { width: '100%', height: '100%' },
  collectionOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.4)' },
  collectionInfo: { position: 'absolute', bottom: Spacing.sm, left: Spacing.sm },
  collectionTitle: { color: '#fff', fontSize: Typography.sizes.sm, fontWeight: Typography.weights.bold },
  collectionSub: { color: 'rgba(255,255,255,0.7)', fontSize: Typography.sizes.xs },
  categoryBar: { marginBottom: Spacing.base },
  categoryRow: { flexDirection: 'row', paddingRight: Spacing.base },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.sm },
});
