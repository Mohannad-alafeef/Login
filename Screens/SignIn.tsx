import {useContext, useState} from 'react';
import {
  Alert,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {AuthContext} from '../App';

function SignInScreen({navigation}: any) {
  const {signIn} = useContext(AuthContext);
  const [userName, setUserName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isVisable, setIsVisable] = useState<boolean>(false);
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require('../Images/E-learning-platform.png')}
      />
      <View style={styles.loginForm}>
        <TextInput
          placeholder="Enter User Name"
          value={userName}
          onChangeText={t => setUserName(t)}
          style={styles.input}
        />
        <TextInput
          placeholder="Enter Password"
          value={password}
          secureTextEntry={!isVisable}
          onChangeText={t => setPassword(t)}
          style={styles.input}
        />
        <Text
          style={[styles.textRight, styles.blue]}
          onPress={() => navigation.navigate('ResetPassword')}>
          Forget Password ?
        </Text>
      </View>
      <View>
        <Pressable
          style={styles.button}
          onPress={() => {
            signIn({userName, password});
          }}>
          <Text style={styles.login}>Login</Text>
        </Pressable>
      </View>
      <View style={[styles.container, styles.centerContainer]}>
        <Text style={styles.register}>
          Dont Have An account ?{' '}
          <Text
            style={styles.blue}
            onPress={() => navigation.navigate('SignUp')}>
            Register
          </Text>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: '90%',
    height: '20%',
    objectFit: 'contain',
    alignSelf: 'center',
  },
  loginForm: {
    marginTop: 150,
    padding: 20,
  },
  input: {
    margin: 8,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: '#c0c0c0',
    padding: 10,
  },
  blue: {
    color: '#00adee',
  },
  textRight: {
    alignSelf: 'flex-end',
    padding: 8,
  },
  button: {
    backgroundColor: '#00adee',
    borderRadius: 20,
    color: 'black',
    height: 50,
    width: '87%',
    alignSelf: 'center',
  },
  login: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'white',
    position: 'relative',
    top: 10,
  },
  centerContainer: {
    justifyContent: 'center',
    backgroundColor: '#DDD',
    marginTop: 20,
  },
  register: {
    alignSelf: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    color: '#212529',
  },
});

export default SignInScreen;
