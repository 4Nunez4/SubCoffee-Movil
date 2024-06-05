import { Text, TextInput, StyleSheet, View } from "react-native";
import React from "react";

const Input = (props) => {
    return(
        <View>
            <TextInput
            style={styles.input}
            placeholder={props.placeholder} 
            secureTextEntry={props.secureTextEntry}
            placeholderTextColor="gray"
            /> 
        </View>
    )
}
export default Input

const styles = StyleSheet.create({
    input: {
        marginTop: 10,
        height: 40,
        width:270,
        borderColor: 'gray',
        borderWidth: 1,
        color:'black',
        borderRadius:10,
      },
})
