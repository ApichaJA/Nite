import React, { useState } from 'react'
import { StyleSheet, Text, View, ScrollView } from 'react-native'
import { Card, Title, Paragraph } from 'react-native-paper';

export default function Home() {
  const items = [
    {
      title: "Item 1",
      text: "Text 1",
    },
    {
      title: "Item 2",
      text: "Text 2",
    },
    {
      title: "Item 3",
      text: "Text 3",
    },
    {
      title: "Item 4",
      text: "Text 4",
    },
    {
      title: "Item 5",
      text: "Text 5",
    },
  ]
  const [carouselItems, setCarouselItems] = useState(items)
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <View style={styles.container}>
      <Text>test</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF'
  },
  card: {
    paddingVertical: 44
  },
  pageTitle: {
    fontFamily: 'Prompt_500Medium'
  }
})
