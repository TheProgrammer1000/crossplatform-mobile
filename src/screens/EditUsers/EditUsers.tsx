import { View, Text, FlatList, StyleSheet, TextInput } from 'react-native';
import React, { useEffect, useState } from 'react';
import {
  useDeleteUserMutation,
  useGetUsersQuery,
  useUpdateUserMutation
} from '../../store/api/usersApi';

import { Button } from '@rneui/base';
import { TabItem } from '@rneui/base/dist/Tab/Tab.Item';

function deleteUser() {
  console.log('Tjaba');
}

function ChangeTextHandler(text, index, userArray) {
  console.log('userArrayIndex: ', userArray[index]);
  userArray[index].firstName = `${text}`;
}

export function EditUsers() {
  const [deleteUser] = useDeleteUserMutation();
  const [updateUser, { isLoading, isError, error }] = useUpdateUserMutation();

  const [firstName, setFirstName] = useState('');

  const { data, refetch } = useGetUsersQuery({});
  // console.log('data: ', data);

  if (!data) {
    return <Text>Loading...</Text>;
  } else {
    console.log('data: ', data[0].firstName);
    const userArray = data;

    return (
      <View style={styles.container}>
        <View>
          {userArray.map((user, index) => {
            return (
              <View key={user.id}>
                <TextInput
                  onChangeText={(text) =>
                    ChangeTextHandler(text, index, userArray)
                  }
                  value={userArray[index].firstName}
                />
                <Button
                  onPress={() => {
                    console.log(user.firstName);
                  }}
                >
                  EDIT
                </Button>
              </View>
            );
          })}
          <Button onPress={refetch}>Uppdatera</Button>
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
