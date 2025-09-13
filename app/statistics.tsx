import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';

export default function Statistics() {
  return (
    <View style={styles.backgroundContainer}>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Feather name="bar-chart-2" size={32} color="#38a169" />
          <Text style={styles.headerTitle}>الإحصائيات</Text>
        </View>
        
        <ScrollView style={styles.content}>
          <View style={styles.statCard}>
            <Text style={styles.statCardTitle}>إجمالي الاستغفار</Text>
            <Text style={styles.statCardValue}>1,234</Text>
            <Text style={styles.statCardDescription}>مرات الاستغفار منذ بداية التطبيق</Text>
          </View>
          
          <View style={styles.statCard}>
            <Text style={styles.statCardTitle}>متوسط الاستغفار اليومي</Text>
            <Text style={styles.statCardValue}>56</Text>
            <Text style={styles.statCardDescription}>مرات الاستغفار في اليوم</Text>
          </View>
          
          <View style={styles.statCard}>
            <Text style={styles.statCardTitle}>متوسط الاستغفار الأسبوعي</Text>
            <Text style={styles.statCardValue}>392</Text>
            <Text style={styles.statCardDescription}>مرات الاستغفار في الأسبوع</Text>
          </View>
          
          <View style={styles.statCard}>
            <Text style={styles.statCardTitle}>أعلى يوم</Text>
            <Text style={styles.statCardValue}>120</Text>
            <Text style={styles.statCardDescription}>مرات في يوم الجمعة</Text>
          </View>
          
          <View style={styles.statCard}>
            <Text style={styles.statCardTitle}>أطول فترة بدون استغفار</Text>
            <Text style={styles.statCardValue}>8 ساعات</Text>
            <Text style={styles.statCardDescription}>في تاريخ 15 رمضان</Text>
          </View>
        </ScrollView>
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
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(56, 161, 105, 0.3)',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#38a169',
    marginRight: 10,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  statCard: {
    backgroundColor: 'rgba(56, 161, 105, 0.1)',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(56, 161, 105, 0.3)',
  },
  statCardTitle: {
    fontSize: 18,
    color: 'white',
    marginBottom: 10,
  },
  statCardValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#38a169',
    marginBottom: 5,
  },
  statCardDescription: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.7)',
  },
});