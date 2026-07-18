import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { Card, Button, FAB } from 'react-native-paper';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api/v1';

interface Joke {
  id: string;
  joke: string;
  setup?: string;
  punchline?: string;
  category: string;
  source: string;
}

const JokeScreen: React.FC = () => {
  const [jokes, setJokes] = useState<Joke[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('general');

  const categories = ['general', 'programming', 'knock-knock', 'any'];

  const fetchJoke = async () => {
    setLoading(true);
    try {
      const endpoint =
        selectedCategory === 'any'
          ? `${API_BASE_URL}/jokes/joke`
          : `${API_BASE_URL}/jokes/joke/category/${selectedCategory}`;

      const response = await axios.get(endpoint);
      const newJoke = {
        id: Math.random().toString(),
        ...response.data,
      };
      setJokes([newJoke, ...jokes]);
    } catch (error) {
      console.error('Error fetching joke:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderJoke = ({ item }: { item: Joke }) => (
    <Card style={styles.jokeCard}>
      <Card.Content>
        <Text style={styles.jokeText}>{item.joke}</Text>
        <Text style={styles.source}>{item.source}</Text>
      </Card.Content>
    </Card>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Daily Jokes</Text>

      {/* Category Selector */}
      <View style={styles.categoryContainer}>
        {categories.map((cat) => (
          <TouchableOpacity
            key={cat}
            style={[
              styles.categoryButton,
              selectedCategory === cat && styles.categoryButtonActive,
            ]}
            onPress={() => setSelectedCategory(cat)}
          >
            <Text
              style={[
                styles.categoryText,
                selectedCategory === cat && styles.categoryTextActive,
              ]}
            >
              {cat}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Jokes List */}
      {loading ? (
        <ActivityIndicator size="large" color="#2196F3" style={styles.loader} />
      ) : (
        <FlatList
          data={jokes}
          renderItem={renderJoke}
          keyExtractor={(item) => item.id}
          style={styles.jokesList}
        />
      )}

      {/* FAB to get new joke */}
      <FAB
        style={styles.fab}
        icon="plus"
        label="Get Joke"
        onPress={fetchJoke}
        loading={loading}
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
  categoryContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    flexWrap: 'wrap',
  },
  categoryButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 8,
    marginBottom: 8,
    borderRadius: 20,
    backgroundColor: '#e0e0e0',
  },
  categoryButtonActive: {
    backgroundColor: '#2196F3',
  },
  categoryText: {
    color: '#666',
    fontSize: 12,
    fontWeight: '500',
  },
  categoryTextActive: {
    color: '#fff',
  },
  jokesList: {
    flex: 1,
  },
  jokeCard: {
    marginBottom: 12,
    elevation: 3,
  },
  jokeText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
    marginBottom: 8,
  },
  source: {
    fontSize: 12,
    color: '#999',
    fontStyle: 'italic',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

export default JokeScreen;
