// CustomModal.js
import React, { useEffect, useState } from 'react';
import { View, Modal, Animated, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const CustomModal = ({ visible, onClose, children }) => {
  const [modalVisible, setModalVisible] = useState(visible);
  const [scaleValue] = useState(new Animated.Value(0));

  useEffect(() => {
    if (visible) {
      setModalVisible(true);
      Animated.spring(scaleValue, {
        toValue: 1,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(scaleValue, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start(() => setModalVisible(false));
    }
  }, [visible]);

  return (
    <Modal
      transparent={true}
      visible={modalVisible}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalBackground}>
          <TouchableWithoutFeedback>
            <Animated.View style={[styles.container, { transform: [{ scale: scaleValue }] }]}>
              {children}
            </Animated.View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)', 
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  container: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
});

export default CustomModal;
