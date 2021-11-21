import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const TextLogo = (props) => {
  return (
    <View style={styles.viewWrap}>
      <Text style={[styles.textWrap, styles.blueText]}>
        N
      </Text>
      <Text style={styles.textWrap}>
        IT
      </Text>
      <Text style={[styles.textWrap, styles.blueText]}>
        E
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  viewWrap: {
    justifyContent: 'center',
    flexDirection: 'row',
    letterSpacing: '0.4em',
    marginBottom: 17
  },
  textWrap: {
    fontFamily: 'Roboto_700Bold',
    fontSize: 48,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'black'
  },
  blueText: {
    color: '#4D3B9B'
  }
})

export default TextLogo