import { View, Text, FlatList, StyleSheet, TextInput } from 'react-native';
import React, { useEffect, useState } from 'react';
import {
  useDeleteUserMutation,
  useGetUsersQuery,
  useUpdateUserMutation
} from '../../store/api/usersApi';

import { Button } from '@rneui/base';

export function EditUsers() {
  const [deleteUser] = useDeleteUserMutation();
  const [updateUser, { isLoading, isError, error }] = useUpdateUserMutation();

  const { data, refetch } = useGetUsersQuery({});
  // console.log('data: ', data);

  if (!data) {
    return <Text>Loading...</Text>;
  } else {
    const userArray = data;

    return (
      <View style={styles.container}>
        <View>
          {userArray.length > 0 ? (
            userArray.map((user, index) => {
              const [firstName, setFirstName] = useState(user.firstName);
              const [lastName, setLastName] = useState(user.lastName);

              return (
                <View key={user.id}>
                  <TextInput
                    onChangeText={(newText) => setFirstName(newText)}
                    value={firstName}
                  />
                  <TextInput
                    onChangeText={(newText) => setLastName(newText)}
                    value={lastName}
                  />
                  <Button
                    onPress={async () => {
                      console.log('firstName: ', firstName);
                      console.log('lastName: ', lastName);
                      const response = await updateUser({
                        user: {
                          id: user.id,
                          firstName: firstName,
                          lastName: lastName
                        }
                      }).then((response) => {
                        console.log(response);
                        // Update the query data with the new user
                        refetch();
                      });
                    }}
                  >
                    EDIT
                  </Button>
                </View>
              );
            })
          ) : (
            //<Button onPress={refetch}>Uppdatera</Button>

            <Text>Finns inga Användare!</Text>
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 12,
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  sectionHeader: {
    paddingTop: 2,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 2,
    fontSize: 14,
    fontWeight: 'bold',
    backgroundColor: 'rgba(247,247,247,1.0)'
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10
  }
});
