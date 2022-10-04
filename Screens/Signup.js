import { auth, createUserWithEmailAndPassword } from '../firebase.js';
import { useState } from 'react';
import { KeyboardAvoidingView, View, Text, TextInput, Pressable, StyleSheet } from 'react-native-web';

const Signup = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const register = () => {

    createUserWithEmailAndPassword(auth, email, password)
      .then(() => navigation.navigate('List'))
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <Text style={styles.text}>Create an account</Text>
      <View>
        <TextInput
          placeholder='Email'
          type='text'
          value={email} onChangeText={(text) => setEmail(text)}
          style={styles.textInput}
        />
        <TextInput
          placeholder='Password'
          secureTextEntry
          type='password'
          value={password} onChangeText={(text) => setPassword(text)}
          onSubmitEditing={register}
          style={styles.textInput}
        />
      </View>
      <Pressable style={styles.button} onPress={register} ><Text style={styles.buttonText}>Sign up</Text></Pressable>
    </KeyboardAvoidingView>
  );
};

export default Signup;

// ---------------------stylesheets---------------------


const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    height: "50vh",
    alignItems: "center",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",

  },
  textInput: {
    marginBottom: 10,
    padding: 10,
    border: "2px solid black",
    borderRadius: 5,
    width: "80vw",

  },
  button: {
    backgroundColor: "darkgreen",
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    width: 200,
  },
  button2: {
    borderRadius: 5,
    border: "2px solid darkgreen",
    padding: 10,
    marginBottom: 15,
    width: 200,
  },
  buttonText: {
    fontSize: 20,
    color: "white",
    textAlign: "center",
  },
  buttonText2: {
    fontSize: 20,
    color: "darkgreen",
    textAlign: "center",
  }
});
