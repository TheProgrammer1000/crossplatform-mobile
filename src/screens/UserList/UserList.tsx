import { ListItem, Button } from "@rneui/themed";
import { useMemo, useState } from "react";
import { View, Text, FlatList } from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";

import { UserItem } from "../../components/UserItem/UserItem";
import {
  useGetPostsQuery,
  useDeletePostMutation,
} from "../../store/api/postsApi";
import {
  useGetUsersQuery,
  useDeleteUserMutation,
} from "../../store/api/usersApi";

export function UserList({ navigation }) {
  const [selectedItems, setSelectedItems] = useState([]);

  const { data, isLoading } = useGetUsersQuery({});
  const { data: posts } = useGetPostsQuery({});
  const [deleteUser] = useDeleteUserMutation();
  const [deletePost] = useDeletePostMutation();

  const handleDataFromChild = (data) => {
    // Do something with the data received from the child
    console.log("Data from child:", data);
    //setDataFromChild(data);
    selectedItems.push(data);
  };

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
                <UserItem
                  id={item.id}
                  firstName={item.firstName}
                  onDataFromChild={handleDataFromChild}
                />
              </ListItem.Content>
            </ListItem>
          )}
        />
      )}
      <Button
        onPress={() => {
          console.log("sortedUsers: ", sortedUsers);
          console.log("selectedItems: ", selectedItems);

          for (let i = 0; i < sortedUsers.length; i++) {
            for (let j = 0; j < selectedItems.length; j++) {
              if (sortedUsers[i].id === selectedItems[j].nameID) {
                console.log("SANNNNT");
                deleteUser(selectedItems[j].nameID);
                break;
              }
            }
          }

          /*
          posts
            .filter((post) =>
              selectedItems.find(
                (selectedItem) => selectedItem.firstName === post.createdBy,
              ),
            )
            .forEach((post) => deletePost(post.id));
            */

          for (let i = 0; i < posts.length; i++) {
            for (let j = 0; j < selectedItems.length; j++) {
              if (posts[i].createdBy === selectedItems[j].firstName) {
                deletePost(posts[i].id);
                break;
              }
            }
          }
        }}
      >
        Delete All
      </Button>
    </View>
  );
}

export default UserList;
