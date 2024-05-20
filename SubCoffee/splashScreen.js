import { View, StyleSheet, Image } from "react-native"
import IconoSubcoffe  from './App/resources/IconoSubCoffee.png'

export default function SplashScreen() {
    return(
        <View style={styles.container
        }>
            <View>
                <Image 
                source={IconoSubcoffe}
                style={styles.Image}
                />

            </View>
        </View>
    )

}
const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "white"
    },
    Image:{
        width:200,
        height:200,
        resizeMode:"cover"
    }
})