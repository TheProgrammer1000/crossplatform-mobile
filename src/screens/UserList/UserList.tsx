import { ListItem, Button } from "@rneui/themed";
import { useMemo, useState } from "react";
import { View, Text, FlatList } from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";

import { UserItem } from "../../components/UserItem/UserItem";
import { useGetUsersQuery } from "../../store/api/usersApi";

export function UserList({ navigation }) {
  const [isSelected, setSelection] = useState(false);

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
              <ListItem.Content style={{ flex: 1, flexDirection: "row" }}>
                <ListItem.Title>{`${item.firstName} ${item.lastName}`}</ListItem.Title>
                <UserItem id={item.id} firstName={item.firstName} />
              </ListItem.Content>
            </ListItem>
          )}
        />
      )}
    </View>
  );
}

export default UserList;
