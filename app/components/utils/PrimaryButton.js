
import React from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

const PrimaryButton = props => {
  const outlined = props.isOutlined || false

  return (
    <Button
      mode={outlined ? 'outlined' : 'text'}
      style={[outlined ? styles.primaryButtonOutlined : styles.primaryButton, props.style]}
      labelStyle={
        outlined ?
          styles.primaryButtonLabelOutlined
          : styles.primaryButtonLabel
      }
    >
      {props.children}
    </Button>
  );
};

const styles = StyleSheet.create({
  primaryButton: {
    backgroundColor: "#4D3B9B",
    width: '100%',
    borderRadius: 10,
    height: 47,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 17
  },
  primaryButtonOutlined: {
    backgroundColor: "#FFF",
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#4D3B9B',
    width: '100%',
    borderRadius: 10,
    height: 47,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 17
  },
  primaryButtonLabel: {
    fontFamily: 'Prompt_400Regular',
    fontSize: 15,
    color: '#FEFEFF'
  },
  primaryButtonLabelOutlined: {
    color: '#4D3B9B',
    fontFamily: 'Prompt_500Medium',
    fontSize: 15,
  }
});

export default PrimaryButton;
