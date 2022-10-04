import { auth, onAuthStateChanged, signInWithEmailAndPassword } from '../firebase';
import { KeyboardAvoidingView, Text, View, TextInput, Pressable, StyleSheet } from 'react-native';
import { useState, useEffect } from 'react';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, authUser => {
      if (authUser) {
        navigation.replace('List');
      }
    });
    return unsubscribe;
  }, []);

  const signIn = () => {
    signInWithEmailAndPassword(auth, email, password).catch((err) => alert(err));
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
          onSubmitEditing={signIn}
          style={styles.textInput}
        />
      </View>
      <Pressable onPress={signIn} style={styles.button}><Text style={styles.buttonText}>Log in</Text></Pressable>
      <Pressable onPress={() => navigation.navigate('Signup')} style={styles.button2}><Text style={styles.buttonText2}>Not registered?</Text></Pressable>
    </KeyboardAvoidingView>
  );
};

export default Login;


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
