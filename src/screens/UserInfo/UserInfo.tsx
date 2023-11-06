import { StyleSheet, View } from 'react-native';
import { Button, Text } from '@rneui/themed';
import { logIn, logOut } from '../../store/slices/authSlice';
import { useDispatch, useSelector } from 'react-redux';
export const UserInfo = ({ route, navigation }) => {
  const loggedInAs = useSelector((state: any) => state.auth.loggedInAs);
  const user = route?.params?.user || loggedInAs;
  const dispatch = useDispatch();
  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <Text h4>{`${user.firstName} ${user.lastName}`}</Text>
      </View>
      <View style={styles.actionsContainer}>
        {loggedInAs?.id === user.id ? (
          <>
            <Button
              onPress={() => dispatch(logOut())}
              title="Logga ut"
              color="error"
            ></Button>
          </>
        ) : (
          <>
            <Button
              onPress={() => dispatch(logIn(user))}
              title="Logga in"
            ></Button>
          </>
        )}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 24,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 36
  },
  infoContainer: {
    marginBottom: 24
  },
  actionsContainer: {
    marginBottom: 24
  }
});
