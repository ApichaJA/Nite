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
import { Card, Title, Avatar, TextInput } from "react-native-paper";
import { observer } from "mobx-react-lite";
import { authentication } from "../../stores/Auth.service";
import axios from "axios";

import PrimaryButton from "../../components/utils/PrimaryButton";

export default observer(function View_Note({
  route,
  navigation: { navigate },
}) {
  const navigation = useNavigation();
  const [item, setItem] = useState(route.params.item);
  const [comment, setComment] = useState("");
  const [pullComment, setPullComment] = useState([]);
  const comment_note = async () => {
    try {
      await axios
        .post("/service-comment/comment", {
          uuid: route.params.item.author.uuid,
          comment,
          nid: route.params.item.nid,
        })
        .then((res) => {
          setPullComment((oldComment) => [res.data, ...oldComment]);
          setComment("");
        })
        .catch((e) => {
          console.error(e);
        });
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(async () => {
    const getComment = await axios.get(
      `/service-comment/comment?uuid=${item.author.uuid}&nid=${item.nid}`
    );
    setPullComment(getComment.data);
  }, [route.params.item]);
  const GetComment = () => {
    const notecomment = pullComment.map((item, index) => {
      const splitTime = item.createdAt.split("T")[1].split(".")
      const day = item.createdAt.split("T")[0] || "-"
      const time = item.createdAt.split("T")[1].split(".")[0] || "-"
      console.log(splitTime)
      return (
        <View
          key={index}
          style={{
            backgroundColor: "#F1F0F9",
            marginBottom: 30,
            padding: 20,
            borderRadius: 10,
          }}
        >
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <View>
              <Text>ความคิดเห็นที่ {pullComment.length - index}</Text>
              <Text style={{ fontWeight: "600", fontSize: 20 }}>
                {item.comment}
              </Text>
            </View>
            <Avatar.Text
              backgroundColor="#4D3B9B"
              size={42}
              label={item.author.firstname[0] + item.author.lastname[0]}
            />
          </View>

          <Text style={{ textAlign: "right" }}>
            โพสต์ {day.slice(2)} {time}
          </Text>
        </View>
      );
    });
    return notecomment;
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View>
          <Card style={styles.card}>
            <Card.Content>
              <Title style={styles.pageTitle}>{item.title}</Title>
              <View style={styles.authorGroup}>
                <Avatar.Text
                  backgroundColor="#4D3B9B"
                  size={42}
                  label={item.author.firstname[0] + item.author.lastname[0]}
                />
                <Text style={styles.noteAuthor}>
                  By, {item.author.firstname} {item.author.lastname}
                </Text>
              </View>
              <View style={styles.textAreaStyles}>
                <Text>{item.detail}</Text>
              </View>
              <Text style={[styles.textAbove, { marginTop: 10 }]}>แชร์</Text>
              <View style={{ flexDirection: "row", marginBottom: 30 }}>
                <Avatar.Icon
                  style={{ marginRight: 5 }}
                  icon="facebook"
                  backgroundColor="#3b5998"
                  size={42}
                />
                <Avatar.Icon
                  style={{ marginRight: 5 }}
                  icon="google"
                  backgroundColor="#DB4437"
                  size={42}
                />
                <Avatar.Icon
                  style={{ marginRight: 5 }}
                  icon="twitter"
                  backgroundColor="#00ACEE"
                  size={42}
                />
              </View>
              <Text style={styles.textAbove}>ความคิดเห็น</Text>
              <TextInput
                label="กรอกความคิดเห็นของคุณ"
                value={comment}
                onChangeText={(comment) => setComment(comment)}
                style={styles.inputStyles}
              />
              {comment.length > 0 ? (
                <View style={styles.formContainer}>
                  <PrimaryButton goTo={() => comment_note()}>
                    แสดงความคิดเห็น
                  </PrimaryButton>
                </View>
              ) : (
                false
              )}
              <GetComment />
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
    paddingVertical: 44,
    backgroundColor: "#FFF",
  },
  formContainer: {
    // height: "100%",
    width: "100%",
  },
  pageTitle: {
    flex: 1,
    fontSize: 24,
    marginTop: 10,
    fontFamily: "Prompt_700Bold",
    paddingBottom: 5,
  },
  textAreaStyles: {
    textAlignVertical: "top",
    backgroundColor: "#F1F0F9",
    flex: 1,
    borderRadius: 10,
    padding: 25,
    marginBottom: 20,
    marginTop: 20,
  },
  noteAuthor: {
    fontSize: 15,
    fontWeight: "600",
    marginLeft: 10,
  },
  inputAreaStyles: {
    textAlignVertical: "top",
    backgroundColor: "#F1F0F9",
    borderRadius: 10,
    padding: 30,
    marginBottom: 40,
    marginTop: 40,
  },
  authorGroup: {
    flexDirection: "row",
    alignItems: "center"
  },
  textAbove: {
    marginBottom: 10,
    fontWeight: "600",
    fontSize: 20,
  },
  inputStyles: {
    backgroundColor: "#F1F0F9",
    marginBottom: 40,
    minHeight: 150
  },
});
