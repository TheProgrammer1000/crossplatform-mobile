import { View, Text, FlatList, StyleSheet, TextInput } from 'react-native';
import React, { useEffect, useState } from 'react';
import {
  useDeleteUserMutation,
  useGetUsersQuery
} from '../../store/api/usersApi';

import { Button } from '@rneui/base';

export function UserList() {
  const [deleteUser] = useDeleteUserMutation();

  const { data, refetch } = useGetUsersQuery({});
  // console.log('data: ', data);

  if (!data) {
    return <Text>Loading...</Text>;
  } else {
    return (
      <View style={styles.container}>
        <View>
          {data.length > 0 ? (
            data.map((user) => (
              <View key={user.id}>
                <Text>{user.firstName}</Text>
                <Text>{user.lastName}</Text>
                <Button
                  onPress={() => {
                    deleteUser(user.id);
                  }}
                >
                  DELETE
                </Button>
              </View>
            ))
          ) : (
            <Text>Finns inga Användare!</Text>
          )}
          <Button onPress={refetch}>UPDATE</Button>
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
