import { View, Text, FlatList, StyleSheet, TextInput } from 'react-native';
import React, { useEffect, useState } from 'react';
import {
  useGetUsersQuery,
  useUpdateUserMutation
} from '../../store/api/usersApi';

import { Button } from '@rneui/base';

export function EditUsers() {
  const [updateUser, { isLoading, isError, error }] = useUpdateUserMutation();
  const { data, refetch } = useGetUsersQuery({});

  if (!data) {
    return <Text>Loading...</Text>;
  } else {
    // Define a state variable to store user data
    const [userDetails, setUserDetails] = useState(data);

    console.log('userDetails: ', userDetails);

    return (
      <View>
        <View>
          {userDetails.length > 0 ? (
            userDetails.map((user, index) => {
              const userId = user.id;

              // Use state variables for first name and last name
              const [firstName, setFirstName] = useState(user.firstName);
              const [lastName, setLastName] = useState(user.lastName);

              return (
                <View key={userId}>
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
            })
          ) : (
            <Text>Finns inga Användare!</Text>
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  // Your styles here
});
