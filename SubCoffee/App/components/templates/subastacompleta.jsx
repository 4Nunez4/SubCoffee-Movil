import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Text, View, StyleSheet } from "react-native";

function SubastaCompleta(){

  const [isLoading, setLoadig] = useState(true);
  const [data, setData] = useState([])

  const URL = 'http://10.193.156.73:4000/subasta/listar'

      const getSubasta = async () => {
          try {
            const response = await fetch(URL)
            const json = await response.json()
            setData(json)
          } catch (error) {
            console.error(error)
          } finally {
            setLoadig(false)
          }
      }
        useEffect(() => {
          getSubasta()
        }, [])
      
        return (
          <View style={estilo.container}>
            {isLoading ? (
              <ActivityIndicator/>
            ) : (
              <FlatList 
              data={data}
              keyExtractor={({id}) => id}
              renderItem={({item}) => (

                <View>
                <Text style={estilo.Text}>
                  Fecha inicio: {item.fecha_inicio}
                </Text>

                <Text style={estilo.Text}>
                  Fecha fin: {item.fecha_fin}
                </Text>
            
                <Text style={estilo.Text}>
                  Precio inicial: {item.precio_inicio}
                </Text>

                <Text style={estilo.Text}>
                  Precio Final: {item.precio_fin}
                </Text>

                <Text style={estilo.Text}>
                  Unidad Peso: {item.unidad_peso}
                </Text>
                
                <Text style={estilo.Text}>
                  Imagen: {item.imagen}
                </Text>

                <Text style={estilo.Text}>
                  Certificado: {item.cerificado}
                </Text>

                <Text style={estilo.Text}>
                  Variedad: {item. fk_variedad}
                </Text>

                </View>
              )}
              />
            )}
          </View>
        )
  }

  const estilo = StyleSheet.create({
    container: {
    backgroundColor:'#F5FCFF',
    },
    Text: {
    fontSize: 15,
    fontStyle: 'normal',
    marginHorizontal: 20,
    padding:10,
    color: '#000'
  },
});

export default SubastaCompleta