import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, ScrollView } from 'react-native'
import { favNote } from '../stores/Fav.service';
import { note } from '../stores/Note.service';

import BoxContainer from '../components/utils/BoxContainer';
import Box from '../components/utils/Box';

const Favorite = ({ navigation: { navigate } }) => {
  const [favorites, setFavorites] = useState([])

  useEffect(() => {
    setFavorites(favNote.getNote)
  }, [])

  return (
    <View style={styles.container}>
      <ScrollView>
        {
          favorites.map((item, index) => {
            return (
              <TouchableOpacity key={index} onPress={() => (navigate('View Note', { item }), note.setNote(item))}>
                <Box title={item.title} author={`${item.author.firstname} ${item.author.lastname}`}>
                  {item.detail}
                </Box>
              </TouchableOpacity>
            )
          })
        }
      </ScrollView>
    </View>
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
