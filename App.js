import { NavigationContainer} from '@react-navigation/native';
import { Pressable, Text, StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { auth } from './firebase.js';
import List from './Screens/List.js';
import Details from './Screens/Details.js';
import Signup from './Screens/Signup.js';
import Login from './Screens/Login.js';

const Stack = createNativeStackNavigator();

export default function App() {
  const signOut = (navigation) => {
    auth.signOut().then(() => navigation.navigate('Login')).catch((err) => alert(err));
  };

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="List" component={List} 
          options={
            ({ navigation }) => ({
              headerRight: () => (
                <Pressable style={styles.signOut} onPress={() => signOut(navigation)}><Text style={styles.signOutText}>Sign out</Text></Pressable>
              ),
            })
          }
        />
        <Stack.Screen name="Details" component={Details} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// ---------------------stylesheets---------------------

const styles = StyleSheet.create({
  signOut: {
    textAlign: "center",
    padding: 10,
    marginRight: 20,
    width: 100,
    marginLeft: "auto",
    borderRadius: 5,
    backgroundColor: "darkred",
  },
  signOutText: {
    color: "white",
  },
});
