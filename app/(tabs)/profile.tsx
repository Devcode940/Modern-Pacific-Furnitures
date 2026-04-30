// Powered by OnSpace.AI
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors, Typography, Spacing, Radius, Shadows } from '@/constants/theme';
import { useMarket } from '@/hooks/useMarket';

const PROFILE_STATS = [
  { label: 'Orders', value: '0', icon: 'receipt-long' as const },
  { label: 'Wishlist', value: '0', icon: 'favorite' as const },
  { label: 'Reviews', value: '0', icon: 'star' as const },
];

const MENU_ITEMS = [
  { icon: 'person-outline' as const, label: 'Edit Profile', sub: 'Update your personal info' },
  { icon: 'location-on' as const, label: 'Delivery Address', sub: 'Manage saved addresses' },
  { icon: 'credit-card' as const, label: 'Payment Methods', sub: 'Cards & wallets' },
  { icon: 'local-shipping' as const, label: 'Order History', sub: 'Track and review orders' },
  { icon: 'notifications-none' as const, label: 'Notifications', sub: 'Push, email preferences' },
  { icon: 'support-agent' as const, label: 'Customer Support', sub: 'Help & contact us' },
  { icon: 'info-outline' as const, label: 'About', sub: 'Version 1.0.0' },
];

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const { wishlist, cartItems } = useMarket();

  const stats = [
    { label: 'Orders', value: '0', icon: 'receipt-long' as const },
    { label: 'Wishlist', value: String(wishlist.length), icon: 'favorite' as const },
    { label: 'Cart', value: String(cartItems.length), icon: 'shopping-bag' as const },
  ];

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>

        {/* Avatar Card */}
        <View style={styles.avatarCard}>
          <View style={styles.avatarCircle}>
            <Text style={styles.avatarInitial}>G</Text>
          </View>
          <View style={styles.avatarInfo}>
            <Text style={styles.avatarName}>Guest User</Text>
            <Text style={styles.avatarEmail}>guest@furnish.app</Text>
            <View style={styles.memberBadge}>
              <MaterialIcons name="workspace-premium" size={13} color={Colors.primary} />
              <Text style={styles.memberText}>Gold Member</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.editBtn} activeOpacity={0.8}>
            <MaterialIcons name="edit" size={18} color={Colors.primary} />
          </TouchableOpacity>
        </View>

        {/* Stats */}
        <View style={styles.statsRow}>
          {stats.map(stat => (
            <View key={stat.label} style={styles.statItem}>
              <MaterialIcons name={stat.icon} size={22} color={Colors.primary} />
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>

        {/* Menu */}
        <View style={styles.menuCard}>
          {MENU_ITEMS.map((item, idx) => (
            <React.Fragment key={item.label}>
              <TouchableOpacity style={styles.menuItem} activeOpacity={0.75}>
                <View style={styles.menuIconWrap}>
                  <MaterialIcons name={item.icon} size={20} color={Colors.primary} />
                </View>
                <View style={styles.menuText}>
                  <Text style={styles.menuLabel}>{item.label}</Text>
                  <Text style={styles.menuSub}>{item.sub}</Text>
                </View>
                <MaterialIcons name="chevron-right" size={20} color={Colors.textMuted} />
              </TouchableOpacity>
              {idx < MENU_ITEMS.length - 1 ? <View style={styles.divider} /> : null}
            </React.Fragment>
          ))}
        </View>

        {/* Sign In CTA */}
        <TouchableOpacity style={styles.signInBtn} activeOpacity={0.85}>
          <MaterialIcons name="login" size={20} color={Colors.textInverse} />
          <Text style={styles.signInText}>Sign In / Register</Text>
        </TouchableOpacity>

        <Text style={styles.versionText}>Furnish Marketplace v1.0 · Powered by OnSpace</Text>
        <View style={{ height: Spacing.xxxl }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: { paddingHorizontal: Spacing.base, paddingVertical: Spacing.md },
  headerTitle: { color: Colors.textPrimary, fontSize: Typography.sizes.xl, fontWeight: Typography.weights.bold },
  scrollContent: { paddingHorizontal: Spacing.base },
  avatarCard: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.surfaceCard,
    borderRadius: Radius.xl, padding: Spacing.base, marginBottom: Spacing.base,
    borderWidth: 1, borderColor: Colors.border, ...Shadows.card,
  },
  avatarCircle: {
    width: 60, height: 60, borderRadius: 30, backgroundColor: Colors.primary,
    alignItems: 'center', justifyContent: 'center', marginRight: Spacing.md,
  },
  avatarInitial: { color: Colors.textInverse, fontSize: Typography.sizes.xl, fontWeight: Typography.weights.heavy },
  avatarInfo: { flex: 1 },
  avatarName: { color: Colors.textPrimary, fontSize: Typography.sizes.md, fontWeight: Typography.weights.bold },
  avatarEmail: { color: Colors.textSecondary, fontSize: Typography.sizes.sm, marginBottom: Spacing.xs },
  memberBadge: { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: Colors.primaryMuted, alignSelf: 'flex-start', paddingHorizontal: Spacing.sm, paddingVertical: 3, borderRadius: Radius.full },
  memberText: { color: Colors.primary, fontSize: Typography.sizes.xs, fontWeight: Typography.weights.semibold },
  editBtn: { padding: Spacing.sm },
  statsRow: {
    flexDirection: 'row', backgroundColor: Colors.surfaceCard, borderRadius: Radius.xl,
    padding: Spacing.base, marginBottom: Spacing.base, borderWidth: 1, borderColor: Colors.border,
    justifyContent: 'space-around', ...Shadows.card,
  },
  statItem: { alignItems: 'center', gap: Spacing.xs },
  statValue: { color: Colors.textPrimary, fontSize: Typography.sizes.lg, fontWeight: Typography.weights.bold },
  statLabel: { color: Colors.textMuted, fontSize: Typography.sizes.xs },
  menuCard: { backgroundColor: Colors.surfaceCard, borderRadius: Radius.xl, borderWidth: 1, borderColor: Colors.border, marginBottom: Spacing.base, ...Shadows.card },
  menuItem: { flexDirection: 'row', alignItems: 'center', padding: Spacing.base, gap: Spacing.md },
  menuIconWrap: { width: 40, height: 40, borderRadius: Radius.md, backgroundColor: Colors.primaryMuted, alignItems: 'center', justifyContent: 'center' },
  menuText: { flex: 1 },
  menuLabel: { color: Colors.textPrimary, fontSize: Typography.sizes.base, fontWeight: Typography.weights.medium },
  menuSub: { color: Colors.textMuted, fontSize: Typography.sizes.xs, marginTop: 2 },
  divider: { height: 1, backgroundColor: Colors.border, marginLeft: 72 },
  signInBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: Colors.primary, borderRadius: Radius.lg, paddingVertical: Spacing.base, gap: Spacing.sm, marginBottom: Spacing.base, ...Shadows.gold },
  signInText: { color: Colors.textInverse, fontSize: Typography.sizes.base, fontWeight: Typography.weights.bold },
  versionText: { textAlign: 'center', color: Colors.textMuted, fontSize: Typography.sizes.xs, marginBottom: Spacing.sm },
});
