import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import axios from "axios";
import SearchBar from "../atoms/search/setSearchTerm";

const ip = "192.168.11.238"; 

function Home({ navigation }) {
  const [isLoading, setLoadig] = useState(true);
 /*  const [movies, setMovies] = useState([]); */
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [data, setData] = useState([])
  const [searchTerm, setSearchTerm] = useState('');
  /* const [searchTerm, setSearchTerm] = useState(''); */

  
   /* const URL = 'https://reactnative.dev/movies.json'; */
  // const URL = 'http://10.0.2.2:4000/v1/users';

  const URL = 'http://10.193.156.73:4000/subasta/listar'


  const getSubastaAxios = async () => {
    try {
      await axios.get(URL).then((response) => {
          console.log(response.data)
          setData(response.data)
      })

    } catch (error) {
      console.log('error servidor'+ error)
    } finally {
      setLoadig(false)
    }
}
  useEffect(() => {
    getSubastaAxios()
  }, [])


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
                  <ActivityIndicator/>
                ) : (
                  <FlatList 
                  data={data}
                  keyExtractor={({id}) => id}

               /*    keyExtractor={(item) => toString(item.pk_id_sub) } */

                  renderItem={({item}) => (
                    
                    <View > 

                    <Text style={styles.Text1}>Subasta</Text>

                      
                    {data.map((item) => (
                      <View key={item.pk_cedula_user}>
                       <Text>Hola: {item.pk_cedula_user} </Text> 
                      </View>
                    ))}
                    
                    <Text>
                      VENDEDOR: {item.nombre_user}
                    </Text> 

                    <Text style={styles.Text}>
                      <Image 
                        source={{ uri:`http://10.193.156.73:4000/img/subasta/${item.imagen_sub}` }}
                        style={{ width: 100, height: 100 }}
                      />
                    </Text>

                    <Text style={styles.Text}>
                      FECHA INICIO: {new Date(item.fecha_inicio_sub).toLocaleDateString()}
                    </Text>

                    <Text style={styles.Text}> 
                    FECHA FIN: {new Date(item.fecha_fin_sub).toLocaleDateString()}
                    </Text>

                    <Text style={styles.Text}>
                      DESCRIPCION:{item.descripcion_sub}
                    </Text>

                    <Text style={styles.Text}>
                      VARIEDAD: {item. fk_variedad}
                    </Text>



                   {/*  <TouchableOpacity  style={styles.button} onPress={()=> listar(item.pk_id_sub)}>
                      <Text style={styles.Text}>Ver mas +</Text>
                    </TouchableOpacity> */}

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
  Text: {
    fontSize: 15,
    fontStyle: 'normal',
    marginHorizontal: 20,
    padding:10,
    color: '#000',
  },
  Text1: {
    fontSize: 19,
    fontStyle: 'normal',
    padding: 5,
    color: '#000',
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
