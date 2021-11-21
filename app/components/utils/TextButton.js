
import React from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

const TextButton = props => {

  return (
    <Button
      labelStyle={styles.buttonText}
    >
      {props.children}
    </Button>
  );
};

const styles = StyleSheet.create({
  buttonText: {
    fontSize: 15,
    color: '#4D3B9B',
    fontFamily: 'Prompt_500Medium',
    textDecorationLine: 'underline',
    marginVertical: 0
  }
});

export default TextButton;
