import React, { useState, useEffect, useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Button,
} from "react-native";
import { useNavigation } from '@react-navigation/native';
import { Card, Title, Paragraph, TextInput } from "react-native-paper";
import { observer } from "mobx-react-lite";
import { authentication } from "../../stores/Auth.service";
import axios from "axios";

import Carousel from "react-native-snap-carousel";
import PrimaryButton from "../../components/utils/PrimaryButton";

export default observer(function New_note({ navigation: { navigate } }) {
  const navigation = useNavigation()

  const [title, setTitle] = useState("");
  const [detail, setDetail] = useState("");

  const create_note = async () => {
    const {uuid, profile} = authentication.getProfile
    try {
      await axios.post('/share/my-notes', {
        title,
        detail,
        uuid,
        firstname: profile.firstname,
        lastname: profile.lastname
      })
      .then(() => {
        navigation.navigate('Home')
      })

    } catch (e) {
      console.error(e)
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        swipeThreshold={10}
        scrollEventThrottle={200}
        directionalLockEnabled={true}
      >
        <View>
          <Card style={styles.card}>
            <Card.Content>
              <Title style={styles.pageTitle}>เพิ่มโน๊ตใหม่</Title>
              <View style={styles.formContainer}>
              <Text style={styles.textAbove}>Note Title</Text>
                <TextInput
                  label="ชื่อโน็ต"
                  value={title}
                  onChangeText={(title) => setTitle(title)}
                  style={styles.inputStyles}
                />
              <Text style={styles.textAbove}>Note Detail</Text>
                <TextInput
                label="รายละเอียดโน็ต"
                  multiline={true}
                  value={detail}
                  style={styles.inputAreaStyles}
                  onChangeText={(detail) => setDetail(detail)}
                  secureTextEntry
                />
        <PrimaryButton goTo={() => create_note()}>บันทึกโน็ต</PrimaryButton>
              </View>
            </Card.Content>
          </Card>
        </View>
      </ScrollView>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: "#FFF",
  },
  formContainer: {
    height: "100%",
    width: "100%",
  },
  pageTitle: {
    flex: 1,
    fontSize: 23,
    marginTop: 10,
    fontFamily: "Prompt_700Bold",
    paddingBottom: 15,
  },
  inputStyles: {
    backgroundColor: "#F1F0F9",
    marginBottom: 40,
  },
  inputAreaStyles: {
    // height: 304,
    textAlignVertical: "top",
    backgroundColor: "#F1F0F9",
    flex: 1,
    marginBottom: 40,
  },
  textAbove:{
    color: "#4D3B9B",
    marginBottom: 10,
    fontWeight: '600'
  }
});
