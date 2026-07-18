import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { Card, ProgressBar } from 'react-native-paper';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api/v1';

interface AnalyticsSummary {
  total_revenue: number;
  total_transactions: number;
  total_active_products: number;
}

const AnalyticsScreen: React.FC = () => {
  const [summary, setSummary] = useState<AnalyticsSummary | null>(null);
  const [topProducts, setTopProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const token = 'your_jwt_token'; // Get from secure storage in real app
      const headers = { Authorization: `Bearer ${token}` };

      const [summaryRes, productsRes] = await Promise.all([
        axios.get(`${API_BASE_URL}/analytics/summary`, { headers }),
        axios.get(`${API_BASE_URL}/analytics/top-products`, { headers }),
      ]);

      setSummary(summaryRes.data);
      setTopProducts(productsRes.data.slice(0, 5));
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Analytics</Text>

      {/* Summary Cards */}
      <View style={styles.cardsContainer}>
        <Card style={styles.card}>
          <Card.Content>
            <Text style={styles.cardLabel}>Total Revenue</Text>
            <Text style={styles.cardValue}>
              ${summary?.total_revenue?.toFixed(2) || '0.00'}
            </Text>
          </Card.Content>
        </Card>

        <Card style={styles.card}>
          <Card.Content>
            <Text style={styles.cardLabel}>Transactions</Text>
            <Text style={styles.cardValue}>
              {summary?.total_transactions || 0}
            </Text>
          </Card.Content>
        </Card>

        <Card style={styles.card}>
          <Card.Content>
            <Text style={styles.cardLabel}>Active Products</Text>
            <Text style={styles.cardValue}>
              {summary?.total_active_products || 0}
            </Text>
          </Card.Content>
        </Card>
      </View>

      {/* Top Products */}
      <Text style={styles.sectionTitle}>Top Products</Text>
      {topProducts.map((product) => (
        <Card key={product.product_id} style={styles.productCard}>
          <Card.Content>
            <Text style={styles.productName}>{product.product_name}</Text>
            <View style={styles.productStats}>
              <Text style={styles.productStat}>
                Sales: {product.sales}
              </Text>
              <Text style={styles.productStat}>
                Revenue: ${product.revenue.toFixed(2)}
              </Text>
            </View>
            <ProgressBar
              progress={product.sales / 100}
              style={styles.progressBar}
            />
          </Card.Content>
        </Card>
      ))}
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
    marginBottom: 20,
    color: '#333',
  },
  cardsContainer: {
    marginBottom: 24,
  },
  card: {
    marginBottom: 12,
    backgroundColor: '#fff',
  },
  cardLabel: {
    fontSize: 12,
    color: '#999',
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  cardValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2196F3',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
    color: '#333',
  },
  productCard: {
    marginBottom: 12,
  },
  productName: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  productStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  productStat: {
    fontSize: 12,
    color: '#666',
  },
  progressBar: {
    height: 6,
    borderRadius: 3,
  },
});

export default AnalyticsScreen;
