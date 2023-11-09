import {StyleSheet, View} from 'react-native';
import {Text} from 'react-native-paper';
import jwt_decode from 'jwt-decode';

function ProfileScreen({route, navigation}: any) {
  const {token} = route.params;
  let user = jwt_decode<any>(token);
  console.log(user);
  return (
    <View style={styles.container}>
      <Text>Profile Screen</Text>
      <Text>User Name : {user.userName}</Text>
      <Text>First Name : {user.firstName}</Text>
      <Text>Last Name : {user.lastName}</Text>
      <Text>Phone : {user.phone}</Text>
      <Text>email : {user.email}</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ProfileScreen;
