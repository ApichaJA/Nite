import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const TextDivider = (props) => {
  const { text } = props

  return (
    <View style={[styles.container, props.style]}>
      <View style={styles.divider} />
      <Text style={styles.dividerText}>
        {text}
      </Text>
      <View style={styles.divider} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%'
  },
  divider: {
    backgroundColor: '#F1F0F9',
    height: 1.5,
    flex: 1,
    alignSelf: 'center'
  },
  dividerText: {
    alignSelf: 'center',
    paddingHorizontal: 17,
    fontSize: 15,
    color: '#6753BE',
    fontFamily: 'Prompt_500Medium'
  }
})

export default TextDivider