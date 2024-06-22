import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, View, Text, StyleSheet, TouchableOpacity, Image , ScrollView} from "react-native";
import axios from "axios";
import SearchBar from "../atoms/search/setSearchTerm";
import { IP } from "../../Api/context/ip";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomModal from "../modal/modal";
import LinkBoton from "../atoms/button/linkboton";
import Boton from "../atoms/button/Boton";

const ip = IP; 


function Home({ navigation }) {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false)
  const [selectSubasta, setSelectSubasta] = useState(null)
  const [searchTerm, setSearchTerm] = useState('');


  
// //Aseguracion del login
//   useEffect(() => {
//     const checkSession = async () => {
//       try {
//         const token = await AsyncStorage.getItem('token');
//         if (token) {
        
//           await getSubastaAxios(token);
//         } else {
         
//           navigation.navigate('FirstPage');
//         }
//       } catch (error) {
//         console.log('Error al verificar la sesión:', error);

//       }
//     };

//     checkSession();
//   }, []);



  const URL = `${ip}/v1/subasta`;

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
      item.descripcion_sub.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setData(filtered);
  };

  //modal que aparece al seleccionar una subasta
  const handleSubastaPress = (subasta) => {
    setSelectSubasta(subasta);
    setShowModal(true)
  }
  const handleModalClose = () => {
    setShowModal(false);
  };
  const handlePressSubasta = () => {
    navigation.navigate('Ofertar')
  }
  
  return (
    <View style={styles.container}>
    {/* <ScrollView> */}
      <View style={styles.searchContainer}>
        <SearchBar searchTerm={searchTerm} setSearchTerm={handleSearch} value={searchTerm} />
      </View>

      
      {isLoading ? (
          <ActivityIndicator style={{ marginTop: 20 }} />
        ) : (
          <FlatList
            data={data}
            keyExtractor={(item) => item.pk_id_sub.toString()}

               /*    keyExtractor={(item) => toString(item.pk_id_sub) } */

                  renderItem={({item}) => (
                    <TouchableOpacity onPress={() => handleSubastaPress(item)}>
                    <View style={styles.etiqueta}>

                    {/* <Text style={styles.Text1}>Subasta</Text> */}

                      
                    {/* {data.map((item) => (
                      <View key={item.pk_cedula_user}>
                       <Text>Hola: {item.pk_cedula_user} </Text> 
                      </View>
                    ))} */}
                    
                    <Text style={styles.Text}>
                      VARIEDAD: {item.nombre_tipo_vari}
                    </Text>

                    <Text style={styles.Text}>
                      <Image 
                        source={{ uri:`${ip}/img/subasta/${item.imagen_sub}` }}
                        style={{ width: 150, height: 150 }}
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

                   
                    <Text  style={styles.Text}>
                      VENDEDOR: {item.nombre_user}
                    </Text> 




                   {/*  <TouchableOpacity  style={styles.button} onPress={()=> listar(item.pk_id_sub)}>
                      <Text style={styles.Text}>Ver mas +</Text>
                    </TouchableOpacity> */}

                    </View>
                    </TouchableOpacity>
            )}
          />
        )}
      {/* </ScrollView> */}
      
      
      <CustomModal
        visible={showModal}
        onClose={handleModalClose}
        title="Detalles de la subasta"
      >
        <View>
          <Text style={styles.Text}>
            VARIEDAD: {selectSubasta?.nombre_tipo_vari}
          </Text>
          <Image
            source={{ uri: `${ip}/img/subasta/${selectSubasta?.imagen_sub}` }}
            style={{ width: 250, height: 150 }}
          />
          <Text style={styles.Text}>VENDEDOR: {selectSubasta?.nombre_user}</Text>
          <Text style={styles.Text}>
            FECHA INICIO: {new Date(selectSubasta?.fecha_inicio_sub).toLocaleDateString()}
          </Text>
          <Text style={styles.Text}>
            FECHA FIN: {new Date(selectSubasta?.fecha_fin_sub).toLocaleDateString()}
          </Text>
          <Text style={styles.Text}>
            DESCRIPCION: {selectSubasta?.descripcion_sub}
          </Text>
          <Boton press={handlePressSubasta} title="Ofertar" />
        </View>
      </CustomModal>
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
    fontSize: 14,
    fontStyle: 'normal',
    marginHorizontal: 10,
    padding: 5,
    color: '#000',
  },
  Text1: {
    fontSize: 19,
    fontStyle: 'normal',
    padding: 5,
    color: '#000',
  },
  etiqueta:{
    padding: 5,
    borderRadius: 10,
    marginHorizontal: 10,
    marginBottom: 20,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 8,
    // borderWidth:1,
    // borderColor:'gray'
  }
});

export default Home;
