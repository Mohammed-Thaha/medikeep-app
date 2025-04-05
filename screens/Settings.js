import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Switch,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Settings = () => {
  const [notifications, setNotifications] = React.useState(true);
  const [darkMode, setDarkMode] = React.useState(false);
  const navigation = useNavigation();

  const handleLogout = () => {
    // Optional: clear async storage or user session here
    navigation.replace('Auth'); // Navigate to Login screen
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F5F9FF" />
      <Text style={styles.header}>⚙️ Settings</Text>

      {/* Profile Info */}
      <View style={styles.profileCard}>
        <Text style={styles.profileName}>👤 Thaha</Text>
        <Text style={styles.profileEmail}>thaha@gmail.com</Text>
      </View>

      {/* Setting Options */}
      <View style={styles.settingCard}>
        <Text style={styles.settingLabel}>🔔 Notifications</Text>
        <Switch
          value={notifications}
          onValueChange={() => setNotifications(!notifications)}
        />
      </View>

      <View style={styles.settingCard}>
        <Text style={styles.settingLabel}>🌙 Dark Mode</Text>
        <Switch
          value={darkMode}
          onValueChange={() => setDarkMode(!darkMode)}
        />
      </View>

      <View style={styles.settingCard}>
        <Text style={styles.settingLabel}>📱 App Version</Text>
        <Text style={styles.settingValue}>v1.0.0</Text>
      </View>

      {/* Logout */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>🚪 Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F9FF',
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#2F80ED',
    marginBottom: 25,
    textAlign: 'center',
  },
  profileCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    elevation: 2,
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  profileEmail: {
    fontSize: 14,
    color: '#777',
  },
  settingCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 18,
    marginBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 1,
  },
  settingLabel: {
    fontSize: 16,
    color: '#333',
  },
  settingValue: {
    fontSize: 15,
    color: '#888',
  },
  logoutButton: {
    marginTop: 30,
    backgroundColor: '#FF4B5C',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default Settings;
