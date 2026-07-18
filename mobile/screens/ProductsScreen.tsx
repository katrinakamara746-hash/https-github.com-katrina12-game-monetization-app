import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Card, Button, FAB } from 'react-native-paper';

const ProductsScreen: React.FC = () => {
  const [products, setProducts] = React.useState([
    {
      id: 1,
      name: 'Gold Pack',
      price: 4.99,
      type: 'consumable',
      active: true,
    },
    {
      id: 2,
      name: 'Premium Bundle',
      price: 9.99,
      type: 'non_consumable',
      active: true,
    },
  ]);

  const renderProduct = ({ item }: { item: any }) => (
    <Card style={styles.productCard}>
      <Card.Content>
        <View style={styles.productHeader}>
          <View>
            <Text style={styles.productName}>{item.name}</Text>
            <Text style={styles.productType}>{item.type}</Text>
          </View>
          <Text style={styles.productPrice}>${item.price}</Text>
        </View>
        <View style={styles.productActions}>
          <Button
            mode="outlined"
            size="small"
            onPress={() => console.log('Edit', item.id)}
          >
            Edit
          </Button>
          <Button
            mode="outlined"
            size="small"
            onPress={() => console.log('Delete', item.id)}
          >
            Delete
          </Button>
        </View>
      </Card.Content>
    </Card>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Products</Text>

      <FlatList
        data={products}
        renderItem={renderProduct}
        keyExtractor={(item) => item.id.toString()}
        style={styles.list}
      />

      <FAB
        style={styles.fab}
        icon="plus"
        label="Add Product"
        onPress={() => console.log('Add new product')}
      />
    </View>
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
  list: {
    flex: 1,
  },
  productCard: {
    marginBottom: 12,
    backgroundColor: '#fff',
  },
  productHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  productName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  productType: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
  },
  productPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2196F3',
  },
  productActions: {
    flexDirection: 'row',
    gap: 8,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

export default ProductsScreen;
