// App.js
import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Text, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';
import { ScaledSheet, scale } from 'react-native-size-matters';

const App = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/users');
        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemTitle}>{item.name}</Text>
      <Text style={styles.itemSubtitle}>{item.email}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
        <Text style={styles.loadingText}>Loading...</Text>
      ) : (
        <FlatList
          data={data}
          keyExtractor={item => item.id.toString()}
          renderItem={renderItem}
        />
      )}
    </SafeAreaView>
  );
};

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    padding: '10@s',
  },
  itemContainer: {
    backgroundColor: '#ffffff',
    padding: '15@s',
    marginBottom: '10@s',
    borderRadius: '5@s',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
  },
  itemTitle: {
    fontSize: '18@s',
    fontWeight: 'bold',
  },
  itemSubtitle: {
    fontSize: '14@s',
    color: '#555555',
  },
  loadingText: {
    fontSize: '20@s',
    textAlign: 'center',
    marginTop: '20@s',
  },
});

export default App;
