import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Card, Title, Paragraph } from 'react-native-paper';

import BoxContainer from '../../components/utils/BoxContainer';
import FormBox from '../../components/utils/FormBox';

export default function Register({ navigation: { navigate } }) {
  return (
    <View style={styles.container}>
      <BoxContainer title="Register">
        <FormBox btnText='สมัครสมาชิก' />
      </BoxContainer>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
