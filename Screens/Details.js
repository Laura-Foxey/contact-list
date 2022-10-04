import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, Pressable } from "react-native";
import { doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from "../firebase";

const Details = ({ navigation, route }) => {
  let { contact } = route.params;
  const [userComment, setUserComment] = useState("");
  const [comment, setComment] = useState("");

  const addComment = async () => {
    if (!userComment) {
      return;
    }
    const contactRef = doc(db, "contacts", contact.id);
    await updateDoc(contactRef, { comment: userComment });
    setComment(userComment);
    setUserComment('');
  };

  const deleteHandler = async () => {
    await deleteDoc(doc(db, "contacts", contact.id));
    alert("The contact is deleted");
    navigation.navigate("List", { message: "hi" });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Name:{" "}
        <b>
          {contact.firstName} {contact.lastName}
        </b>
      </Text>
      <Text style={styles.text}>Email: {contact.email}</Text>
      <Text style={styles.text}>Phone number: {contact.phoneNumber}</Text>
      <Text style={styles.text}>Age: {contact.age}</Text>
      <Text style={styles.lastText}>
        Comment: {contact.comment ? contact.comment : comment || ""}
      </Text>
      <TextInput
        testID='inputComment'
        style={styles.textInput}
        placeholder="Write comment here..."
        value={userComment}
        onChangeText={(t) => setUserComment(t)}
      />
      <Pressable style={styles.button} onPress={addComment} testID='pressButton'>
        <Text style={styles.buttonText}>Add comment</Text>
      </Pressable>
      <Pressable style={styles.button} onPress={deleteHandler} testID='pressButton'>
        <Text style={styles.buttonText}>Delete contact</Text>
      </Pressable>
    </View>
  );
};

export default Details;

// ---------------------stylesheets---------------------

const styles = StyleSheet.create({
  container: {
    padding: "2em",
  },
  text: {
    textAlign: "left",
    fontSize: "20px",
  },
  lastText: {
    textAlign: "left",
    fontSize: "20px",
    marginBottom: 20,
  },
  textInput: {
    border: "solid 2px black",
    borderRadius: 5,
    marginBottom: 25,
    fontSize: 20,
    padding: 10,
    color: "green",
  },
  button: {
    backgroundColor: "darkgreen",
    margin: 10,
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 20,
    color: "white",
    textAlign: "center",
  },
});
