import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button } from '@rneui/base';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { UserForm } from './src/screens/UserForm/UserForm';
import { useState } from 'react';
import { Provider, useSelector } from 'react-redux';
import { store } from './src/store/store';
import { EditUsers } from './src/screens/EditUsers/EditUsers';
import { UserInfo } from './src/screens/UserInfo/UserInfo';
import { PostForm } from './src/screens/PostForm/PostForm';
import { UserList } from './src/screens/UserList/UserList';
import PostList from './src/screens/PostList/PostList';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function DetailsScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <UserList />
    </View>
  );
}

const UserListStackScreen = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="UserList" component={UserList} />
      <Stack.Screen name="UserInfo" component={UserInfo} />
    </Stack.Navigator>
  );
};

function EditUsersScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <EditUsers />
    </View>
  );
}

function HomeScreen({ navigation }) {
  return (
    <View>
      {/* <Text>Home Screen</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Details')}
      /> */}

      <UserForm />
    </View>
  );
}

const NavigationWrapper = () => {
  const loggedInAs = useSelector((state: any) => state.auth.loggedInAs);

  console.log('loggedInAs: ', loggedInAs);

  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'Overview' }}
        />
        <Tab.Screen name="UserList" component={UserListStackScreen} />
        <Tab.Screen name="EditUsersScreen" component={EditUsersScreen} />

        {loggedInAs ? (
        <>
          <Tab.Screen name="UserInfo" component={UserInfo} />
          <Tab.Screen name="PostForm" component={PostForm} />
          <Tab.Screen name="PostList" component={PostList} />
          </>
        ): null
        }
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default function App() {
  const [showUserList, setShowUserList] = useState(false);

  return (
    <Provider store={store}>
      <NavigationWrapper />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    backgroundColor: 'white',
    color: 'black'
  }
});
