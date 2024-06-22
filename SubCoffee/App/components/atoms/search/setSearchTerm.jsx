import React, { useState } from "react";
import { TextInput, StyleSheet, View, TouchableOpacity, Text, Animated } from "react-native";

const Input = ({ searchTerm, setSearchTerm }) => {
  const [isFocused, setIsFocused] = useState(false);
  const widthAnim = useState(new Animated.Value(250))[0];  

  const handleFocus = () => {
    setIsFocused(true);
    Animated.timing(widthAnim, {
      toValue: 290,  
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const handleBlur = () => {
    if (searchTerm === '') {
      setIsFocused(false);
      Animated.timing(widthAnim, {
        toValue: 210,  
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.inputContainer, { width: widthAnim }]}>
        <TextInput
          style={styles.input}
          placeholder="Buscar subasta ..."
          placeholderTextColor="#999"
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChangeText={setSearchTerm}
          value={searchTerm}
        />
        {isFocused && (
          <TouchableOpacity style={styles.button} onPress={() => {}}>
            <Text style={styles.buttonText}>Ir</Text>
          </TouchableOpacity>
        )}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginBottom: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#39A800',
    borderRadius: 14,
  },
  input: {
    flex: 1,
    height: 40,
    backgroundColor: '#fff',
    borderRadius: 14,
    paddingHorizontal: 16,
    fontSize: 18,
    color: '#2f2f2f',
    borderWidth: 1,
    borderColor: '#ccc',
    width:20
  },
  button: {
    backgroundColor: '#39A800',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    borderTopRightRadius: 14,
    borderBottomRightRadius: 14,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default Input;
