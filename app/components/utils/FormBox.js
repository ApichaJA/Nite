import React, { useState, useEffect, useCallback } from "react"
import * as Network from 'expo-network'
import axios from "axios";
import { useNavigation } from '@react-navigation/native';

import { observer } from 'mobx-react-lite'
import { authentication } from '../../stores/Auth.service'

import { StyleSheet, View, ScrollView, AsyncStorage } from 'react-native';
import { TextInput } from 'react-native-paper';

import PrimaryButton from "./PrimaryButton";

const FormBox = (props) => {
  const navigation = useNavigation()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')

  const getIpAddress = async () => await Network.getIpAddressAsync();
  const API = `http://${getIpAddress}:5001${props.apiPath}`

  const register = async () => {
    try {
      const { data, status } = await axios.post('http://192.168.185.253:5001/auth/account/sign-up', {
        username,
        password,
        firstname: firstName,
        lastname: lastName
      })

      if (status === 200) {
        authentication.setProfile(data)
        navigation.navigate('Home')
      }

    } catch (e) {
      console.error(e)
    }
  }

  const login = async () => {
    try {
      const { data, status } = await axios.post('http://192.168.185.253:5001/auth/account/login', {
        username,
        password
      })

      if (status === 200) {
        authentication.setProfile(data)
        navigation.navigate('Home')
      }

    } catch (e) {
      console.error(e)
    }
  }

  if (!props.registered) {
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
        <PrimaryButton goTo={() => login()}>
          {props.btnText}
        </PrimaryButton>

      </View>
    )
  } else {
    return (
      <View style={styles.formContainer}>

        <TextInput
          label="FIRST NAME"
          value={firstName}
          placeholder="ชื่อจริง"
          onChangeText={firstName => setFirstName(firstName)}
          style={styles.inputStyles}
        />
        <TextInput
          label="LAST NAME"
          value={lastName}
          placeholder="นามสกุล"
          onChangeText={lastName => setLastName(lastName)}
          style={styles.inputStyles}
        />

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
        <PrimaryButton goTo={() => register()}>
          {props.btnText}
        </PrimaryButton>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  formContainer: {
    width: '100%',
  },
  inputStyles: {
    backgroundColor: '#F1F0F9',
    marginBottom: 19
  }
})

export default observer(FormBox)

