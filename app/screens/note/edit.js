import React, { useState, useEffect, useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Button,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Card, Title, Paragraph, TextInput } from "react-native-paper";
import { observer } from "mobx-react-lite";
import { authentication } from "../../stores/Auth.service";
import axios from "axios";

import PrimaryButton from "../../components/utils/PrimaryButton";

export default observer(function View_Note({
  route,
  navigation: { navigate },
}) {
  const navigation = useNavigation();
  const [title, setTitle] = useState("");
  const [detail, setDetail] = useState("");

  const edit_note = async () => {
    try {
      await axios
        .put("/share/my-notes", {
          title,
          detail,
          nid: route.params.item.nid,
        })
        .then(() => {
          alert("Update Successfully");

          setTimeout(() => {
            navigation.navigate("View Note", route.params);
          }, 2000);
        });
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    setDetail(route.params.item.detail);
    setTitle(route.params.item.title);
  }, [route.params]);
  const token = authentication.getProfile;
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
              <Title style={styles.pageTitle}>โน๊ตของคุณ</Title>
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
                  returnKeyLabel="emergency-call"
                  value={detail}
                  style={styles.inputAreaStyles}
                  onChangeText={(detail) => setDetail(detail)}
                  secureTextEntry
                />
                {route.params.item.filePdf ? (
                  <View style={{marginBottom: 20}}>
                    <Text style={styles.textAbove}>Your Pdf</Text>
                    {/* <Text>{ route.params.item.filePdf }</Text> */}
                    <TextInput
                  label="Url"
                  multiline={true}
                  returnKeyLabel="emergency-call"
                  value={route.params.item.filePdf}
                  // style={styles.inputAreaStyles}
                  secureTextEntry
                />
                  </View>
                ) : (
                  false
                )}
                <PrimaryButton goTo={() => edit_note()}>
                  บันทึกโน็ต
                </PrimaryButton>
              </View>
            </Card.Content>
          </Card>
        </View>
      </ScrollView>
    </View>
  );
});

const styles = StyleSheet.create({
  card: {
    paddingVertical: 44,
  },
  container: {
    flex: 1,
    // justifyContent: 'center',
    backgroundColor: "#FFF",
  },
  formContainer: {
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
    minHeight: 200,
    marginBottom: 40,
  },
  textAbove: {
    color: "#4D3B9B",
    marginBottom: 10,
    fontFamily: "Roboto_500Medium",
  },
});
