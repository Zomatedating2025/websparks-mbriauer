import React from 'react';
import { motion } from 'framer-motion';

interface InterestsSelectorProps {
  selectedInterests: string[];
  onInterestsChange: (interests: string[]) => void;
  maxInterests?: number;
  required?: boolean;
}

const InterestsSelector: React.FC<InterestsSelectorProps> = ({
  selectedInterests,
  onInterestsChange,
  maxInterests = 3,
  required = false
}) => {
  const availableInterests = [
    // Spiritual & Mystical
    'Astrology', 'Meditation', 'Crystals', 'Tarot', 'Spirituality', 'Moon Phases',
    'Chakras', 'Energy Healing', 'Manifestation', 'Sacred Geometry',
    
    // Creative & Artistic
    'Photography', 'Art', 'Music', 'Dancing', 'Writing', 'Poetry',
    'Painting', 'Crafting', 'Design', 'Theater',
    
    // Active & Outdoorsy
    'Yoga', 'Hiking', 'Surfing', 'Rock Climbing', 'Running', 'Cycling',
    'Swimming', 'Beach Volleyball', 'Skiing', 'Camping',
    
    // Intellectual & Learning
    'Reading', 'Philosophy', 'Psychology', 'Science', 'History',
    'Languages', 'Podcasts', 'Documentaries', 'Learning', 'Research',
    
    // Social & Cultural
    'Travel', 'Cooking', 'Wine Tasting', 'Coffee', 'Festivals',
    'Concerts', 'Museums', 'Theater', 'Volunteering', 'Community',
    
    // Wellness & Health
    'Fitness', 'Nutrition', 'Mindfulness', 'Wellness', 'Self-Care',
    'Mental Health', 'Holistic Health', 'Aromatherapy', 'Massage', 'Spa',
    
    // Technology & Innovation
    'Tech', 'Gaming', 'AI', 'Startups', 'Innovation', 'Coding',
    'Digital Art', 'VR', 'Blockchain', 'Social Impact',
    
    // Nature & Environment
    'Gardening', 'Sustainability', 'Environment', 'Animals', 'Plants',
    'Conservation', 'Organic Living', 'Permaculture', 'Ecology', 'Climate'
  ];

  const handleInterestToggle = (interest: string) => {
    if (selectedInterests.includes(interest)) {
      // Remove interest
      onInterestsChange(selectedInterests.filter(i => i !== interest));
    } else if (selectedInterests.length < maxInterests) {
      // Add interest
      onInterestsChange([...selectedInterests, interest]);
    }
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="text-center">
        <h3 className="text-lg font-heading text-galactic-white mb-2">
          What sparks your cosmic curiosity?
        </h3>
        <p className="text-galactic-white/70 font-body text-sm">
          {required && selectedInterests.length === 0 && (
            <span className="text-galactic-gold">Select your interests to help us find better matches. </span>
          )}
          Choose up to {maxInterests} interests that define your cosmic journey.
        </p>
        <p className="text-galactic-white/50 font-body text-xs mt-1">
          {required ? 'Required' : 'Optional'} - You can always change these later
        </p>
      </div>

      {/* Selected Count */}
      <div className="flex justify-center">
        <div className="bg-cosmic-card rounded-full px-4 py-2">
          <span className="text-galactic-white font-body text-sm">
            {selectedInterests.length} / {maxInterests} selected
          </span>
        </div>
      </div>

      {/* Interests Grid */}
      <div className="grid grid-cols-2 gap-2 max-h-80 overflow-y-auto">
        {availableInterests.map((interest, index) => {
          const isSelected = selectedInterests.includes(interest);
          const canSelect = selectedInterests.length < maxInterests || isSelected;
          
          return (
            <motion.button
              key={interest}
              className={`p-3 rounded-lg border transition-all duration-300 text-left ${
                isSelected
                  ? 'border-galactic-gold bg-galactic-gold/20 text-galactic-white'
                  : canSelect
                    ? 'border-galactic-purple/30 bg-cosmic-card hover:border-galactic-purple hover:bg-galactic-purple/10 text-galactic-white/80'
                    : 'border-galactic-white/10 bg-cosmic-card/30 text-galactic-white/30 cursor-not-allowed'
              }`}
              onClick={() => canSelect && handleInterestToggle(interest)}
              disabled={!canSelect}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.02 }}
              whileHover={canSelect ? { scale: 1.02 } : {}}
              whileTap={canSelect ? { scale: 0.98 } : {}}
            >
              <div className="flex items-center justify-between">
                <span className="font-body text-sm">{interest}</span>
                {isSelected && (
                  <i className="bi bi-check-circle-fill text-galactic-gold"></i>
                )}
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Selected Interests Preview */}
      {selectedInterests.length > 0 && (
        <div className="bg-galactic-purple/20 rounded-lg p-4">
          <h4 className="text-galactic-white font-heading text-sm mb-2">Your Selected Interests:</h4>
          <div className="flex flex-wrap gap-2">
            {selectedInterests.map((interest) => (
              <span
                key={interest}
                className="bg-galactic-gold/20 text-galactic-gold px-2 py-1 rounded-full text-xs font-body"
              >
                {interest}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Skip Option */}
      {!required && selectedInterests.length === 0 && (
        <div className="text-center">
          <p className="text-galactic-white/60 font-body text-sm">
            You can skip this step and add interests later in your profile settings.
          </p>
        </div>
      )}
    </div>
  );
};

export default InterestsSelector;
