import React, { useState, useRef, useEffect, useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, Dimensions, Easing } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Haptics from 'expo-haptics';
import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width, height } = Dimensions.get('window');

// More realistic snowflake component with six-pointed star shape - memoized for performance
const Snowflake = React.memo(({ animation, size, left, opacity }: { 
  animation: Animated.Value; 
  size: number; 
  left: number; 
  opacity: number; 
}) => {
  // Create a more realistic snowflake using multiple overlapping lines
  return (
    <Animated.View
      style={[
        styles.snowflakeContainer,
        {
          left,
          top: -size,
          opacity,
          transform: [{ translateY: animation }],
        },
      ]}
    >
      {/* Central circle */}
      <View style={[
        styles.snowflakeCenter,
        {
          width: size * 0.4,
          height: size * 0.4,
          borderRadius: size * 0.2,
        }
      ]} />
      
      {/* Six arms of the snowflake */}
      <View style={[
        styles.snowflakeArm,
        {
          width: size * 0.8,
          height: size * 0.15,
          top: size * 0.125,
          left: size * 0.1,
        }
      ]} />
      
      <View style={[
        styles.snowflakeArm,
        {
          width: size * 0.8,
          height: size * 0.15,
          top: size * 0.125,
          left: size * 0.1,
          transform: [{ rotate: '60deg' }],
        }
      ]} />
      
      <View style={[
        styles.snowflakeArm,
        {
          width: size * 0.8,
          height: size * 0.15,
          top: size * 0.125,
          left: size * 0.1,
          transform: [{ rotate: '120deg' }],
        }
      ]} />
      
      {/* Small branches on each arm */}
      <View style={[
        styles.snowflakeBranch,
        {
          width: size * 0.3,
          height: size * 0.1,
          top: -size * 0.05,
          left: size * 0.15,
        }
      ]} />
      
      <View style={[
        styles.snowflakeBranch,
        {
          width: size * 0.3,
          height: size * 0.1,
          top: -size * 0.05,
          left: size * 0.15,
          transform: [{ rotate: '60deg' }],
        }
      ]} />
      
      <View style={[
        styles.snowflakeBranch,
        {
          width: size * 0.3,
          height: size * 0.1,
          top: -size * 0.05,
          left: size * 0.15,
          transform: [{ rotate: '120deg' }],
        }
      ]} />
    </Animated.View>
  );
});

// Improved snowfall background with better performance and cleanup
const SnowfallBackground = () => {
  type SnowflakeType = {
    animation: Animated.Value;
    size: number;
    left: number;
    opacity: number;
    duration: number;
  };
  
  const snowflakes = useRef<SnowflakeType[]>([]);
  const animationRefs = useRef<number[]>([]);
  
  useEffect(() => {
    // Initialize snowflakes only once
    if (snowflakes.current.length === 0) {
      snowflakes.current = Array.from({ length: 12 }, (_, i) => {
        const size = Math.random() * 12 + 8;
        const left = Math.random() * (width - size);
        const opacity = Math.random() * 0.7 + 0.3;
        const animation = new Animated.Value(-size);
        const duration = 10000 + Math.random() * 10000;
        
        // Store reference to timeout for cleanup
        const timeoutId = setTimeout(() => {
          Animated.loop(
            Animated.sequence([
              Animated.timing(animation, {
                toValue: height + size,
                duration: duration,
                easing: Easing.linear,
                useNativeDriver: true,
                isInteraction: false, // Prevents blocking interaction handling
              }),
              Animated.timing(animation, {
                toValue: -size,
                duration: 0,
                useNativeDriver: true,
              }),
            ])
          ).start();
        }, i * 200) as unknown as number;
        
        animationRefs.current.push(timeoutId);
        return { animation, size, left, opacity, duration };
      });
    }
    
    // Cleanup function
    return () => {
      // Clear all timeouts
      animationRefs.current.forEach(timeoutId => clearTimeout(timeoutId));
      
      // Stop all animations
      snowflakes.current.forEach(snowflake => {
        snowflake.animation.removeAllListeners();
      });
    };
  }, []);

  return (
    <View style={styles.snowfallContainer} pointerEvents="none">
      {snowflakes.current.map((snowflake, index) => (
        <Snowflake
          key={index}
          animation={snowflake.animation}
          size={snowflake.size}
          left={snowflake.left}
          opacity={snowflake.opacity}
        />
      ))}
    </View>
  );
};

export default function Istighfar() {
  const [count, setCount] = useState(0);
  const scale = useRef(new Animated.Value(1)).current;
  const router = useRouter();

  // Load count from AsyncStorage when component mounts
  useEffect(() => {
    const loadCount = async () => {
      try {
        const savedCount = await AsyncStorage.getItem('istighfar_count');
        if (savedCount !== null) {
          setCount(parseInt(savedCount, 10));
        }
      } catch (error) {
        console.error('Error loading count from AsyncStorage:', error);
      }
    };

    loadCount();
  }, []);

  // Save count to AsyncStorage whenever it changes
  useEffect(() => {
    const saveCount = async () => {
      try {
        await AsyncStorage.setItem('istighfar_count', count.toString());
        
        // Update daily statistics
        const today = new Date().toISOString().split('T')[0]; // Get date in YYYY-MM-DD format
        const dailyStats = await AsyncStorage.getItem(`daily_stats_${today}`);
        const currentDailyCount = dailyStats ? parseInt(dailyStats, 10) : 0;
        
        await AsyncStorage.setItem(`daily_stats_${today}`, (currentDailyCount + 1).toString());
      } catch (error) {
        console.error('Error saving count to AsyncStorage:', error);
      }
    };

    saveCount();
  }, [count]);

  // Calculate responsive sizes
  const buttonSize = width * 0.45 > 220 ? 220 : width * 0.45;
  const counterSize = width * 0.25 > 80 ? 80 : width * 0.25;

  // Memoize the press handler functions for better performance
  const handlePress = useCallback(() => {
    // Add haptic feedback
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    
    setCount(prevCount => prevCount + 1);
    
    // Using spring animation for a more natural feel
    Animated.sequence([
      Animated.spring(scale, {
        toValue: 1.2,
        friction: 3,
        tension: 100,
        useNativeDriver: true,
      }),
      Animated.spring(scale, {
        toValue: 1,
        friction: 5,
        tension: 100,
        useNativeDriver: true,
      }),
    ]).start();
  }, [scale]);

  const handleReset = useCallback(() => {
    // Add haptic feedback for reset
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    
    // Add a small animation when resetting
    setCount(0);
    Animated.sequence([
      Animated.timing(scale, {
        toValue: 0.8,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.spring(scale, {
        toValue: 1,
        friction: 5,
        tension: 100,
        useNativeDriver: true,
      }),
    ]).start();
  }, [scale]);

  const handleSettings = useCallback(() => {
    router.push('/settings');
  }, [router]);

  return (
    <View style={styles.backgroundContainer}>
      <SnowfallBackground />
      <SafeAreaView style={styles.container}>
        {/* Settings button */}
        <TouchableOpacity style={styles.settingsButton} onPress={handleSettings}>
          <Feather name="settings" size={24} color="white" />
        </TouchableOpacity>
        
        <Text style={[styles.counter, { fontSize: counterSize }]} accessibilityRole="header">
          {count.toLocaleString()}
        </Text>
        
        <Animated.View style={[styles.buttonContainer, { transform: [{ scale }] }]}>
          <TouchableOpacity 
            style={[styles.button, { 
              width: buttonSize, 
              height: buttonSize, 
              borderRadius: buttonSize / 2 
            }]}
            onPress={handlePress}
            accessibilityLabel="اضغط لتسجيل استغفار"
            accessibilityRole="button"
            activeOpacity={0.7}
          >
            <Text style={[styles.buttonText, { fontSize: buttonSize * 0.12 }]}>استغفر الله</Text>
          </TouchableOpacity>
        </Animated.View>
        
        <TouchableOpacity 
          style={styles.resetButton} 
          onPress={handleReset}
          accessibilityLabel="إعادة تعيين العداد"
          accessibilityRole="button"
          activeOpacity={0.7}
        >
          <Feather name="refresh-ccw" size={20} color="white" style={styles.resetIcon} />
          <Text style={styles.resetButtonText}>إعادة تعيين</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  backgroundContainer: {
    flex: 1,
    backgroundColor: '#1a202c',
  },
  snowfallContainer: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1,
  },
  snowflakeContainer: {
    position: 'absolute',
    zIndex: 1,
  },
  snowflakeCenter: {
    position: 'absolute',
    backgroundColor: '#38a169',
  },
  snowflakeArm: {
    position: 'absolute',
    backgroundColor: '#38a169',
    borderRadius: 2,
  },
  snowflakeBranch: {
    position: 'absolute',
    backgroundColor: '#38a169',
    borderRadius: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    zIndex: 2,
  },
  settingsButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 3,
    backgroundColor: 'rgba(56, 161, 105, 0.3)',
    borderRadius: 20,
    padding: 12,
  },
  counter: {
    fontWeight: 'bold',
    color: '#38a169',
    marginBottom: 40,
    textAlign: 'center',
    zIndex: 2,
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },
  button: {
    backgroundColor: '#38a169',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  buttonText: {
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  resetButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 40,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 24,
    backgroundColor: '#4a5568',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
    zIndex: 2,
  },
  resetIcon: {
    marginRight: 8,
  },
  resetButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
});