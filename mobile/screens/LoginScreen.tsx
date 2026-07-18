import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Button, TextInput, Card } from 'react-native-paper';

const LoginScreen: React.FC = ({ navigation }: any) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
      // Call login API
      console.log('Login with:', email, password);
      // After successful login, navigate to main app
      navigation?.replace('Main');
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.logoContainer}>
        <Text style={styles.logo}>🎮</Text>
        <Text style={styles.title}>Game Monetization</Text>
        <Text style={styles.subtitle}>Manage your game revenue</Text>
      </View>

      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.formTitle}>Login</Text>

          <TextInput
            label="Email"
            value={email}
            onChangeText={setEmail}
            mode="outlined"
            keyboardType="email-address"
            style={styles.input}
            autoCapitalize="none"
          />

          <TextInput
            label="Password"
            value={password}
            onChangeText={setPassword}
            mode="outlined"
            secureTextEntry
            style={styles.input}
          />

          <Button
            mode="contained"
            onPress={handleLogin}
            loading={loading}
            style={styles.loginButton}
          >
            Login
          </Button>

          <Button
            mode="text"
            onPress={() => console.log('Navigate to signup')}
            style={styles.signupButton}
          >
            Don't have an account? Sign up
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
  },
  logoContainer: {
    alignItems: 'center',
    paddingVertical: 60,
    paddingHorizontal: 16,
  },
  logo: {
    fontSize: 64,
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#999',
  },
  card: {
    marginHorizontal: 16,
    marginBottom: 32,
  },
  formTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  input: {
    marginBottom: 16,
  },
  loginButton: {
    marginTop: 20,
    paddingVertical: 8,
  },
  signupButton: {
    marginTop: 12,
  },
});

export default LoginScreen;
