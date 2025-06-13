import React, { useEffect, useState } from 'react';
import {
  FlatList,
  ActivityIndicator,
  StyleSheet,
  View,
} from 'react-native';
import { Image } from 'expo-image';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

interface Country {
  cca2: string;
  name: {
    common: string;
  };
}

export default function HomeScreen() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all?fields=name,cca2')
      .then((res) => {
        if (!res.ok) {
          throw new Error('Erro na API');
        }
        return res.json();
      })
      .then((data) => {
        setCountries(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Erro ao buscar países:', error);
        setLoading(false);
      });
  }, []);

  const renderHeader = () => (
    <>
      <View style={styles.parallaxHeader}>
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
          contentFit="cover"
        />
      </View>

      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Países do Mundo</ThemedText>
      </ThemedView>
    </>
  );

  return (
    <FlatList
      data={countries}
      keyExtractor={(item) => item.cca2}
      contentContainerStyle={styles.content}
      ListHeaderComponent={
        loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          renderHeader()
        )
      }
      renderItem={({ item }) => (
        <ThemedText style={styles.userItem}>{item.name.common}</ThemedText>
      )}
    />
  );
}

const styles = StyleSheet.create({
  parallaxHeader: {
    height: 180,
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    marginBottom: 16,
    backgroundColor: '#A1CEDC',
    overflow: 'hidden',
  },
  reactLogo: {
    height: 178,
    width: 290,
    position: 'absolute',
    bottom: 0,
    left: 0,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 10,
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 16,
  },
  userItem: {
    fontSize: 16,
    marginBottom: 8,
  },
});
