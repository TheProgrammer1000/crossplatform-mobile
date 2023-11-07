import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';
import { TextComp } from '../../components/TextComp/TextComp';
import { Button, Input } from '@rneui/base';
import { useCreateUserMutation } from '../../store/api/usersApi';
import { useGetUsersQuery } from '../../store/api/usersApi';
import { useState, useRef } from 'react';

export function UserForm() {
  const [createUser, { isLoading }] = useCreateUserMutation();
  const { data, refetch } = useGetUsersQuery({});

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [feedback, setFeedback] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const lastNameRef = useRef(null);

  const submitHandler = async () => {
    if (firstName !== '' && lastName !== '') {
      //console.log('firstName: ', firstName, 'lastName: ', lastName);
      setFeedback(`Hej, ${firstName} ${lastName}, välkommen!`);
      setSubmitted(true);
      setFirstName('');
      setLastName('');

      console.log(submitted);

      setTimeout(() => {
        setFeedback('');
      }, 1000);

      const response = await createUser({
        user: {
          firstName: firstName,
          lastName: lastName
        }
      });

      const result = await response;
      console.log('result: ', result);
    } else {
      console.log('submitted: ', submitted);
      setSubmitted(false);
      setFeedback('Du måste fylla i alla fält!');
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <View>
          <Input
            placeholder="First Name"
            value={firstName}
            returnKeyType="next"
            onSubmitEditing={() => {
              lastNameRef.current.focus();
            }}
            disabled={isLoading}
            blurOnSubmit={false}
            onChangeText={(text) => setFirstName(text)}
          ></Input>
        </View>

        <View>
          <Input
            placeholder="Last Name"
            value={lastName}
            ref={lastNameRef}
            disabled={isLoading}
            returnKeyType="send"
            onSubmitEditing={() => submitHandler()}
            onChangeText={(text) => setLastName(text)}
          ></Input>
        </View>

        <Button
          title="Lägg till användare"
          onPress={submitHandler}
          loading={isLoading}
          disabled={isLoading}
        />

        <TextComp title={feedback} />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 20,
    marginTop: 150,
    padding: 10,
    backgroundColor: '#fff'
  }
});
