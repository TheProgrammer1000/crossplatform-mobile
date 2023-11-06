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
      <ScrollView>
        <View>
          {data.length > 0 ? (
            data.map((user) => (
              <View key={user.id} style={styles.container}>
                <Text style={styles.text}>
                  {user.firstName} {user.lastName}
                </Text>
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
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row'
  },
  text: {
    fontSize: 20,
    padding: 2
  }
});
