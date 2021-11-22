import React, { useState } from "react"
import { StyleSheet, View, ScrollView } from 'react-native';
import { TextInput } from 'react-native-paper';

import PrimaryButton from "./PrimaryButton";

const FormBox = (props) => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  return (
    <View style={styles.formContainer}>

      <TextInput
        label="USERNAME"
        value={username}
        placeholder="ชื่อผู้ใช้งาน"
        onChangeText={username => setUsername(username)}
        style={styles.inputStyles}
      />
      <TextInput
        label="PASSWORD"
        placeholder="รหัสผ่าน"
        value={password}
        style={styles.inputStyles}
        onChangeText={password => setPassword(password)}
        secureTextEntry
      />
      <PrimaryButton goTo={() => console.log(1)}>
        {props.btnText}
      </PrimaryButton>

    </View>
  )
}

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    width: '100%',
    // justifyContent: 'flex-start'
  },
  inputStyles: {
    backgroundColor: '#F1F0F9',
    marginBottom: 19
  }
})

export default FormBox

