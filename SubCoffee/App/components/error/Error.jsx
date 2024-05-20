import React from "react";
import { StyleSheet, Text } from "react-native";

const Error = ({error}) => {
    if (!error){
        return null;
    }
    return <Text testID="errorBox" style={styles.error}>
        Error: {error}
    </Text>
}

const styles = StyleSheet.create({
    error:{
        color:"red"
    }
})
export default Error;