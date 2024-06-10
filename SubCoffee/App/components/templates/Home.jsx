import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import axios from "axios";
import SearchBar from "../atoms/search/setSearchTerm";
import { IP } from "../../Api/context/ip";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ip = IP; 

function Home({ navigation }) {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const checkSession = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (token) {
        
          await getSubastaAxios(token);
        } else {
         
          navigation.navigate('LoginScreen');
        }
      } catch (error) {
        console.log('Error al verificar la sesión:', error);

      }
    };

    checkSession();
  }, []);



  const URL = `http://${ip}:4000/subasta/listar`;

  const getSubastaAxios = async () => {
    try {
      const token = await AsyncStorage.getItem('token');

      const response = await axios.get(URL,{
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setData(response.data);

    } catch (error) {
      console.log('Error en el servidor: ', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getSubastaAxios();
  }, []);

  const handleSearch = (text) => {
    setSearchTerm(text);
    const filtered = data.filter(item =>
      item.descripcion_sub.toLowerCase().includes(text.toLowerCase())
    );
    setData(filtered);
  };
  
  return (
    <View style={styles.container}>
      
      <SearchBar searchTerm={searchTerm} setSearchTerm={handleSearch} />
      
      {isLoading ? (
                  <ActivityIndicator/>
                ) : (
                  <FlatList 
                  data={data}
                  keyExtractor={(item) => item.pk_id_sub.toString()}

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
                        source={{ uri:`http://${ip}:4000/img/subasta/${item.imagen_sub}` }}
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
    padding: 10,
    color: '#000',
  },
  Text1: {
    fontSize: 19,
    fontStyle: 'normal',
    padding: 5,
    color: '#000',
  },
});

export default Home;
