import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { white } from '../utils/colors';

const CustomBtn = ({ onPress, backgroundColor, children, outline }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.button,
        { backgroundColor: outline ? '' : backgroundColor },
        outline && {
          borderStyle: 'solid',
          borderColor: backgroundColor,
          borderWidth: 1
        }
      ]}
    >
      <Text style={{ color: outline ? backgroundColor : white, fontSize: 18 }}>
        {children}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 15,
    width: 250,
    borderRadius: 5,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default CustomBtn;
