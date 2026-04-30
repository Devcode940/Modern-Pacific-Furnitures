// Powered by OnSpace.AI
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors, Typography, Spacing, Radius } from '@/constants/theme';

interface CategoryChipProps {
  label: string;
  isSelected: boolean;
  onPress: () => void;
}

export const CategoryChip = ({ label, isSelected, onPress }: CategoryChipProps) => (
  <TouchableOpacity
    onPress={onPress}
    activeOpacity={0.8}
    style={[styles.chip, isSelected ? styles.chipSelected : styles.chipDefault]}
  >
    <Text style={[styles.chipText, isSelected ? styles.chipTextSelected : styles.chipTextDefault]}>
      {label}
    </Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  chip: {
    paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.sm,
    borderRadius: Radius.full,
    marginRight: Spacing.sm,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
  },
  chipDefault: {
    backgroundColor: Colors.surface,
    borderColor: Colors.border,
  },
  chipSelected: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  chipText: {
    fontSize: Typography.sizes.sm,
    fontWeight: Typography.weights.semibold,
    letterSpacing: 0.3,
  },
  chipTextDefault: {
    color: Colors.textSecondary,
  },
  chipTextSelected: {
    color: Colors.textInverse,
  },
});
