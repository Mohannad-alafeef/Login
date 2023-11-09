import {StyleSheet, Text, View} from 'react-native';

function ResetPasswordScreen() {
  return (
    <View style={styles.container}>
      <Text>Reset Password</Text>
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

export default ResetPasswordScreen;
