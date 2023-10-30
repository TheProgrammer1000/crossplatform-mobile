import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useGetUsersQuery } from '../../store/api/usersApi';
import { useDeleteUserMutation } from '../../store/api/usersApi';

import { Button } from '@rneui/base';

function deleteUser() {
  console.log('Tjaba');
}

export function UserList() {
  const [deleteUser] = useDeleteUserMutation();
  const { data, refetch } = useGetUsersQuery({});
  console.log('data: ', data);

  if (!data) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <View>
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <View style={styles.container}>
              <Text style={styles.item}>
                {item.firstName} {item.lastName}
              </Text>
              <Button
                title="DELETE"
                onPress={() => {
                  deleteUser(item.id).then((response) => {
                    // Handle success, update the UI, show a confirmation message, etc.
                    refetch();
                  });
                }}
              ></Button>
            </View>
          )}
        />
        <Button onPress={refetch}>Uppdatera</Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 12,
    flexDirection: 'row'
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
  }
});
