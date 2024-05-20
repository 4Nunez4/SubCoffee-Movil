// Home.js
import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, View } from "react-native";
import axios from "axios";
import SearchBar from "../atoms/search/setSearchTerm";
import DataContainer from "../atoms/containers/container";


function Home({ navigation }) {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const listar = (id) => {
    navigation.navigate('Subas', { id });
    console.log('Holaaaa', id);
  };

  const URL = 'http://10.0.2.2:4000/subasta/listar';

  const getSubastaFetch = async () => {
    try {
      const response = await axios.get(URL);
      setData(response.data);
    } catch (error) {
      console.error('Error de Axios:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getSubastaFetch();
  }, []);

  const filteredData = data.filter(item =>
    item.descripcion_sub.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={filteredData}
          keyExtractor={(item) => item.pk_id_suba.toString()}
          renderItem={({ item }) => (
            <DataContainer
              imageUri={item.imagen_sub}
              startDate={item.fecha_inicio_sub}
              endDate={item.fecha_fin_sub}
              description={item.descripcion_sub}
              variety={item.fk_variedad}
              onPress={() => listar(item.pk_id_suba)}
            />
          )}
        />
      )}
    </View>
  );
}

export default Home;
