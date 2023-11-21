import { Button, Input } from "@rneui/base";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TextInput,
  ScrollView,
} from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { useDispatch, useSelector } from "react-redux";

import { TextComp } from "../../components/TextComp/TextComp";
import { useCreatePostMutation } from "../../store/api/postsApi";

export function PostForm() {
  const [toggleCheckBox, setToggleCheckBox] = useState(false);

  const [postText, setPostText] = useState("");
  const loggedInAs = useSelector((state: any) => state.auth.loggedInAs);
  const [createPost] = useCreatePostMutation();

  const [feedback, setFeedback] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const submitHandler = async () => {
    if (postText !== "") {
      //console.log('firstName: ', firstName, 'lastName: ', lastName);
      setFeedback(`Tack för posten!`);
      setSubmitted(true);

      console.log(submitted);

      setTimeout(() => {
        setFeedback("");
      }, 1000);

      const response = await createPost({
        post: {
          createdBy: loggedInAs.firstName,
          createdDate: new Date().toLocaleDateString(),
          text: postText,
        },
      });

      const result = await response;
      console.log("result: ", result);
    } else {
      console.log("submitted: ", submitted);
      setSubmitted(false);
      setFeedback("Du måste fylla i alla fält!");
    }
  };

  return (
    <View style={styles.container}>
      <Input
        placeholder="Post..."
        value={postText}
        onChangeText={(text) => setPostText(text)}
      />
      <View>
        <Text style={{ color: "black" }}>Private</Text>
        <BouncyCheckbox onPress={(isChecked: boolean) => {}} />
        <Button title="Create Post" onPress={submitHandler} />
      </View>

      <TextComp title={feedback} />
    </View>
  );
}

const styles = StyleSheet.create({
  // Your styles here
  container: {
    margin: 20,
    marginTop: 20,
    padding: 10,
  },
});
