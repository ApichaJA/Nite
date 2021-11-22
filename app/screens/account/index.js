import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Card, Title, Paragraph } from 'react-native-paper';

export default function Index() {
  return (
    <View>
      <Card>
        <Card.Content>
          <Title>Home</Title>
          <Paragraph>Cardกฟหดหก content</Paragraph>
        </Card.Content>
      </Card>
    </View>
  )
}

const styles = StyleSheet.create({

})
