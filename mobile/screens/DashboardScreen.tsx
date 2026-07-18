import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Card, Button, Divider } from 'react-native-paper';

const DashboardScreen: React.FC = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.welcomeTitle}>Welcome to Game Monetization</Text>
      <Text style={styles.subtitle}>Manage your game revenue and analytics</Text>

      <View style={styles.statsContainer}>
        <Card style={styles.statCard}>
          <Card.Content>
            <Text style={styles.statValue}>$5,234</Text>
            <Text style={styles.statLabel}>This Month Revenue</Text>
          </Card.Content>
        </Card>

        <Card style={styles.statCard}>
          <Card.Content>
            <Text style={styles.statValue}>1,847</Text>
            <Text style={styles.statLabel}>Total Players</Text>
          </Card.Content>
        </Card>
      </View>

      <Divider style={styles.divider} />

      <Text style={styles.sectionTitle}>Quick Actions</Text>
      <Button
        mode="contained"
        onPress={() => console.log('Navigate to products')}
        style={styles.actionButton}
      >
        Add New Product
      </Button>
      <Button
        mode="contained"
        onPress={() => console.log('Navigate to analytics')}
        style={styles.actionButton}
      >
        View Detailed Analytics
      </Button>
      <Button
        mode="outlined"
        onPress={() => console.log('View settings')}
        style={styles.actionButton}
      >
        Settings
      </Button>

      <Text style={styles.sectionTitle}>Recent Transactions</Text>
      <Card style={styles.transactionCard}>
        <Card.Content>
          <View style={styles.transactionRow}>
            <Text style={styles.transactionName}>Premium Bundle</Text>
            <Text style={styles.transactionAmount}>+$9.99</Text>
          </View>
          <Text style={styles.transactionTime}>2 hours ago</Text>
        </Card.Content>
      </Card>

      <Card style={styles.transactionCard}>
        <Card.Content>
          <View style={styles.transactionRow}>
            <Text style={styles.transactionName}>Monthly Subscription</Text>
            <Text style={styles.transactionAmount}>+$4.99</Text>
          </View>
          <Text style={styles.transactionTime}>5 hours ago</Text>
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
  welcomeTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#999',
    marginBottom: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statCard: {
    flex: 1,
    marginHorizontal: 6,
    backgroundColor: '#fff',
  },
  statValue: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2196F3',
    marginBottom: 8,
  },
  statLabel: {
    fontSize: 12,
    color: '#999',
  },
  divider: {
    marginVertical: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 20,
    marginBottom: 12,
  },
  actionButton: {
    marginBottom: 12,
  },
  transactionCard: {
    marginBottom: 12,
    backgroundColor: '#fff',
  },
  transactionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  transactionName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  transactionAmount: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#4caf50',
  },
  transactionTime: {
    fontSize: 12,
    color: '#999',
  },
});

export default DashboardScreen;
