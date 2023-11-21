import { ListItem } from "@rneui/themed";
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
  const { data, isLoading } = useGetPostsQuery({});
  const { data: usersArray, isLoading: usersArrayLoading } = useGetUsersQuery(
    {},
  );

  const [deletePost] = useDeletePostMutation();

  const loggedInAs = useSelector((state: any) => state.auth.loggedInAs);

  console.log("HÄÄÄÄRRR", loggedInAs);

  for (let i = 0; i < data.length; i++) {
    if (data[i].createdBy === loggedInAs.firstName) {
      console.log("RÄÄTTTTT");
    }
  }

  console.log("dataHÄÄÄÄÄR: ", data);

  return (
    <View>
      {isLoading ? (
        <Text>Loading...</Text>
      ) : (
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <ListItem
            // key={item.id}
            // onPress={() => {
            //   navigation.navigate("UserInfo", { user: item });
            // }}
            >
              <ListItem.Content>
                <ListItem.Title>{`Skapad av ${item.createdBy} Text: ${item.text} ${item.createdDate}`}</ListItem.Title>
                {item.createdBy === loggedInAs.firstName && (
                  <Button
                    title="Delete Post"
                    onPress={() => {
                      console.log(item.createdBy);
                      // posts
                      for (let i = 0; i < data.length; i++) {
                        console.log("data: ", data[i]);
                        if (data[i].createdBy === item.createdBy) {
                          console.log("Sant!");
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
    </View>
  );
}

export default PostList;
