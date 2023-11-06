import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button } from '@rneui/base';

export function UserInfo({ route }) {
  const user = route?.params?.user;
  console.log('user: ', user);

  return <Text>{`${user?.firstName} ${user?.lastName}`}</Text>;
}
