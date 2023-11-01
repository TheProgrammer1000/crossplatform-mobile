import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button } from '@rneui/base';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { UserForm } from './src/screens/UserForm/UserForm';
import { useState } from 'react';
import { Provider } from 'react-redux';
import { store } from './src/store/store';
import { UserList } from './src/screens/UserList/UserList';
import { EditUsers } from './src/screens/EditUsers/EditUsers';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function DetailsScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <UserList />
    </View>
  );
}

function EditUsersScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <EditUsers />
    </View>
  );
}

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      {/* <Text>Home Screen</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Details')}
      /> */}

      <UserForm />
    </View>
  );
}

export default function App() {
  const [showUserList, setShowUserList] = useState(false);

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen
            name="Home"
            component={HomeScreen}
            options={{ title: 'Overview' }}
          />
          <Tab.Screen name="Details" component={DetailsScreen} />
          <Tab.Screen name="EditUsersScreen" component={EditUsersScreen} />
        </Tab.Navigator>
      </NavigationContainer>
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
