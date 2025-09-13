import React, { useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

export default function Dashboard() {
  const router = useRouter();

  // Memoize the navigation functions for better performance
  const handleNavigate = useCallback(() => {
    router.push('/Istighfar');
  }, [router]);

  const handleSettingsNavigate = useCallback(() => {
    router.push('/settings');
  }, [router]);

  const handleStatisticsNavigate = useCallback(() => {
    router.push('/statistics');
  }, [router]);

  const handleNotificationsNavigate = useCallback(() => {
    router.push('/notifications');
  }, [router]);

  // Calculate responsive sizes
  const titleSize = width * 0.15 > 48 ? 48 : width * 0.15;
  const statBoxWidth = width * 0.4 > 160 ? 160 : width * 0.4;
  const startButtonSize = width * 0.35 > 180 ? 180 : width * 0.35;

  return (
    <View style={styles.backgroundContainer}>
      <SafeAreaView style={styles.container}>
        <Text style={[styles.title, { fontSize: titleSize }]} accessibilityRole="header">استغفار</Text>
        
        <View style={styles.statsContainer}>
          <View style={[styles.statBox, { width: statBoxWidth }]}>
            <Feather name="bar-chart-2" size={32} color="#38a169" />
            <Text style={styles.statLabel}>إجمالي الاستغفار</Text>
            <Text style={styles.statValue}>1,234</Text>
          </View>
          <View style={[styles.statBox, { width: statBoxWidth }]}>
            <Feather name="trending-up" size={32} color="#38a169" />
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
        
        {/* Quick Access Tabs */}
        <View style={styles.quickAccessContainer}>
          <Text style={styles.quickAccessTitle}>الوصول السريع</Text>
          <View style={styles.quickAccessTabs}>
            <TouchableOpacity 
              style={styles.quickAccessTab}
              onPress={handleStatisticsNavigate}
            >
              <Feather name="bar-chart-2" size={32} color="#38a169" />
              <Text style={styles.quickAccessLabel}>الإحصائيات</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.quickAccessTab}
              onPress={handleNotificationsNavigate}
            >
              <Feather name="bell" size={32} color="#38a169" />
              <Text style={styles.quickAccessLabel}>التنبيهات</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.quickAccessTab}
              onPress={handleSettingsNavigate}
            >
              <Feather name="settings" size={32} color="#38a169" />
              <Text style={styles.quickAccessLabel}>الإعدادات</Text>
            </TouchableOpacity>
          </View>
        </View>
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
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontWeight: 'bold',
    color: '#38a169',
    marginBottom: 30,
    textAlign: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    maxWidth: 500,
    marginBottom: 40,
    flexWrap: 'wrap',
  },
  statBox: {
    alignItems: 'center',
    marginVertical: 10,
    padding: 20,
    backgroundColor: 'rgba(56, 161, 105, 0.1)',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: 'rgba(56, 161, 105, 0.3)',
  },
  statLabel: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    marginVertical: 8,
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
    marginBottom: 40,
  },
  quickAccessContainer: {
    width: '100%',
    alignItems: 'center',
  },
  quickAccessTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#38a169',
    marginBottom: 20,
  },
  quickAccessTabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    maxWidth: 500,
  },
  quickAccessTab: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(56, 161, 105, 0.1)',
    borderRadius: 15,
    padding: 20,
    width: 100,
    height: 100,
    borderWidth: 1,
    borderColor: 'rgba(56, 161, 105, 0.3)',
  },
  quickAccessLabel: {
    color: 'white',
    marginTop: 10,
    fontSize: 16,
    textAlign: 'center',
  },
});