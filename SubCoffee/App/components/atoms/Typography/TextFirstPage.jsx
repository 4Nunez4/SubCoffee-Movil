import React from "react";
import { Text, StyleSheet, Image } from "react-native";
import { Typography } from "./textGlobal";
import { darkTheme } from "../../../styles/themes/themes";
import iconSubCoffe from "../../../resources/IconoSubCoffee.png"

const TitleFirst = ({ theme }) => {
    const subColor = 'black';
    // const subColor = '#76624F';
    const coffeColor = theme === 'darkTheme' ? darkTheme.text : '#39A800';
    // const coffeColor = theme === 'darkTheme' ? darkTheme.text : '#39A800';

    return (
        <Text style={styles.title}>
            {/* <Image source={iconSubCoffe} style={styles.image}/> */}
            <Text style={[Typography.title, { color: subColor }]}>Sub</Text>
            <Text style={[Typography.title, { color: coffeColor }]}>Coffe</Text>
        </Text>
    );
};

export default TitleFirst;

const styles = StyleSheet.create({
    title: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop:'2%',
        paddingBottom:'10%',
    },
    image:{
      
        width:45,
        height:45,
        paddingBottom:12,
        
        
        
    }
});
