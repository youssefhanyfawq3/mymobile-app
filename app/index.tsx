import Dashboard from '../components/Dashboard';
import { View, StyleSheet } from 'react-native';

export default function Index() {
  return (
    <View style={styles.backgroundContainer}>
      <Dashboard />
    </View>
  );
}

const styles = StyleSheet.create({
  backgroundContainer: {
    flex: 1,
    backgroundColor: '#1a202c',
  },
});