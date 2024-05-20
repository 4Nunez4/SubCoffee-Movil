import React, { useState } from "react";
import { Alert, View, SafeAreaView, ScrollView, StyleSheet, TextInput, TouchableOpacity} from "react-native";
import { Button, Input, Text } from "react-native-elements";
import axios from "axios";
import { Calendar } from "react-native-calendario";
import Picker from "react-native-picker-select";
import { SelectList } from "react-native-dropdown-select-list";

const SubastaScreen = ({navigation}) => {

    const url="http://10.0.2.2:4000/subasta/registrar"
    

  /*   const [selected, setSelected] = useState("") */

    const [datos, setDatos] = useState({
        fecha_inicio_sub:'',
        fecha_fin_sub:'',
        imagen_sub:'',
        precio_inicial_sub:'',
        precio_final_sub:'',
        unidad_peso_sub:'',
        cantidad_sub:'',
        /* estado_sub:'', */
        certificado_sub:'',
        descripcion_sub:'',
        fk_variedad:'',
    })
    
    
    const handleInputChange = (name, value) => {
        setDatos({...datos, [name]: value})
    } 

    const enviarSubasta = () => {

        if(datos.fecha_inicio_sub == '' || datos.fecha_fin_sub == '' || datos.precio_inicial_sub == '' || datos.precio_final_sub == ''  || datos.cantidad_sub == '' || datos.descripcion_sub == '' ){

            Alert.alert('Ingrese todos los campos')
        }else{
            axios.post(url, datos ).then((response) => {
                console.log(response.data)
                /* let temp = response.data.map((item) => {
                    return{key:item.id, value:item.name}
                })
                setDatos(temp)  */

                if(response.status == 200){
                    Alert.alert('datos registrados')
                }
            })
            .catch((error) => {
                console.log(error)
            })

            setDatos({
                fecha_inicio_sub:'',
                fecha_fin_sub:'',
                imagen_sub:'',
                precio_inicial_sub:'',
                precio_final_sub:'',
                unidad_peso_sub:'',
                cantidad_sub:'',
                /* estado_sub:'', */
                certificado_sub:'',
                descripcion_sub:'',
                fk_variedad:'',
            })
            navigation.navigate("Home")
        }
    }

    return(
        <SafeAreaView>
        <ScrollView>
        <View style={pickerSelect.container} >
{/* 
         <Text>Fecha inicio</Text>
            <DatePicker
                date={datos.fecha_inicio_sub ? new Date(datos.fecha_inicio_sub) : new Date()}
                mode= "date"
                format = "YYYY-MM-DD"
                onDateChange={(fechaI) => setDatos({...datos,fecha_inicio:fechaI})}
            />  */}

            
  {/*               <Calendar 
                onDayPress={(day) => {
                    setDatos({...datos,fecha_inicio_sub:day.dateString})
                }}
                markedDates={{
                    [datos.fecha_inicio_sub]:{selected:true,selectedColor:'black'}
                }}
                /> */}
        
  
            <Input style={pickerSelect.inputIOS}
            placeholder="Fecha inicio" 
            value={datos.fecha_inicio_sub} 
            onChangeText={(fechaI) => setDatos({...datos,fecha_inicio_sub:fechaI})}
            errorMessage={datos.fecha_inicio_sub === ''?'Campo es obligatorio': null}
            /> 

            <Input style={pickerSelect.inputIOS}
            placeholder="Fecha finalización"  
            value={datos.fecha_fin_sub}
            onChangeText={(fechaF) => setDatos({...datos,fecha_fin_sub:fechaF})}
            
            /> 

        <Picker style={pickerSelect.inputIOS}
            onValueChange={(value) => handleInputChange('unidad_peso_sub', value)}
            placeholder={{label: 'Unidad de peso', value: null}}
            items={[
            { label: 'Gramo', value: 'Gramo'},
            { label: 'Libra', value: 'Libra' },
            { label: 'kilogramo', value: 'Kilogramo' },
            { label: 'Tonelada', value: 'Tonelada' }
           ]}
           /> 
            
  {/*           <Calendar 
            onValueChange={(range) => console.log(range)}
            minDate={new Date(2018, 3, 20)}
            startDate={new Date(2018, 3, 30)}
            endDate={new Date(2018, 4, 5)}
            theme={{
                
                activeDayColor: {},
                monthTitleTextStyle: {
                    color: '#6d95da',
                    fontWeight: '500',
                    fontSize:16,
                },

                emptyMonthContainerStyle:{},
                emptyMonthTextStyle: {
                    fontWeight: '200',
                },

                weekColumnsContainerStyle: {},
                weekColumnStyle: {
                    fontWeight:'10',
                },

                weekColumnTextStyle:{
                    color: '#b6c1cd',
                    fontSize: 13,
                },

                nonTouchableDayContainerStyle:{},
                nonTouchableDayTextStyle:{},
                startDateContainerStyle: {},
                endDateContainerStyle:{},
                dayContainerStyle: {},
                dayTextStyle:{
                    color: '#2d4150',
                    fontWeight: '200',
                    fontSize: 15,
                },

                dayOutOfRangeContainerStyle:{},
                dayOutOfRangeTextStyle: {},
                todayContainerStyle: {},
                todayTextStyle: {
                    color: '#6d95da'
                },

                activeDayContainerStyle:{
                    backgroundColor: '#6d95da'
                },

                activeDayTextStyle:{
                    color: 'white',
                },

                nonTouchableLastMonthDayTextStyle:{}
            }}
            />  */}
            
               
            <Input style={pickerSelect.inputIOS}
            placeholder="Precio Inicial" 
            value={datos.precio_inicial_sub}
            onChangeText={(precioI) => setDatos({...datos,precio_inicial_sub:parseInt(precioI)})}
            errorMessage={datos.precio_inicial_sub === ''?'Campo obligatorio' : null}
            />

            <Input style={pickerSelect.inputIOS}
            placeholder="Precio Fin"
            value={datos.precio_final_sub}
            onChangeText={(precioF) => setDatos({...datos,precio_final_sub:parseInt(precioF)})}
            errorMessage={datos.precio_final_sub === ''?'Campo obligatorio' : null}
            />
    

{/* <SelectList setSelected={selected} data={data} onSelect={() =>alert(selected)} /> */}

            <Input style={pickerSelect.inputIOS}
            placeholder="cantidad"
            value={datos.cantidad_sub}
            onChangeText={(cantidad) => setDatos({...datos,cantidad_sub:cantidad})}
            errorMessage={datos.cantidad_sub === '' ? 'Campo obligatorio' : null}
            />
            
            <Input style={pickerSelect.inputIOS}
            placeholder="Variedad"
            value={datos.fk_variedad}
            onChangeText={(fk) => setDatos({...datos,fk_variedad:fk})}
            />

            <Input style={pickerSelect.inputIOS}
            placeholder="Descripcion producto"
            value={datos.descripcion_sub}
            onChangeText={(descripcion) => setDatos({...datos,descripcion_sub:descripcion})}
            errorMessage={datos.descripcion_sub === '' ? 'campo obligatorio' : null}
            />

            <Input style={pickerSelect.inputIOS}
            placeholder="Imagen"
            value={datos.imagen_sub}
            onChangeText={(img) => setDatos({...datos,imagen_sub:img})}
            /> 

            <Input style={pickerSelect.inputIOS}
            placeholder="certificado"
            value={datos.certificado_sub}
            onChangeText={(certificado) => setDatos({...datos,certificado_sub:certificado})}
            /> 

            <Button
            title="Registrar datos"
            onPress={enviarSubasta}
            />

        </View>
        </ScrollView>
    </SafeAreaView>
    )
}

const pickerSelect = StyleSheet.create({
    inputIOS:{
       /*  fontSize: 18,
        paddingVertical: 9,
        paddingHorizontal: 10,
        borderWidth: 5,
        borderColor: '#0000',
        backgroundColor: '#F5F5F5',
        borderRadius: 10 */
        fontSize: 18,
        height: 10,
        borderColor: '#888', // color gris para el borde
        borderWidth: 1,
        borderRadius: 8,
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: '#F9F9F9', // color blanco roto para el fondo
        color: '#333', // color gris oscuro para el texto
        fontSize: 16,
        marginVertical: 10,
        shadowColor: '#000', // sombra negra
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },

    container:{
        backgroundColor:'#fff'
    }

 /*    inputANDROID:{
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderWidth:1,
        borderColor: '#0000',
        backgroundColor: '#fff'
    } */
})

export default SubastaScreen

