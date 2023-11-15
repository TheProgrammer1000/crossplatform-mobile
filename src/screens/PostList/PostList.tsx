import { ListItem } from "@rneui/themed";
import { View, Text, FlatList } from "react-native";

import { useGetPostsQuery } from "../../store/api/postsApi";

export function PostList({ navigation }) {
  const { data, isLoading } = useGetPostsQuery({});

  console.log("data: ", data);

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
              </ListItem.Content>
            </ListItem>
          )}
        />
      )}
    </View>
  );
}

export default PostList;
