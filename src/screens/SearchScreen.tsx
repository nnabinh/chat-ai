import React, { useState, useCallback } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Dimensions,
  ActivityIndicator,
  Text,
} from 'react-native';
import { useGetCharactersQuery } from '../store/api';
import CharacterCard from '../components/CharacterCard';
import { Character } from '../types';

const { height: screenHeight } = Dimensions.get('window');

const SearchScreen: React.FC = () => {
  const [page, setPage] = useState(0);
  const [allCharacters, setAllCharacters] = useState<Character[]>([]);
  const [hasMore, setHasMore] = useState(true);

  const { data, isLoading, isFetching } = useGetCharactersQuery(
    { page, limit: 3 },
    { skip: !hasMore }
  );

  React.useEffect(() => {
    if (data) {
      if (page === 0) {
        setAllCharacters(data.data);
      } else {
        setAllCharacters((prev) => [...prev, ...data.data]);
      }
      setHasMore(data.hasMore);
    }
  }, [data, page]);

  const loadMore = useCallback(() => {
    if (!isFetching && hasMore) {
      setPage((prev) => prev + 1);
    }
  }, [isFetching, hasMore]);

  const handleCharacterPress = (character: Character) => {
    console.log('Selected character:', character.name);
    // Here you could navigate to chat with this character
  };

  const renderCharacter = ({ item }: { item: Character }) => (
    <CharacterCard
      character={item}
      onPress={() => handleCharacterPress(item)}
    />
  );

  const renderFooter = () => {
    if (!isFetching) return null;
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#F43F3F" />
      </View>
    );
  };

  if (isLoading && page === 0) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#F43F3F" />
        <Text style={styles.loadingText}>Loading characters...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={allCharacters}
        renderItem={renderCharacter}
        keyExtractor={(item) => item.id}
        pagingEnabled
        showsVerticalScrollIndicator={false}
        snapToInterval={screenHeight}
        snapToAlignment="start"
        decelerationRate="fast"
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
        getItemLayout={(data, index) => ({
          length: screenHeight,
          offset: screenHeight * index,
          index,
        })}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#09090B',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#09090B',
  },
  loadingText: {
    color: '#FFFFFF',
    fontSize: 16,
    marginTop: 16,
  },
  loader: {
    paddingVertical: 20,
    alignItems: 'center',
  },
});

export default SearchScreen;
