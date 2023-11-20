import { Button } from "@rneui/base";
import { View, Text, TextInput, FlatList } from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import finalPropsSelectorFactory from "react-redux/es/connect/selectorFactory";

import {
  useGetPostsQuery,
  useDeletePostMutation,
} from "../../store/api/postsApi";
import {
  useGetUsersQuery,
  useDeleteUserMutation,
} from "../../store/api/usersApi";

export function UserItem(props) {
  console.log("firstName: ", props.firstName);

  const { data, isLoading, isError } = useGetPostsQuery({});

  const [deletePost] = useDeletePostMutation();
  const [deleteUser] = useDeleteUserMutation();

  function deleteHandler() {
    console.log("datalalalal: ", data);
    console.log("firstnameee: ", props.firstName);

    for (let i = 0; i < data.length; i++) {
      if (data[i].createdBy === props.firstName) {
        deletePost(data[i].id);
      }
    }
    deleteUser(props.id);
  }

  return (
    <View>
      {isLoading ? (
        <Text>Loading...</Text>
      ) : (
        <View>
          <BouncyCheckbox
            onPress={(isChecked: boolean) => {
              console.log(isChecked);
              props.onDataFromChild({
                isChecked,
                nameID: props.id,
                firstName: props.firstName,
              });
            }}
          />
          <Button onPress={deleteHandler}>Delete</Button>
        </View>
      )}
    </View>
  );
}
