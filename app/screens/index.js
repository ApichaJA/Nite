import React, { useState } from 'react'
import { StyleSheet, Text, View, ScrollView } from 'react-native'
import { Card, Title, Paragraph } from 'react-native-paper';
import Carousel from 'react-native-snap-carousel';

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

  let _renderItem = function ({ item, index }) {
    return (
      <View style={{
        backgroundColor: '#fff',
        borderRadius: 5,
        height: 250,
        padding: 50,
        marginLeft: 25,
        marginRight: 25,
      }}>
        <Text style={{ fontSize: 30 }}>{item.title}</Text>
        <Text>{item.text}</Text>
      </View>

    )
  }

  return (
    <View style={styles.container}>
      <ScrollView
        scrollEventThrottle={200}
        directionalLockEnabled={true}
      >

        <View>
          <Card style={styles.card}>
            <Card.Content>
              <Title style={styles.pageTitle}>โน๊ตล่าสุดจากเพื่อนๆ</Title>

              <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', }}>
                <Carousel
                  layout={"default"}
                  data={carouselItems}
                  sliderWidth={300}
                  itemWidth={300}
                  renderItem={_renderItem}
                  onSnapToItem={index => setActiveIndex(index)}
                  enableSnap
                />
              </View>
            </Card.Content>
          </Card>
        </View>
      </ScrollView>
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
