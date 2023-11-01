import { View, Text, TextInput } from 'react-native';
import { TextComp } from '../../components/TextComp/TextComp';
import { Button } from '@rneui/base';
import { useCreateUserMutation } from '../../store/api/usersApi';
import { useGetUsersQuery } from '../../store/api/usersApi';

import { useState } from 'react';

export function UserForm() {
  const [createUser] = useCreateUserMutation();
  const { data, refetch } = useGetUsersQuery({});

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [feedback, setFeedback] = useState('');
  const [submitted, setSubmitted] = useState(false);

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
      }).then((response) => {
        console.log(response);
        // Update the query data with the new user
        refetch();
      });
    } else {
      console.log('submitted: ', submitted);
      setSubmitted(false);
      setFeedback('Du måste fylla i alla fält!');
    }
  };

  return (
    <View>
      <TextComp title="FirstName" />

      <TextInput
        placeholder="firstName..."
        value={firstName}
        onChangeText={(text) => setFirstName(text)}
      ></TextInput>

      <TextComp title="LastName" />
      <TextInput
        placeholder="lastName..."
        value={lastName}
        onChangeText={(text) => setLastName(text)}
      ></TextInput>

      <Button title="Lägg till användare" onPress={submitHandler} />

      <TextComp title={feedback} />
    </View>
  );
}
