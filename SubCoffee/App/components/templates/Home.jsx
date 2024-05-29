import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, View, Text, StyleSheet } from "react-native";
import axios from "axios";
import SearchBar from "../atoms/search/setSearchTerm";

function Home({ navigation }) {
  const [isLoading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const URL = 'https://reactnative.dev/movies.json';

  const fetchMovies = async () => {
    try {
      const response = await axios.get(URL);
      setMovies(response.data.movies);
      setFilteredMovies(response.data.movies); // Inicialmente, muestra todas las películas
      console.log(response.data.movies); 
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  // Función para filtrar las películas basadas en el término de búsqueda
  const handleSearch = (text) => {
    setSearchTerm(text);
    const filtered = movies.filter(movie =>
      movie.title.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredMovies(filtered);
  };

  return (
    <View style={styles.container}>
      <SearchBar searchTerm={searchTerm} setSearchTerm={handleSearch} />
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={filteredMovies}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              <Text style={styles.title}>Title: {item.title}</Text>
              <Text style={styles.releaseYear}>Release Year: {item.releaseYear}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 22,
  },
  itemContainer: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 14,
    color: '#666',
  },
  releaseYear: {
    fontSize: 14,
    color: '#666',
  },
});

export default Home;
