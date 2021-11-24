import React, { useState, useEffect, useCallback } from 'react'

import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native'
import { Card, Title, Paragraph, FAB } from 'react-native-paper';

import Icon from 'react-native-vector-icons/FontAwesome';
import { observer } from 'mobx-react-lite'
import { authentication } from '../stores/Auth.service'
import axios from 'axios';

import Carousel from 'react-native-snap-carousel';
import PrimaryButton from '../components/utils/PrimaryButton'

export default observer(function Home({ navigation: { navigate } }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [mockData, setMockData] = useState([])

  const [allNotes, setAllNotes] = useState([])
  const [myNotes, setMyNotes] = useState([])

  const [allNotesIndex, setAllNotesIndex] = useState(0)
  const [myNotesIndex, setMyNotesIndex] = useState(0)

  const [myToken, setMyToken] = useState(null)

  let _renderItem = function ({ item }) {
    return (
      <TouchableOpacity
        style={{
          backgroundColor: '#F1F0F9',
          borderRadius: 10,
          height: 230,
          flex: 1,
          paddingHorizontal: 20,
          paddingVertical: 30,
          marginRight: 25,
        }}
        onPress={() => authentication.getProfile.uuid === item.author.uuid ? navigate('Edit Note', { item }) : navigate('View Note', { item })}
      >
        <Text numberOfLines={2} style={{ fontSize: 28, fontFamily: 'Prompt_700Bold' }}>{item.title}</Text>
        <Text numberOfLines={2} style={{ fontSize: 16, paddingVertical: 8, fontFamily: 'Prompt_400Regular', color: '#8880cc' }}>
          {item.detail}
        </Text>
        <Text style={{ fontFamily: 'Prompt_500Medium' }}>{item.author.firstname} {item.author.lastname}</Text>
      </TouchableOpacity>
    )
  }

  const getNotes = useCallback(async (id) => {
    try {
      const { data: notesData } = await axios.get('/share/notes')
      const myData = id && (await axios.get(`/share/my-notes?uuid=${id}`, {
        headers: {
          Authorization: 'Bearer ' + authentication.getProfile.accessToken
        }
      })).data

      setAllNotes(notesData)

      if (id) setMyNotes(myData)
    } catch (e) {
      console.error(e)
    }
  }, [])

  useEffect(() => {
    const token = authentication.getProfile
    token && setMyToken(token.accessToken)

    setInterval(() => {
      getNotes()

      if (token.accessToken) {
        getNotes(token.uuid)
      }
    }, 1000)

  }, [getNotes, myToken])

  return (
    <View style={styles.container}>
      <ScrollView
        swipeThreshold={10}
        scrollEventThrottle={200}
        directionalLockEnabled={true}
      >

        <View>
          {allNotes.length > 1 && (
            <Card style={styles.card}>
              <Card.Content>
                <Title style={styles.pageTitle}>โน๊ตล่าสุดจากเพื่อนๆ</Title>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', }}>
                  <Carousel
                    layout={"default"}
                    data={allNotes}
                    sliderWidth={300}
                    itemWidth={300}
                    renderItem={_renderItem}
                    onSnapToItem={index => setAllNotesIndex(index)}
                    inactiveSlideScale={1}
                  />
                </View>
              </Card.Content>
            </Card>
          )}

          {myToken && (<Card style={styles.card}>
            <Card.Content>
              <View style={styles.noteBetween}>
                <Title style={styles.pageTitle}>
                  โน๊ตของคุณ
                </Title>
              </View>

              {myNotes.length > 0 ? (
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', }}>
                  <Carousel
                    layout={"default"}
                    data={myNotes}
                    sliderWidth={300}
                    itemWidth={300}
                    renderItem={_renderItem}
                    onSnapToItem={index => setMyNotesIndex(index)}
                    inactiveSlideScale={1}
                  />
                </View>
              ) : (
                <View style={styles.noNotesContainer}>
                  <Text style={[styles.pageTitle, { color: '#A69AD9' }]}>คุณยังไม่มีโน๊ตใดๆ</Text>
                  <PrimaryButton goTo={() => navigate('Create Note')} style={{ width: 268, marginTop: 29 }}>
                    เพิ่มโน๊ต
                  </PrimaryButton>
                </View>
              )}

            </Card.Content>
          </Card>)}
        </View>
      </ScrollView>

      {myToken && (
        <FAB
          style={styles.fab}
          icon="plus"
          color="#DBD7EB"
          onPress={() => navigate('Create Note')}
        />
      )}
    </View>
  )
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF'
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: '#4D3B9B'
  },
  card: {
    paddingVertical: 20
  },
  noNotesContainer: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 92
  },
  pageTitle: {
    flex: 1,
    fontSize: 23,
    fontFamily: 'Prompt_700Bold',
    paddingBottom: 15
  },
  noteBetween: {
    flexDirection: "row",
    flexWrap: "wrap",
  }
})
