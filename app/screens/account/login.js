import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Card, Title, Paragraph, Button } from 'react-native-paper';
import { TextInput } from 'react-native-paper';

import BoxContainer from '../../components/utils/BoxContainer';
import FormBox from '../../components/utils/FormBox';

export default function login({ navigation: { navigate } }) {
  return (
    <View style={styles.container}>
      <BoxContainer title="Login">
        <FormBox btnText='เข้าสู่ระบบ' />
        <Button style={styles.btn_forget}>
          <Text style={styles.forgetpass}>ลืมรหัสผ่าน?</Text>
        </Button>

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
  forgetpass: {
    fontSize: 16,
    color: '#4D3B9B',
    fontFamily: 'Prompt_500Medium'
  },
  btn_forget: {
    flexDirection: 'row',
    justifyContent: 'flex-end'
  }
});
