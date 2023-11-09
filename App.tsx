import React, {
  createContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from 'react';
import {Alert, Button, StyleSheet, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeTabs from './Screens/HomeTabs';
import SignInScreen from './Screens/SignIn';
import SignUpScreen from './Screens/SignUp';
import ResetPasswordScreen from './Screens/ResetPassword';
import {User} from './Models/User';
import {login} from './Services/Auth';
import {ActivityIndicator, MD2Colors} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {SafeAreaProvider} from 'react-native-safe-area-context';

const Stack = createNativeStackNavigator();
export const AuthContext = createContext<any>(null);

function App(): JSX.Element {
  const [state, dispatch] = useReducer(
    (prevState: any, action: any): any => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'SIGN_IN': {
          console.log('action.token = ' + JSON.stringify(action.token));

          return {
            ...prevState,
            isSignIn: true,
            userToken: action.token,
          };
        }
        case 'SIGN_OUT': {
          AsyncStorage.removeItem('userToken');
          return {
            ...prevState,
            isSignIn: false,
            userToken: null,
          };
        }
      }
    },
    {
      isSignIn: false,
      userToken: null,
      isLoading: true,
    },
  );
  useEffect(() => {
    const getTokenAsync = async () => {
      let userToken;

      try {
        userToken = await AsyncStorage.getItem('userToken');
      } catch (e) {}

      dispatch({type: 'RESTORE_TOKEN', token: userToken});
    };

    getTokenAsync();
  }, []);
  const authContext = useMemo(
    () => ({
      signIn: async (data: any) => {
        login(data)
          .then((res: any) => {
            try {
              console.log(res);

              AsyncStorage.setItem('userToken', res).then(() => {
                dispatch({type: 'SIGN_IN', token: res});
              });
            } catch (e) {}
          })
          .catch(e => Alert.alert('Invalid User Name or Password'));
      },
      signOut: () => dispatch({type: 'SIGN_OUT'}),
    }),
    [],
  );
  if (state.isLoading) {
    return <SplashScreen />;
  }
  return (
    <SafeAreaProvider>
      <AuthContext.Provider value={authContext}>
        <NavigationContainer>
          <Stack.Navigator>
            {state.userToken ? (
              <Stack.Screen
                name="HomeTabs"
                component={HomeTabs}
                options={{
                  title: 'Home',
                  headerRight: () => (
                    <Button title="Log Out" onPress={authContext.signOut} />
                  ),
                }}
                initialParams={{token: state.userToken}}
              />
            ) : (
              <Stack.Group screenOptions={{headerShown: false}}>
                <Stack.Screen name="SignIn" component={SignInScreen} />
                <Stack.Screen name="SignUp" component={SignUpScreen} />
                <Stack.Screen
                  name="ResetPassword"
                  component={ResetPasswordScreen}
                />
              </Stack.Group>
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </AuthContext.Provider>
    </SafeAreaProvider>
  );
}
const SplashScreen = () => (
  <View style={styles.container}>
    <ActivityIndicator
      size={'large'}
      animating={true}
      color={MD2Colors.blue500}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default App;
