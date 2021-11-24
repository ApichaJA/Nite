import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import BoxContainer from '../components/utils/BoxContainer';
import TextLogo from '../components/utils/TextLogo';
import PrimaryButton from '../components/utils/PrimaryButton';
import TextDivider from '../components/utils/TextDivider';
import TextButton from '../components/utils/TextButton';

export default function landing({ navigation }) {
  return (
    <View style={styles.container}>
      {/* Logo */}
      <TextLogo />

      {/* Sub title text */}
      <Text style={styles.subTitleText}>
        Welcome to your <Text style={styles.niteText}>NITE</Text>
      </Text>

      {/* Links box */}
      <BoxContainer style={styles.decisionBox}>

        <PrimaryButton
          goTo={() => navigation.navigate('Home')}
        >
          ดำเนินการต่อโดยไม่เข้าสู่ระบบ
        </PrimaryButton>
        <PrimaryButton
          isOutlined
          style={{ marginBottom: 0 }}
          goTo={() => navigation.navigate('Login')}
        >
          เข้าสู่ระบบ
        </PrimaryButton>

        {/* Divider with text */}
        <TextDivider text="หรือ" style={{ marginTop: 25, marginBottom: 25 }} />

        {/* Register Link */}
        <TextButton
          underlined
          goTo={() => navigation.navigate('Register')}>
          สมัครสมาชิกใหม่
        </TextButton>
      </BoxContainer>

    </View>
  )
}


const styles = StyleSheet.create({
  decisionBox: {
    fontFamily: 'Prompt_300Light',
    marginTop: 95
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#FFF"
  },
  subTitleText: {
    fontFamily: 'Roboto_700Bold',
    fontSize: 18
  },
  niteText: {
    color: '#4D3B9B'
  }
});
