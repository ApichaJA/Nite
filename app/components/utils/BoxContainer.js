
import React from 'react';
import { StyleSheet, View } from 'react-native';

const BoxContainer = props => {
  return (
    <View style={[styles.boxContainer, props.style]}>
      {props.children}
    </View>
  );
};

const styles = StyleSheet.create({
  boxContainer: {
    maxWidth: 268,
    width: '100%',
    margin: 20,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default BoxContainer;
