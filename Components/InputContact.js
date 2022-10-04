import { View, TextInput, Pressable, Text, StyleSheet } from "react-native";
import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";

const InputContact = ({ setRefetch }) => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [age, setAge] = useState(0);

    const addContact = async () => {
        const contacts = collection(db, "contacts");
        if (!firstName || !lastName) return;
        const capitalizedFirstName = firstName[0].toUpperCase() + firstName.slice(1);
        const capitalizedLastName = lastName[0].toUpperCase() + lastName.slice(1);
        await addDoc(contacts, {
            firstName: capitalizedFirstName,
            lastName: capitalizedLastName,
            phoneNumber,
            email,
            age
        });
        setRefetch(prev => !prev);
        setFirstName('');
        setLastName('');
        setPhoneNumber('');
        setEmail('');
        setAge('');
    }

    return (
        <View>
            <TextInput
                placeholder="First Name"
                value={firstName}
                onChangeText={(t) => setFirstName(t)}
                style={styles.textInput}
            />
            <TextInput
                placeholder="Last Name"
                value={lastName}
                onChangeText={(t) => setLastName(t)}
                style={styles.textInput}
            />
            <TextInput
                placeholder="Email"
                value={email}
                onChangeText={(t) => setEmail(t)}
                style={styles.textInput}
            />
            <TextInput
                placeholder="Phone number"
                value={phoneNumber}
                onChangeText={(t) => setPhoneNumber(t)}
                style={styles.textInput}
            />
            <TextInput
                placeholder="Age"
                value={age}
                onChangeText={(t) => setAge(t)}
                style={styles.textInput}
            />
            <Pressable style={styles.button} onPress={addContact}><Text style={styles.buttonText}>Add contact</Text></Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    textInput: {
      border: "solid 1px black",
      borderRadius: 5,
      marginBottom: 8,
      fontSize: 16,
      padding: 10,
      color: "green",
    },
    button: {
      backgroundColor: "darkgreen",
      borderRadius: 5,
      padding: 10,
      marginBottom: 15,
    },
    buttonText: {
      fontSize: 20,
      color: "white",
      textAlign: "center",
    },
  });

export default InputContact;
