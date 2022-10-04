import { collection, getDocs } from 'firebase/firestore';
import { StyleSheet, Text, View, Pressable } from "react-native";
import { auth, db } from '../firebase';
import { useState, useEffect } from "react";
import InputContact from "../Components/InputContact";

const List = ({ navigation, route }) => {
  const [contacts, setContacts] = useState([]);
  const [refetch, setRefetch] = useState(false);

  useEffect(() => {
    const getContacts = async () => {
      const querySnapshot = await getDocs(collection(db, "contacts"));
      const fetchedContacts = [];

      querySnapshot.forEach((doc) => {
        fetchedContacts.push({ ...doc.data(), id: doc.id });
      });
      setContacts(fetchedContacts);
    }
    getContacts();
  }, [refetch, route.params])

  // const signOut = () => {
  //   auth.signOut().then(() => navigation.replace('Login')).catch((err) => alert(err));
  // };

  return (
    <View style={styles.container}>
      <InputContact setRefetch={setRefetch} />
      {contacts && contacts.sort((a, b) => (a.firstName > b.firstName) ? 1 : -1).map((contact, index) => {
        return (
          <Pressable key={contact.id} onPress={() => navigation.navigate("Details", { contact })}>
            <Text style={index % 2 ? styles.text1 : styles.text2}>{contact.firstName} {contact.lastName}</Text>
          </Pressable>
        );
      })}
    </View>
  );
};

export default List;


// ---------------------stylesheets---------------------

const styles = StyleSheet.create({
  container: {
    margin: "20px"
  },
  text1: {
    backgroundColor: "pink",
    color: "darkgreen",
    textAlign: "left",
    margin: "6px",
    fontSize: "20px",
    paddingLeft: ".5em",
  },
  text2: {
    paddingLeft: ".5em",
    backgroundColor: "darkred",
    color: "white",
    textAlign: "left",
    margin: "6px",
    fontSize: "20px",
  },
  signOut: {
    textAlign: "center",
    padding: 10,
    width: 100,
    marginLeft: "auto",
    marginBottom: 10,
    marginTop: -11,
    borderRadius: 5,
    backgroundColor: "darkred",
  },
  signOutText: {
    color: "white",
  },
});
