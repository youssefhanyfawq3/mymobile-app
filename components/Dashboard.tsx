import React, { useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

export default function Dashboard() {
  const router = useRouter();

  // Memoize the navigation function for better performance
  const handleNavigate = useCallback(() => {
    router.push('/Istighfar');
  }, [router]);

  // Calculate responsive sizes
  const titleSize = width * 0.15 > 48 ? 48 : width * 0.15;
  const statBoxWidth = width * 0.35 > 140 ? 140 : width * 0.35;
  const startButtonSize = width * 0.3 > 150 ? 150 : width * 0.3;

  return (
    <View style={styles.backgroundContainer}>
      <SafeAreaView style={styles.container}>
        <Text style={[styles.title, { fontSize: titleSize }]} accessibilityRole="header">استغفار</Text>
        <View style={styles.statsContainer}>
          <View style={[styles.statBox, { width: statBoxWidth }]}>
            <Text style={styles.statLabel}>إجمالي الاستغفار</Text>
            <Text style={styles.statValue}>1,234</Text>
          </View>
          <View style={[styles.statBox, { width: statBoxWidth }]}>
            <Text style={styles.statLabel}>متوسط الاستغفار الأسبوعي</Text>
            <Text style={styles.statValue}>56</Text>
          </View>
        </View>
        <TouchableOpacity
          style={[styles.startButton, { 
            width: startButtonSize, 
            height: startButtonSize, 
            borderRadius: startButtonSize / 2 
          }]}
          onPress={handleNavigate}
          accessibilityLabel="بدء الاستغفار"
          accessibilityRole="button"
        >
          <Feather name="play" size={startButtonSize * 0.4} color="white" />
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
  container: {
    flex: 1,
    backgroundColor: '#1a202c',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontWeight: 'bold',
    color: '#38a169',
    marginBottom: 40,
    textAlign: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    maxWidth: 500,
    marginBottom: 60,
    flexWrap: 'wrap',
  },
  statBox: {
    alignItems: 'center',
    marginVertical: 10,
    padding: 15,
    backgroundColor: 'rgba(56, 161, 105, 0.1)',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(56, 161, 105, 0.3)',
  },
  statLabel: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    marginBottom: 8,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#38a169',
    textAlign: 'center',
  },
  startButton: {
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
});