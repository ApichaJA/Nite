
import React from 'react';
import { StyleSheet, View } from 'react-native';

import { Headline } from 'react-native-paper'

const BoxContainer = props => {
  return (
    <View style={[styles.boxContainer, props.style]}>
      {props.title && (<Headline style={styles.headline}>{props.title}</Headline>)}
      {props.children}
    </View>
  );
};

const styles = StyleSheet.create({
  boxContainer: {
    maxWidth: 298,
    width: '100%',
    margin: 20
  },
  headline: {
    fontFamily: 'Roboto_700Bold',
    fontSize: 30,
    color: '#4D3B9B',
    textTransform: 'uppercase',
    textAlign: 'left',
    alignSelf: 'flex-start',
    marginBottom: 37
  }
});

export default BoxContainer;
