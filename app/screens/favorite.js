import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, ScrollView } from 'react-native'

import BoxContainer from '../components/utils/BoxContainer';
import Box from '../components/utils/Box';

const Favorite = (props) => {
  const [favorites, setFavorites] = useState([])

  useEffect(() => {
    setFavorites([{
      title: 'Object Oriented Programming',
      content: 'Object-oriented programming (OOP) is a computer programming model that organizes software design around data, or objects, rather than functions and logic',
      author: 'Ratchapol Peet'
    },
    {
      title: 'Mobile Device Programming',
      content: 'A mobile application, also referred to as a mobile app or simply an app, is a computer program or software application designed to run on a mobile device such as a phone, tablet, or watch.',
      author: 'Japan Apicha'
    },
    {
      title: 'Python 101',
      content: 'Python is an interpreted high-level general-purpose programming language.',
      author: 'Arm Phattarakorn'
    },
    {
      title: 'Requirement Engineering 101',
      content: 'Requirements engineering (RE) is the process of defining, documenting, and maintaining requirements in the engineering design process.',
      author: 'Yenura'
    },
    ])
  }, [])

  return (
    <ScrollView style={styles.container}>
      {
        favorites.map((item, index) => {
          return (
            <TouchableOpacity key={index}>
              <Box title={item.title} author={item.author}>
                {item.content}
              </Box>
            </TouchableOpacity>
          )
        })
      }
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 40,
    backgroundColor: '#fff'
  }
})

export default Favorite
