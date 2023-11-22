import { ListItem } from "@rneui/themed";
import { useMemo } from "react";
import { View, Text, FlatList, Button } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { useGetPostsQuery } from "../../store/api/postsApi";
import {
  useDeletePostMutation,
  useGetUsersQuery,
} from "../../store/api/usersApi";
import { logIn } from "../../store/slices/authSlice";

// Ta en radera

export function PostList({ navigation }) {
  const { data, isLoading, refetch } = useGetPostsQuery({});
  const { data: usersArray, isLoading: usersArrayLoading } = useGetUsersQuery(
    {},
  );

  const [deletePost] = useDeletePostMutation();

  const loggedInAs = useSelector((state: any) => state.auth.loggedInAs);

  console.log("data: ", data);
  console.log("userArray: ", usersArray);
  console.log("loggedInAs: ", loggedInAs);

  // useMemo is used to memoize the sorted user list
  const sortedPosts = useMemo(() => {
    // Check if data is available and not empty
    if (data.length > 0) {
      const postArrayFinal = [];

      // User
      for (let i = 0; i < usersArray.length; i++) {
        // posts
        for (let j = 0; j < data.length; j++) {
          //if()
          if (usersArray[i].firstName === data[j].createdBy) {
            console.log("data[j].text: ", data[j].text);
            if (
              data[j].createdBy !== loggedInAs.firstName &&
              data[j].private === true
            ) {
              continue;
            } else {
              postArrayFinal.push(data[j]);
            }
          }
        }
      }

      return postArrayFinal;
    }
    // Return an empty array if data is not available
    return [];
  }, [loggedInAs, data]);

  return (
    <View style={{ marginTop: 5 }}>
      {isLoading ? (
        <Text>Loading...</Text>
      ) : (
        <FlatList
          data={sortedPosts}
          renderItem={({ item }) => (
            <ListItem>
              <ListItem.Content>
                <ListItem.Title>{`Skapad av ${item.createdBy} Text: ${item.text} ${item.createdDate}`}</ListItem.Title>
                {item.createdBy === loggedInAs.firstName && (
                  <Button
                    title="Delete Post"
                    onPress={() => {
                      // posts
                      for (let i = 0; i < data.length; i++) {
                        if (data[i].createdBy === item.createdBy) {
                          deletePost(data[i].id);
                        }
                      }
                    }}
                  />
                )}
              </ListItem.Content>
            </ListItem>
          )}
        />
      )}

      <View>
        <Button title="Uppdatera" onPress={refetch} />
      </View>
    </View>
  );
}

export default PostList;
