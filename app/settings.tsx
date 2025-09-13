import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Settings() {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const [sound, setSound] = useState(true);

  return (
    <View style={styles.backgroundContainer}>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Feather name="settings" size={32} color="#38a169" />
          <Text style={styles.headerTitle}>الإعدادات</Text>
        </View>
        
        <View style={styles.content}>
          {/* Notifications Setting */}
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Feather name="bell" size={24} color="#38a169" />
              <Text style={styles.settingText}>التنبيهات</Text>
            </View>
            <Switch
              value={notifications}
              onValueChange={setNotifications}
              trackColor={{ false: '#767577', true: '#38a169' }}
              thumbColor={notifications ? '#f4f3f4' : '#f4f3f4'}
            />
          </View>
          
          {/* Dark Mode Setting */}
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Feather name="moon" size={24} color="#38a169" />
              <Text style={styles.settingText}>الوضع الليلي</Text>
            </View>
            <Switch
              value={darkMode}
              onValueChange={setDarkMode}
              trackColor={{ false: '#767577', true: '#38a169' }}
              thumbColor={darkMode ? '#f4f3f4' : '#f4f3f4'}
            />
          </View>
          
          {/* Sound Setting */}
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Feather name="volume-2" size={24} color="#38a169" />
              <Text style={styles.settingText}>الصوت</Text>
            </View>
            <Switch
              value={sound}
              onValueChange={setSound}
              trackColor={{ false: '#767577', true: '#38a169' }}
              thumbColor={sound ? '#f4f3f4' : '#f4f3f4'}
            />
          </View>
          
          {/* Statistics */}
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuItemInfo}>
              <Feather name="bar-chart-2" size={24} color="#38a169" />
              <Text style={styles.menuItemText}>الإحصائيات</Text>
            </View>
            <Feather name="chevron-left" size={24} color="#38a169" />
          </TouchableOpacity>
          
          {/* Help */}
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuItemInfo}>
              <Feather name="help-circle" size={24} color="#38a169" />
              <Text style={styles.menuItemText}>المساعدة</Text>
            </View>
            <Feather name="chevron-left" size={24} color="#38a169" />
          </TouchableOpacity>
          
          {/* About */}
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuItemInfo}>
              <Feather name="info" size={24} color="#38a169" />
              <Text style={styles.menuItemText}>عن التطبيق</Text>
            </View>
            <Feather name="chevron-left" size={24} color="#38a169" />
          </TouchableOpacity>
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
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingText: {
    fontSize: 18,
    color: 'white',
    marginRight: 15,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  menuItemInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemText: {
    fontSize: 18,
    color: 'white',
    marginRight: 15,
  },
});