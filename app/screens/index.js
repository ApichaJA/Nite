import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native'
import { Card, Title, Paragraph } from 'react-native-paper';
import Carousel from 'react-native-snap-carousel';
import axios from 'axios';

export default function Home({ navigation: { navigate } }) {

  const [activeIndex, setActiveIndex] = useState(0)
  const [mockData, setMockData] = useState([])

  let _renderItem = function ({ item }) {
    return (
      <TouchableOpacity
        style={{
          backgroundColor: '#F1F0F9',
          borderRadius: 10,
          height: 140,
          flex: 1,
          paddingHorizontal: 20,
          paddingVertical: 30,
          // marginLeft: 25,
          marginRight: 25,
        }}
        onPress={() => navigate('Login')}
      >
        <Text style={{ fontSize: 30 }}>{item.title}</Text>
        <Text>{item.author.firstname} {item.author.lastname}</Text>
      </TouchableOpacity>
    )
  }

  useEffect(() => {
    setInterval(() => {
      axios.get('http://192.168.185.253:5001/share/notes')
        .then(({ data }) => {
          setMockData(data)
          console.log(data)
        })
        .catch((e) => console.error(e))
    }, 1000)
  }, [])

  return (
    <View style={styles.container}>
      <ScrollView
        swipeThreshold={10}
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
                  data={mockData}
                  sliderWidth={300}
                  itemWidth={300}
                  renderItem={_renderItem}
                  onSnapToItem={index => setActiveIndex(index)}
                  inactiveSlideScale={1}
                  onPress={() => console.log(333)}
                />
              </View>
            </Card.Content>
          </Card>
          <Card style={styles.card}>
            <Card.Content>
              <Title style={styles.pageTitle}>โน๊ตของคุณ</Title>

              <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', }}>
                <Carousel
                  layout={"default"}
                  data={mockData}
                  sliderWidth={300}
                  itemWidth={300}
                  renderItem={_renderItem}
                  onSnapToItem={index => setActiveIndex(index)}
                  inactiveSlideScale={1}
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
    paddingVertical: 45
  },
  pageTitle: {
    flex: 1,
    fontSize: 23,
    fontFamily: 'Prompt_700Bold',
    paddingBottom: 15
  }
})
