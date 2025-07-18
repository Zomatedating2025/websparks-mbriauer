import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colors } from '../styles/colors';
import { globalStyles } from '../styles/globalStyles';
import { useAppStore } from '../store/appStore';

export default function Premium() {
  const { isPremium, setPremium } = useAppStore();
  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'yearly'>('yearly');
  const navigation = useNavigation();

  const premiumFeatures = [
    {
      icon: 'account-tree',
      title: 'Full Natal Chart',
      description: 'Unlock your complete astrological profile with Moon and Rising signs',
      highlight: 'Most Popular',
    },
    {
      icon: 'tune',
      title: 'Advanced Filters',
      description: 'Filter matches by element, modality, or specific zodiac signs',
      highlight: null,
    },
    {
      icon: 'chat',
      title: 'Unlimited Zodi Chat',
      description: 'Ask unlimited questions to your cosmic AI guide',
      highlight: null,
    },
    {
      icon: 'book',
      title: 'Complete Horoscopes',
      description: 'Access full daily readings for Sun, Moon, Rising + Love insights',
      highlight: null,
    },
    {
      icon: 'visibility',
      title: 'See Who Liked You',
      description: 'View all profiles that have swiped right on your cosmic energy',
      highlight: 'Popular',
    },
    {
      icon: 'rocket-launch',
      title: 'Monthly Star Boost',
      description: 'Get 5 profile boosts per month to increase your visibility',
      highlight: null,
    },
    {
      icon: 'undo',
      title: 'Undo Swipes',
      description: 'Take back accidental swipes and get second chances',
      highlight: null,
    },
    {
      icon: 'support',
      title: 'Priority Support',
      description: 'Get cosmic customer support with priority response times',
      highlight: null,
    },
  ];

  const plans = {
    monthly: {
      id: 'premium-monthly',
      name: 'Monthly Premium',
      price: '$9.99',
      period: '/month',
      originalPrice: null,
      savings: null,
      description: 'Perfect for exploring your cosmic connections',
    },
    yearly: {
      id: 'premium-yearly',
      name: 'Yearly Premium',
      price: '$59.99',
      period: '/year',
      originalPrice: '$119.88',
      savings: 'Save 50%',
      description: 'Best value for serious cosmic seekers',
    },
  };

  const handleSubscribe = () => {
    // Simulate purchase
    Alert.alert(
      'Purchase Successful!',
      'Welcome to ZoMate Premium! ✨',
      [
        {
          text: 'OK',
          onPress: () => {
            setPremium(true);
            navigation.goBack();
          }
        }
      ]
    );
  };

  if (isPremium) {
    return (
      <View style={globalStyles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Icon name="arrow-back" size={24} color={colors.galactic.white} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Premium</Text>
          <View style={{ width: 40 }} />
        </View>
        
        <View style={styles.premiumActiveContainer}>
          <View style={styles.premiumActiveContent}>
            <View style={styles.premiumIcon}>
              <Icon name="workspace-premium" size={60} color={colors.galactic.gold} />
            </View>
            
            <Text style={styles.premiumActiveTitle}>You're Premium! ✨</Text>
            
            <Text style={styles.premiumActiveText}>
              Enjoy unlimited access to all cosmic features and find your perfect astrological match.
            </Text>
            
            <View style={styles.benefitsContainer}>
              <Text style={styles.benefitsTitle}>Your Premium Benefits</Text>
              <View style={styles.benefitsGrid}>
                {premiumFeatures.map((feature, index) => (
                  <View key={index} style={styles.benefitItem}>
                    <Icon name={feature.icon} size={16} color={colors.galactic.gold} />
                    <Text style={styles.benefitText}>{feature.title}</Text>
                  </View>
                ))}
              </View>
            </View>

            <TouchableOpacity
              style={globalStyles.goldButton}
              onPress={() => navigation.navigate('SeeWhoLikedYou' as never)}
            >
              <Text style={globalStyles.goldButtonText}>See Who Liked You</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  return (
    <View style={globalStyles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-back" size={24} color={colors.galactic.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>ZoMate Premium</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Hero Section */}
        <View style={styles.hero}>
          <View style={styles.heroIcon}>
            <Icon name="workspace-premium" size={48} color={colors.galactic.gold} />
          </View>
          
          <Text style={styles.heroTitle}>Unlock Your Cosmic Potential</Text>
          <Text style={styles.heroSubtitle}>
            Choose your cosmic journey: Premium subscription or individual features
          </Text>
        </View>

        {/* Plan Toggle */}
        <View style={styles.planToggle}>
          <View style={styles.toggleContainer}>
            <TouchableOpacity
              style={[
                styles.toggleButton,
                selectedPlan === 'monthly' && styles.activeToggle
              ]}
              onPress={() => setSelectedPlan('monthly')}
            >
              <Text style={[
                styles.toggleText,
                selectedPlan === 'monthly' && styles.activeToggleText
              ]}>
                Monthly
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.toggleButton,
                selectedPlan === 'yearly' && styles.activeToggle,
                { position: 'relative' }
              ]}
              onPress={() => setSelectedPlan('yearly')}
            >
              <Text style={[
                styles.toggleText,
                selectedPlan === 'yearly' && styles.active