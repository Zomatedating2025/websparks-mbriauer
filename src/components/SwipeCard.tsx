import React, { useState } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { useGesture } from 'react-use-gesture';
import { User } from '../store/appStore';
import { useAppStore } from '../store/appStore';
import { CompatibilityService } from '../services/compatibilityService';
import CompatibilityMeter from './CompatibilityMeter';

interface SwipeCardProps {
  user: User;
  onSwipe: (direction: 'left' | 'right', user: User) => void;
  isTop: boolean;
}

const SwipeCard: React.FC<SwipeCardProps> = ({ user, onSwipe, isTop }) => {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [showCompatibility, setShowCompatibility] = useState(false);
  const { currentUser } = useAppStore();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-30, 30]);
  const opacity = useTransform(x, [-200, -100, 0, 100, 200], [0, 1, 1, 1, 0]);

  const bind = useGesture({
    onDrag: ({ offset, cancel }) => {
      const ox = Array.isArray(offset) ? offset[0] : offset.x || 0;
      const oy = Array.isArray(offset) ? offset[1] : offset.y || 0;
      
      x.set(ox);
      y.set(oy);
      
      if (Math.abs(ox) > 100) {
        cancel();
        onSwipe(ox > 0 ? 'right' : 'left', user);
      }
    },
  });

  const zodiacEmoji = {
    'Aries': '♈', 'Taurus': '♉', 'Gemini': '♊', 'Cancer': '♋',
    'Leo': '♌', 'Virgo': '♍', 'Libra': '♎', 'Scorpio': '♏',
    'Sagittarius': '♐', 'Capricorn': '♑', 'Aquarius': '♒', 'Pisces': '♓'
  };

  const handlePhotoTap = (e: React.MouseEvent) => {
    e.stopPropagation();
    const rect = e.currentTarget.getBoundingClientRect();
    const tapX = e.clientX - rect.left;
    const cardWidth = rect.width;
    
    if (tapX > cardWidth / 2) {
      // Tapped right side - next photo
      if (currentPhotoIndex < user.photos.length - 1) {
        setCurrentPhotoIndex(prev => prev + 1);
      }
    } else {
      // Tapped left side - previous photo
      if (currentPhotoIndex > 0) {
        setCurrentPhotoIndex(prev => prev - 1);
      }
    }
  };

  // Calculate compatibility if both users exist
  const compatibility = currentUser ? CompatibilityService.calculateCompatibility(currentUser, user) : null;

  return (
    <motion.div
      {...bind()}
      style={{ x, y, rotate, opacity }}
      className={`absolute w-80 h-[500px] bg-card-gradient rounded-2xl shadow-2xl cursor-grab active:cursor-grabbing overflow-hidden ${
        isTop ? 'z-20' : 'z-10'
      }`}
      whileTap={{ cursor: 'grabbing' }}
      drag
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
    >
      {/* Photo Section */}
      <div className="relative h-80 bg-gradient-to-br from-galactic-purple to-galactic-dark overflow-hidden">
        <div 
          className="w-full h-full cursor-pointer"
          onClick={handlePhotoTap}
        >
          <img
            src={user.photos[currentPhotoIndex] || `https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face`}
            alt={`${user.name} photo ${currentPhotoIndex + 1}`}
            className="w-full h-full object-cover"
            crossOrigin="anonymous"
          />
        </div>
        
        {/* Photo Indicators */}
        {user.photos.length > 1 && (
          <div className="absolute top-4 left-4 right-4 flex space-x-1">
            {user.photos.map((_, index) => (
              <div
                key={index}
                className={`flex-1 h-1 rounded-full transition-all duration-300 ${
                  index === currentPhotoIndex 
                    ? 'bg-galactic-white' 
                    : 'bg-galactic-white/30'
                }`}
              />
            ))}
          </div>
        )}

        {/* Compatibility Button */}
        {compatibility && (
          <motion.button
            className="absolute top-4 left-4 bg-cosmic-card/80 backdrop-blur-sm rounded-full p-2"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={(e) => {
              e.stopPropagation();
              setShowCompatibility(!showCompatibility);
            }}
          >
            <div className="flex items-center space-x-1">
              <span className={`text-sm font-heading ${CompatibilityService.getCompatibilityColor(compatibility.overall)}`}>
                {compatibility.overall}%
              </span>
              <i className="bi bi-stars text-galactic-gold text-xs"></i>
            </div>
          </motion.button>
        )}

        {/* Zodiac Sign Badge */}
        <div className="absolute top-4 right-4 bg-galactic-purple/80 backdrop-blur-sm rounded-full px-3 py-1 flex items-center space-x-1">
          <span className="text-lg">{zodiacEmoji[user.sunSign as keyof typeof zodiacEmoji]}</span>
          <span className="text-sm font-heading text-galactic-white">{user.sunSign}</span>
        </div>

        {/* Distance */}
        {user.distance && (
          <div className="absolute bottom-4 left-4 bg-cosmic-card/80 backdrop-blur-sm rounded-full px-3 py-1">
            <span className="text-sm font-body text-galactic-white">{user.distance} km away</span>
          </div>
        )}

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
      </div>

      {/* Profile Info Section */}
      <div className="h-[220px] p-4 bg-cosmic-card">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="text-xl font-heading text-galactic-white">{user.name}, {user.age}</h3>
            {user.occupation && (
              <p className="text-sm text-galactic-lavender font-body">{user.occupation}</p>
            )}
          </div>
          <div className="flex flex-col space-y-1">
            {user.moonSign && (
              <span className="text-xs bg-galactic-lavender/20 text-galactic-lavender px-2 py-1 rounded-full text-center">
                🌙 {user.moonSign}
              </span>
            )}
            {user.risingSign && (
              <span className="text-xs bg-galactic-teal/20 text-galactic-teal px-2 py-1 rounded-full text-center">
                ⬆️ {user.risingSign}
              </span>
            )}
          </div>
        </div>

        <p className="text-sm text-galactic-white/80 font-body line-clamp-3 mb-3 leading-relaxed">
          {user.bio}
        </p>

        {/* Interests */}
        {user.interests && user.interests.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {user.interests.slice(0, 4).map((interest, index) => (
              <span
                key={index}
                className="text-xs bg-galactic-purple/30 text-galactic-white px-2 py-1 rounded-full font-body"
              >
                {interest}
              </span>
            ))}
            {user.interests.length > 4 && (
              <span className="text-xs text-galactic-white/60 font-body">
                +{user.interests.length - 4} more
              </span>
            )}
          </div>
        )}
      </div>

      {/* Compatibility Overlay */}
      {showCompatibility && compatibility && (
        <motion.div
          className="absolute inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={(e) => {
            e.stopPropagation();
            setShowCompatibility(false);
          }}
        >
          <div className="bg-card-gradient rounded-2xl p-6 max-w-sm w-full">
            <div className="text-center mb-4">
              <h3 className="text-lg font-heading text-galactic-white mb-2">
                Cosmic Compatibility
              </h3>
              <p className="text-galactic-white/70 font-body text-sm">
                with {user.name}
              </p>
            </div>
            
            <CompatibilityMeter 
              compatibility={compatibility} 
              showDetails={true}
              size="lg"
            />
          </div>
        </motion.div>
      )}

      {/* Swipe Indicators */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{ opacity: useTransform(x, [50, 150], [0, 1]) }}
      >
        <div className="bg-green-500 text-white px-6 py-3 rounded-full font-bold text-lg transform rotate-12 shadow-lg">
          LIKE
        </div>
      </motion.div>
      
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{ opacity: useTransform(x, [-150, -50], [1, 0]) }}
      >
        <div className="bg-red-500 text-white px-6 py-3 rounded-full font-bold text-lg transform -rotate-12 shadow-lg">
          PASS
        </div>
      </motion.div>
    </motion.div>
  );
};

export default SwipeCard;
