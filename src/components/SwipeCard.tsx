import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colors } from '../styles/colors';

const { width: screenWidth } = Dimensions.get('window');
const cardWidth = screenWidth - 40;

interface SwipeCardProps {
  user: {
    id: string;
    name: string;
    age: number;
    sunSign: string;
    bio: string;
    photos: string[];
    distance?: number;
    interests?: string[];
    isOnline?: boolean;
  };
}

export default function SwipeCard({ user }: SwipeCardProps) {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  const zodiacEmojis = {
    'Aries': '♈', 'Taurus': '♉', 'Gemini': '♊', 'Cancer': '♋',
    'Leo': '♌', 'Virgo': '♍', 'Libra': '♎', 'Scorpio': '♏',
    'Sagittarius': '♐', 'Capricorn': '♑', 'Aquarius': '♒', 'Pisces': '♓'
  };

  const handlePhotoTap = (side: 'left' | 'right') => {
    if (side === 'right' && currentPhotoIndex < user.photos.length - 1) {
      setCurrentPhotoIndex(prev => prev + 1);
    } else if (side === 'left' && currentPhotoIndex > 0) {
      setCurrentPhotoIndex(prev => prev - 1);
    }
  };

  return (
    <View style={styles.card}>
      {/* Photo Section */}
      <View style={styles.photoContainer}>
        <Image
          source={{ uri: user.photos[currentPhotoIndex] }}
          style={styles.photo}
          resizeMode="cover"
        />
        
        {/* Photo Navigation */}
        <View style={styles.photoNavigation}>
          <TouchableOpacity 
            style={styles.photoNavLeft}
            onPress={() => handlePhotoTap('left')}
          />
          <TouchableOpacity 
            style={styles.photoNavRight}
            onPress={() => handlePhotoTap('right')}
          />
        </View>

        {/* Photo Indicators */}
        {user.photos.length > 1 && (
          <View style={styles.photoIndicators}>
            {user.photos.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.indicator,
                  index === currentPhotoIndex && styles.activeIndicator
                ]}
              />
            ))}
          </View>
        )}

        {/* Zodiac Badge */}
        <View style={styles.zodiacBadge}>
          <Text style={styles.zodiacEmoji}>
            {zodiacEmojis[user.sunSign as keyof typeof zodiacEmojis]}
          </Text>
          <Text style={styles.zodiacText}>{user.sunSign}</Text>
        </View>

        {/* Distance */}
        {user.distance && (
          <View style={styles.distanceBadge}>
            <Text style={styles.distanceText}>{user.distance} km away</Text>
          </View>
        )}

        {/* Online Status */}
        {user.isOnline && (
          <View style={styles.onlineIndicator} />
        )}
      </View>

      {/* Info Section */}
      <View style={styles.infoContainer}>
        <View style={styles.nameContainer}>
          <Text style={styles.name}>{user.name}, {user.age}</Text>
        </View>
        
        <Text style={styles.bio} numberOfLines={3}>
          {user.bio}
        </Text>

        {/* Interests */}
        {user.interests && user.interests.length > 0 && (
          <View style={styles.interestsContainer}>
            {user.interests.slice(0, 3).map((interest, index) => (
              <View key={index} style={styles.interestTag}>
                <Text style={styles.interestText}>{interest}</Text>
              </View>
            ))}
            {user.interests.length > 3 && (
              <Text style={styles.moreInterests}>
                +{user.interests.length - 3} more
              </Text>
            )}
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: cardWidth,
    height: 600,
    backgroundColor: colors.cosmic.card,
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  photoContainer: {
    height: 400,
    position: 'relative',
  },
  photo: {
    width: '100%',
    height: '100%',
  },
  photoNavigation: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
  },
  photoNavLeft: {
    flex: 1,
  },
  photoNavRight: {
    flex: 1,
  },
  photoIndicators: {
    position: 'absolute',
    top: 16,
    left: 16,
    right: 16,
    flexDirection: 'row',
  },
  indicator: {
    flex: 1,
    height: 3,
    backgroundColor: colors.galactic.white + '30',
    marginHorizontal: 1,
    borderRadius: 1.5,
  },
  activeIndicator: {
    backgroundColor: colors.galactic.white,
  },
  zodiacBadge: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: colors.galactic.purple + '80',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  zodiacEmoji: {
    fontSize: 16,
    marginRight: 4,
  },
  zodiacText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.galactic.white,
  },
  distanceBadge: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    backgroundColor: colors.cosmic.card + '80',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  distanceText: {
    fontSize: 12,
    color: colors.galactic.white,
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    width: 12,
    height: 12,
    backgroundColor: colors.galactic.teal,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: colors.galactic.white,
  },
  infoContainer: {
    flex: 1,
    padding: 20,
  },
  nameContainer: {
    marginBottom: 8,
  },
  name: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.galactic.white,
  },
  bio: {
    fontSize: 16,
    color: colors.galactic.white + '80',
    lineHeight: 22,
    marginBottom: 16,
  },
  interestsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  interestTag: {
    backgroundColor: colors.galactic.purple + '30',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
    marginBottom: 4,
  },
  interestText: {
    fontSize: 12,
    color: colors.galactic.white,
    fontWeight: '500',
  },
  moreInterests: {
    fontSize: 12,
    color: colors.galactic.white + '60',
    fontStyle: 'italic',
  },
});
