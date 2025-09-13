import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';

export default function Notifications() {
  const [dailyReminder, setDailyReminder] = useState(true);
  const [weeklyReminder, setWeeklyReminder] = useState(true);
  const [monthlyReminder, setMonthlyReminder] = useState(false);

  return (
    <View style={styles.backgroundContainer}>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Feather name="bell" size={32} color="#38a169" />
          <Text style={styles.headerTitle}>التنبيهات</Text>
        </View>
        
        <View style={styles.content}>
          <View style={styles.notificationSection}>
            <Text style={styles.sectionTitle}>التنبيهات المجدولة</Text>
            
            <View style={styles.notificationItem}>
              <View style={styles.notificationInfo}>
                <Text style={styles.notificationTitle}>تذكير يومي</Text>
                <Text style={styles.notificationDescription}>تذكيرك بالاستغفار كل يوم في الساعة 9 صباحاً</Text>
              </View>
              <Switch
                value={dailyReminder}
                onValueChange={setDailyReminder}
                trackColor={{ false: '#767577', true: '#38a169' }}
                thumbColor={dailyReminder ? '#f4f3f4' : '#f4f3f4'}
              />
            </View>
            
            <View style={styles.notificationItem}>
              <View style={styles.notificationInfo}>
                <Text style={styles.notificationTitle}>تذكير أسبوعي</Text>
                <Text style={styles.notificationDescription}>تقرير أسبوعي عن مرات الاستغفار</Text>
              </View>
              <Switch
                value={weeklyReminder}
                onValueChange={setWeeklyReminder}
                trackColor={{ false: '#767577', true: '#38a169' }}
                thumbColor={weeklyReminder ? '#f4f3f4' : '#f4f3f4'}
              />
            </View>
            
            <View style={styles.notificationItem}>
              <View style={styles.notificationInfo}>
                <Text style={styles.notificationTitle}>تذكير شهري</Text>
                <Text style={styles.notificationDescription}>تقرير شهري عن مرات الاستغفار</Text>
              </View>
              <Switch
                value={monthlyReminder}
                onValueChange={setMonthlyReminder}
                trackColor={{ false: '#767577', true: '#38a169' }}
                thumbColor={monthlyReminder ? '#f4f3f4' : '#f4f3f4'}
              />
            </View>
          </View>
          
          <View style={styles.notificationSection}>
            <Text style={styles.sectionTitle}>آخر التنبيهات</Text>
            
            <TouchableOpacity style={styles.historyItem}>
              <View style={styles.historyItemContent}>
                <Text style={styles.historyTitle}>تذكير الاستغفار</Text>
                <Text style={styles.historyTime}>منذ 2 ساعة</Text>
              </View>
              <Feather name="chevron-left" size={20} color="#38a169" />
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.historyItem}>
              <View style={styles.historyItemContent}>
                <Text style={styles.historyTitle}>تقرير أسبوعي</Text>
                <Text style={styles.historyTime}>منذ يومين</Text>
              </View>
              <Feather name="chevron-left" size={20} color="#38a169" />
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.historyItem}>
              <View style={styles.historyItemContent}>
                <Text style={styles.historyTitle}>تذكير الاستغفار</Text>
                <Text style={styles.historyTime}>منذ 5 أيام</Text>
              </View>
              <Feather name="chevron-left" size={20} color="#38a169" />
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
  notificationSection: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#38a169',
    marginBottom: 15,
  },
  notificationItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  notificationInfo: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 18,
    color: 'white',
    marginBottom: 5,
  },
  notificationDescription: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.7)',
  },
  historyItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  historyItemContent: {
    flex: 1,
  },
  historyTitle: {
    fontSize: 18,
    color: 'white',
    marginBottom: 5,
  },
  historyTime: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.7)',
  },
});