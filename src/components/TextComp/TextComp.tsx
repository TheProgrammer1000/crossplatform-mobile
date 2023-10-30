import { View, Text, TextInput, FlatList } from 'react-native';
import { Button } from '@rneui/base';

export function TextComp(props) {
  const { title } = props;

  return <Text>{title}</Text>;
}
