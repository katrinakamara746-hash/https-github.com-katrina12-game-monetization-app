import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Button, TextInput, Card, Divider } from 'react-native-paper';

const AccountScreen: React.FC = () => {
  const [name, setName] = React.useState('John Doe');
  const [email, setEmail] = React.useState('john@example.com');
  const [editMode, setEditMode] = React.useState(false);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Account Settings</Text>

      <Card style={styles.profileCard}>
        <Card.Content>
          <Text style={styles.sectionTitle}>Profile</Text>

          {editMode ? (
            <>
              <TextInput
                label="Full Name"
                value={name}
                onChangeText={setName}
                mode="outlined"
                style={styles.input}
              />
              <TextInput
                label="Email"
                value={email}
                onChangeText={setEmail}
                mode="outlined"
                style={styles.input}
                keyboardType="email-address"
              />
              <Button
                mode="contained"
                onPress={() => setEditMode(false)}
                style={styles.button}
              >
                Save Changes
              </Button>
            </>
          ) : (
            <>
              <View style={styles.infoRow}>
                <Text style={styles.label}>Name:</Text>
                <Text style={styles.value}>{name}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.label}>Email:</Text>
                <Text style={styles.value}>{email}</Text>
              </View>
              <Button
                mode="outlined"
                onPress={() => setEditMode(true)}
                style={styles.button}
              >
                Edit Profile
              </Button>
            </>
          )}
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.sectionTitle}>Security</Text>
          <Button
            mode="outlined"
            onPress={() => console.log('Change password')}
            style={styles.button}
          >
            Change Password
          </Button>
          <Button
            mode="outlined"
            onPress={() => console.log('Enable 2FA')}
            style={styles.button}
          >
            Enable 2-Factor Authentication
          </Button>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.sectionTitle}>App Settings</Text>
          <Button
            mode="outlined"
            onPress={() => console.log('Notifications')}
            style={styles.button}
          >
            Notification Settings
          </Button>
          <Button
            mode="outlined"
            onPress={() => console.log('Preferences')}
            style={styles.button}
          >
            Preferences
          </Button>
        </Card.Content>
      </Card>

      <Divider style={styles.divider} />

      <Card style={styles.dangerCard}>
        <Card.Content>
          <Text style={styles.sectionTitle}>Danger Zone</Text>
          <Button
            mode="outlined"
            onPress={() => console.log('Logout')}
            style={[styles.button, styles.logoutButton]}
          >
            Logout
          </Button>
          <Button
            mode="outlined"
            onPress={() => console.log('Delete account')}
            style={[styles.button, styles.deleteButton]}
          >
            Delete Account
          </Button>
        </Card.Content>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  profileCard: {
    marginBottom: 16,
    backgroundColor: '#fff',
  },
  card: {
    marginBottom: 16,
    backgroundColor: '#fff',
  },
  dangerCard: {
    marginBottom: 32,
    backgroundColor: '#fff',
    borderColor: '#f44336',
    borderWidth: 1,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
    color: '#333',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  label: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  value: {
    fontSize: 14,
    color: '#333',
  },
  input: {
    marginBottom: 12,
  },
  button: {
    marginBottom: 8,
  },
  logoutButton: {
    borderColor: '#ff9800',
  },
  deleteButton: {
    borderColor: '#f44336',
  },
  divider: {
    marginVertical: 16,
  },
});

export default AccountScreen;
