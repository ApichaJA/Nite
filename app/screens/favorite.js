import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, ScrollView } from 'react-native'

import BoxContainer from '../components/utils/BoxContainer';
import Box from '../components/utils/Box';

const Favorite = (props) => {
  const [favorites, setFavorites] = useState([])

  useEffect(() => {
    setFavorites([{
      title: 'oop',
      content: 'allllll',
      author: 'NULL POINTER'
    },
    {
      title: 'mobile',
      content: 'arrrrrrrh',
      author: 'Peet'
    },
    {
      title: 'mobile',
      content: 'arrrrrrrh',
      author: 'Peet'
    },
    {
      title: 'mobile',
      content: 'arrrrrrrh',
      author: 'Peet'
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
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 40,
    marginBottom: 40,
    backgroundColor: '#fff'
  }
})

export default Favorite
