import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Title, Subheading, Paragraph, Text } from 'react-native-paper';

const Box = (props) => {
  const title = props.title || ''
  const subTitle = props.subTitle || ''
  const author = props.author || ''

  return (
    <View style={styles.boxContainer}>
      <Text numberOfLines={2} style={{ fontSize: 28, fontFamily: 'Prompt_700Bold', paddingBottom: 0 }}>
        {title}
      </Text>

      <Subheading>
        {subTitle}
      </Subheading>

      <Paragraph numberOfLines={2} style={{ fontSize: 16, paddingVertical: 8, fontFamily: 'Prompt_300Light', color: '#8880cc' }}>
        {props.children}
      </Paragraph>

      <Subheading style={{ fontFamily: 'Prompt_500Medium' }}>
        {author}
      </Subheading>
    </View>
  )
}

const styles = StyleSheet.create({
  boxContainer: {
    width: '100%',
    flex: 1,
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 30,
    backgroundColor: '#F1F0F9',
    marginVertical: 10
  }
})

export default Box