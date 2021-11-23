import React, { useState, useEffect, useCallback } from 'react'
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native'
import { Card, Title, Paragraph } from 'react-native-paper';
import { observer } from 'mobx-react-lite'
import { authentication } from '../../stores/Auth.service'
import axios from 'axios';

export default observer(function CreateNote() {
  return (
    <View>
      <Card>
        <Card.Content>
          <Title>Create Note</Title>
          <Paragraph>Cardกฟหดหก content</Paragraph>
        </Card.Content>
      </Card>
    </View>
  )
})

const styles = StyleSheet.create({

})
