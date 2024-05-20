import NetInfo from '@react-native-community/netinfo'

function checkConnectivity(onConnect, onDisconnect) {
    const unsubscribe = NetInfo.addEventListener(state => {
        if(state.isConnected){
            onConnect();
        }
        else{
            onDisconnect();
        }
    });

    return unsubscribe;
}
export default checkConnectivity;