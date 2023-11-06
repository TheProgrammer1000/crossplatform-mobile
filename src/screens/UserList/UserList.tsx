import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import React, { useEffect, useState } from 'react';
import {
  useDeleteUserMutation,
  useGetUsersQuery
} from '../../store/api/usersApi';

import { Button } from '@rneui/base';

export function UserList({ navigation, route }) {
  const [deleteUser] = useDeleteUserMutation();

  const { data, refetch } = useGetUsersQuery({});

  if (!data) {
    return <Text>Loading...</Text>;
  } else {
    return (
      <ScrollView>
        <View>
          {data.length > 0 ? (
            data.map((user) => (
              <TouchableOpacity
                key={user.id}
                style={styles.container}
                onPress={() => navigation.navigate('UserInfo', { user: user })}
              >
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
              </TouchableOpacity>
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
