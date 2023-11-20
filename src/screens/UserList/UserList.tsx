import { ListItem } from "@rneui/themed";
import { useMemo } from "react";
import { View, Text, FlatList } from "react-native";

import { useGetUsersQuery } from "../../store/api/usersApi";

export function UserList({ navigation }) {
  const { data, isLoading } = useGetUsersQuery({});

  // useMemo is used to memoize the sorted user list
  const sortedUsers = useMemo(() => {
    // Check if data is available and not empty
    if (data && data.length > 0) {
      // Sort the data array alphabetically by user names
      return data
        .slice()
        .sort((a, b) =>
          `${a.firstName} ${a.lastName}`.localeCompare(
            `${b.firstName} ${b.lastName}`,
          ),
        );
    }
    // Return an empty array if data is not available
    return [];
  }, [data]);

  return (
    <View>
      {isLoading ? (
        <Text>Loading...</Text>
      ) : (
        <FlatList
          data={sortedUsers}
          renderItem={({ item }) => (
            <ListItem
              key={item.id}
              onPress={() => {
                navigation.navigate("UserInfo", { user: item });
              }}
            >
              <ListItem.Content>
                <ListItem.Title>{`${item.firstName} ${item.lastName}`}</ListItem.Title>
              </ListItem.Content>
            </ListItem>
          )}
        />
      )}
    </View>
  );
}

export default UserList;
