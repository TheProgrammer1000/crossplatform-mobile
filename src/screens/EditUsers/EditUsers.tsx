import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TextInput,
  ScrollView
} from 'react-native';
import React, { useEffect, useState } from 'react';
import {
  useGetUsersQuery,
  useUpdateUserMutation
} from '../../store/api/usersApi';

import { Button } from '@rneui/base';

function EditUser({ user }) {
  const userId = user.id;
  const [updateUser, { isLoading, isError, error }] = useUpdateUserMutation();

  // Use state variables for first name and last name
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);

  return (
    <View>
      <TextInput
        onChangeText={(newText) => {
          setFirstName(newText); // Update the state when the text changes
        }}
        value={firstName}
      />
      <TextInput
        onChangeText={(newText) => {
          setLastName(newText); // Update the state when the text changes
        }}
        value={lastName}
      />
      <Button
        onPress={async () => {
          const response = await updateUser({
            user: {
              id: userId,
              firstName: firstName, // Use the updated first name
              lastName: lastName // Use the updated last name
            }
          });
          const result = await response;
          console.log('result: ', result);
        }}
      >
        EDIT
      </Button>
    </View>
  );
}

export function EditUsers() {
  const { data, refetch, isLoading: isLoadingUsers } = useGetUsersQuery({});

  if (isLoadingUsers) {
    return <Text>Loading...</Text>;
  } else {
    // Define a state variable to store user data

    return (
      <View style={styles.container}>
        <FlatList
          data={data}
          renderItem={({ item }) => <EditUser user={item} key={item.id} />}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  // Your styles here
  container: {
    margin: 20,
    marginTop: 20,
    padding: 10
  }
});
