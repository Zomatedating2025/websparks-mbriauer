import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { colors } from '../styles/colors';
import { MILLENNIAL_GENZ_INTERESTS } from '../data/interests';

interface InterestsSelectorProps {
  selectedInterests: string[];
  onInterestsChange: (interests: string[]) => void;
  maxInterests?: number;
}

export default function InterestsSelector({ 
  selectedInterests, 
  onInterestsChange, 
  maxInterests = 5 
}: InterestsSelectorProps) {
  
  const handleInterestToggle = (interest: string) => {
    if (selectedInterests.includes(interest)) {
      onInterestsChange(selectedInterests.filter(i => i !== interest));
    } else if (selectedInterests.length < maxInterests) {
      onInterestsChange([...selectedInterests, interest]);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>
          What sparks your cosmic curiosity?
        </Text>
        <Text style={styles.subText}>
          Choose up to {maxInterests} interests that define your cosmic journey.
        </Text>
        <View style={styles.countContainer}>
          <Text style={styles.countText}>
            {selectedInterests.length} / {maxInterests} selected
          </Text>
        </View>
      </View>

      <ScrollView style={styles.interestsContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.interestsGrid}>
          {MILLENNIAL_GENZ_INTERESTS.map((interest) => {
            const isSelected = selectedInterests.includes(interest);
            const canSelect = selectedInterests.length < maxInterests || isSelected;
            
            return (
              <TouchableOpacity
                key={interest}
                style={[
                  styles.interestButton,
                  isSelected && styles.selectedInterest,
                  !canSelect && styles.disabledInterest
                ]}
                onPress={() => canSelect && handleInterestToggle(interest)}
                disabled={!canSelect}
              >
                <Text style={[
                  styles.interestText,
                  isSelected && styles.selectedInterestText,
                  !canSelect && styles.disabledInterestText
                ]}>
                  {interest}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>

      {selectedInterests.length > 0 && (
        <View style={styles.selectedContainer}>
          <Text style={styles.selectedTitle}>Your Selected Interests:</Text>
          <View style={styles.selectedGrid}>
            {selectedInterests.map((interest) => (
              <View key={interest} style={styles.selectedTag}>
                <Text style={styles.selectedTagText}>{interest}</Text>
              </View>
            ))}
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  headerText: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.galactic.white,
    textAlign: 'center',
    marginBottom: 8,
  },
  subText: {
    fontSize: 14,
    color: colors.galactic.white + '70',
    textAlign: 'center',
    marginBottom: 16,
  },
  countContainer: {
    backgroundColor: colors.cosmic.card,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  countText: {
    fontSize: 14,
    color: colors.galactic.white,
    fontWeight: '500',
  },
  interestsContainer: {
    flex: 1,
    maxHeight: 300,
  },
  interestsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  interestButton: {
    backgroundColor: colors.cosmic.card,
    borderColor: colors.galactic.purple + '30',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 8,
    minWidth: '48%',
    alignItems: 'center',
  },
  selectedInterest: {
    backgroundColor: colors.galactic.gold + '20',
    borderColor: colors.galactic.gold,
  },
  disabledInterest: {
    backgroundColor: colors.cosmic.card + '30',
    borderColor: colors.galactic.white + '10',
  },
  interestText: {
    fontSize: 14,
    color: colors.galactic.white + '80',
    textAlign: 'center',
  },
  selectedInterestText: {
    color: colors.galactic.white,
    fontWeight: '500',
  },
  disabledInterestText: {
    color: colors.galactic.white + '30',
  },
  selectedContainer: {
    backgroundColor: colors.galactic.purple + '20',
    borderRadius: 12,
    padding: 16,
    marginTop: 16,
  },
  selectedTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.galactic.white,
    marginBottom: 8,
  },
  selectedGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  selectedTag: {
    backgroundColor: colors.galactic.gold + '20',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
    marginBottom: 4,
  },
  selectedTagText: {
    fontSize: 12,
    color: colors.galactic.gold,
    fontWeight: '500',
  },
});
