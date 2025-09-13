import { ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Root({ children }: { children: React.ReactNode }) {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <SafeAreaView edges={['top', 'bottom']} style={styles.safeArea}>
        {children}
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1a202c', // Match your app's dark background color
  },
  contentContainer: {
    backgroundColor: '#1a202c',
    minHeight: '100%',
  },
  safeArea: {
    backgroundColor: '#1a202c',
    flex: 1,
  },
});